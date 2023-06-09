// shared/components/core/NavBar.tsx

import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../assets/laptop.png';
import {CartPanel} from "./CartPanel";
import {selectTotalCartItems, useCart, useCartPanel} from "../../../services/cart";
import {useAuth} from "../../../services/auth";



const isActive = (obj: {isActive: boolean}) =>
    obj.isActive ? 'text-xl text-sky-400 font-bold' : 'text-xl text-white';


export function NavBar() {

    const isCartPanelOpened = useCartPanel(state => state.open);
    const toggleCartPanel = useCartPanel(state => state.toggle);
    const totalCartItems = useCart(selectTotalCartItems)

    const navigate = useNavigate();
    const logout = useAuth(state => state.logout);

    function logoutHandler()
    {
     logout();
     navigate('/login')
    }

    return (
        <div className="fixed z-10 top-0 left-0 right-0 shadow-2xl">
            <div className="flex items-center justify-between h-20 bg-slate-900 text-white p-3 shadow-2xl">
                {/*Logo*/}
                <div className="flex items-center gap-3">
                    <img src={logo} alt="" className="w-16"/>
                    <NavLink to="shop" className={isActive}>SHOP</NavLink>
                </div>

                {/*Cart Button Badge */}
                <div>
                    <button onClick={toggleCartPanel} className="btn accent lg" >
                        Cart: {totalCartItems}
                    </button>
                </div>
                {isCartPanelOpened && <CartPanel />}

            </div>


            {/*Login / CMS / Logout buttons*/}
            <div className="fixed bottom-2 right-2 text-white p-5 ">
                <NavLink to="login" className="btn accent lg">login</NavLink>
                <NavLink to="cms" className='btn accent lg'>cms</NavLink>
                <button onClick={logoutHandler} className="btn primary lg">logout</button>
            </div>
        </div>
    )
}