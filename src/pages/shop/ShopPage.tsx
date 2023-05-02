import {Product} from "../../model/Product";
import {useEffect, useState} from "react";
import {pb} from "../../pocketbas";
import {ProductCard} from "./components/ProductCard";

export function ShopPage(){
    const [products,setProducts] = useState<Product[]>([])
    const [pending, setPending] = useState<boolean>(false)

    useEffect(() =>{
        loadData()
    }, [])

    function loadData(){
        setPending(true)
        pb.collection('products').getList<Product>()
            .then( res =>{
                setProducts(res.items)
                setPending(false)
            })
    }

    function onAddToCart(product: Partial<Product>){
       console.log(product)
    }


    return(
        <div>
            <h1 className="title">Shop</h1>
            { pending && <div className="w-100 text-center">Loading products...</div> }
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                {
                    products.map(p => {
                        return (
                            <div key={p.id}>
                                <ProductCard
                                    product={p}
                                    onAddToCart={onAddToCart}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}