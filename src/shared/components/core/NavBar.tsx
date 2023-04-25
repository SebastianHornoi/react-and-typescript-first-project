import {NavLink} from "react-router-dom";

export function NavBar(){
    return(
        <div>
            <NavLink className="mx-2" to="shop">Shop</NavLink>
            <NavLink className="mx-2" to="cart">Cart</NavLink>
            <NavLink className="mx-2" to="checkout">Checkout</NavLink>
        </div>
    )
}