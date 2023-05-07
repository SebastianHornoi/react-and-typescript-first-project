import {selectCartEmpty, selectCartList, selectorTotalCartCost, useCart} from "../../services/cart";
import {NavLink, useNavigate} from 'react-router-dom';
import {pb} from "../../pocketbas";

export function CartPage(){
    const list = useCart(selectCartList);
    const totalCost = useCart(selectorTotalCartCost);
    const navigate = useNavigate();
    const isEmpty = useCart(selectCartEmpty);
    const increaseQty = useCart(state => state.increaseQty);
    const decreaseQty = useCart(state => state.decreaseQty);

    function goToShop() {
        navigate('shop')
    }

    return(
        <div>
            <h1 className="title">CART</h1>

            <ul>
                {
                    list.map(p =>  (
                        <li
                            key={p.product.id}
                            className="flex flex-col sm:flex-row justify-between items-center gap-3  border-b border-blue-400 py-3"
                        >
                            <div className="flex items-center gap-3">
                                <img src={p.product.tmb} alt={p.product.name} className="w-24 rounded-xl"/>
                                <div className="font-bold">{p.product.name}</div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <div className="flex items-center gap-3">
                                    <button className="btn primary" onClick={() => decreaseQty(p.product.id)}>-</button>
                                    <div>quantity: <span className="text-bold">{p.quantity}</span></div>
                                    <button className="btn primary" onClick={() => increaseQty(p.product.id)}>+</button>
                                </div>

                                <div className="w-16 text-center">
                                    € {p.product.cost * p.quantity}
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>

            <div className="text-4xl text-right mt-3">
                { totalCost > 0 ? <p>Total: € {totalCost}</p> : <p>Cart empty <button className="btn primary" onClick={goToShop}>go to shop</button> </p> }
            </div>

            {
                !isEmpty &&
                <div className="flex justify-center">
                    <NavLink to="/checkout" className="btn primary lg">Confirm order</NavLink>
                </div>
            }
        </div>
    )
}