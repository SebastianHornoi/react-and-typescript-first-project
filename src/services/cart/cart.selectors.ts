import {CartState} from "./useCart";

export const selectCartList = (state: CartState) => state.list;

export const selectCartEmpty = (state: CartState) => state.list.length === 0;

export const selectorTotalCartCost = (state: CartState) =>
    state.list.reduce((acc, item) => {
        return acc + (item.product.cost * item.quantity)
    }, 0)

export const selectTotalCartItems = (state: CartState) => state.list.reduce((acc, item) =>{
    return acc + item.quantity;
}, 0)