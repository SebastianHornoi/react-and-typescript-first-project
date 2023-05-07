import {CartItem} from "../../model/cart-item";
import {Product} from "../../model/product";
import {create} from "zustand";

export interface CartState {
    list: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    clearCart: () => void;
}

export const useCart = create((set, get) =>({
   list: [],
    addToCart: (product: Product) => {
       const found = get().list.find(item => item.product.id === product.id);

       if(found){
          get().increaseQty(product.id)
       }else{
           const item: CartItem = {product, quantity: 1}
           set({ list: [...get().list, item] });
       }

    },
    removeFromCart: (productId: string) => {
       set(state => ({
           list: state.list.filter(item => item.product.id !== productId)
       }))
    },
    increaseQty: (productId: string) => {
        const found = get().list.find(item => item.product.id === productId);

        if(found){
            found.quantity++;
            set(state => ({
                list: state.list.map(item =>{
                    return item.product.id === found.product.id ? found : item;
                })
            }))
        }
    },
    decreaseQty: (productId: string) => {
        const found = get().list.find(item => item.product.id === productId);

        if(found){
            if(found.quantity > 1){
                found.quantity--;
            }else{
                get().removeFromCart(productId);
            }

            set(state => ({
                list: state.list.map(item =>{
                    return item.product.id === found.product.id ? found : item;
                })
            }))
        }
    },
    clearCart: () => {

    },
}))