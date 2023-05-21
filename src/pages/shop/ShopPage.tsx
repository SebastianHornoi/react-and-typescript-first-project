import {Product} from "../../model/Product";
import {useEffect, useState} from "react";
import {pb} from "../../pocketbase";
import {ProductCard} from "./components/ProductCard";
import {ServerError, Spinner} from "../../shared";
import {useCart, useCartPanel} from "../../services/cart";


export function ShopPage(){
    const [products,setProducts] = useState<Product[]>([])
    const [pending, setPending] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const openCartPanel = useCartPanel(state => state.openOverlay)
    const addToCart = useCart(state => state.addToCart)


    useEffect(() =>{
        loadData()
    }, [])

    function loadData(){
        setError(false);
        setPending(true)
        pb.collection('products').getList<Product>()
            .then( res =>{
                setProducts(res.items)
            })
            .catch(()=>{
                setError(true);
            })
            .finally(() =>{
                setPending(false)
            })
    }



    return(
        <div>
            <h1 className="title">Shop</h1>
            { pending && <Spinner /> }
            { error && <ServerError /> }

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                {
                    products.map(p => {
                        return (
                            <div key={p.id}>
                                <ProductCard
                                    product={p}
                                    onAddToCart={() => {
                                        openCartPanel()
                                        addToCart(p)
                                    }}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}