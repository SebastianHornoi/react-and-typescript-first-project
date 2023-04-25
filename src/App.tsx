import {BrowserRouter, Routes, Route, Navigate, NavLink} from "react-router-dom";

import {ShopPage} from "./pages/shop/ShopPage";
import {CartPage} from "./pages/cart/CartPage";
import {CheckoutPage} from "./pages/checkout/CheckoutPage";
import {LoginPage} from "./pages/login/LoginPage";
import {ThanksPage} from "./pages/checkout/ThanksPage";
import {CMSPage} from "./pages/cms/CMSPage";
import {CMSProductsPage} from "./pages/cms/products/CMSProductsPage";
import {CMSOrdersPage} from "./pages/cms/orders/CMSOrdersPage";
import {NavBar} from "./shared/components/core/NavBar";

function App() {

  return (
    <>
        <BrowserRouter>
            <NavBar />
            <hr/>
            <div className="page">
                <Routes>
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="thankyou" element={<ThanksPage />} />

                    <Route path="cms" element={<CMSPage />}>
                        <Route path="products" element={ <CMSProductsPage /> } />
                        <Route path="orders" element={ <CMSOrdersPage /> } />
                        <Route index element={ <Navigate to="products" /> } />
                    </Route>

                    <Route path="*" element={<Navigate to="shop" />} />
                </Routes>
            </div>
        </BrowserRouter>

    </>
  )
}

export default App
