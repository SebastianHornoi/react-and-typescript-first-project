import clsx from 'clsx';
import {selectorTotalCartCost, useCart} from "../../services/cart";
import {ChangeEvent, useState} from "react";

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function CheckoutPage(){
    const [user, setUser] = useState({ name: '', email: ''})
    const [dirty, setDirty] = useState(false);
    const totalCartCost = useCart(selectorTotalCartCost);

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setUser(state => ({ ...state, [name]: value }))
        setDirty(true);
    }

    function sendOrder(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(user)
    }

    const isNameValid = user.name.length;
    const isEmailValid = user.email.match(EMAIL_REGEX);
    const isValid = isNameValid && isEmailValid;

    return(
        <div className="max-w-sm mx-auto">
            <h1 className="title">CHECKOUT</h1>

            <div className="text-xl my-3 border-b">€ {totalCartCost}</div>

            <form className="flex flex-col gap-3" onSubmit={sendOrder}>
                Your name:
                <input
                    type="text" placeholder="your name"
                    name="name"
                    value={user.name}
                    onChange={changeHandler}
                    className={clsx({ 'error': !isNameValid && dirty})}
                />

                Your email
                <input
                    type="email" placeholder="Your email"
                    name="email"
                    value={user.email}
                    onChange={changeHandler}
                    className={clsx({ 'error': !isEmailValid && dirty })}
                />

                <button type="submit" className="btn primary" disabled={!isValid}>
                    CONFIRM ORDER
                </button>
            </form>

            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}