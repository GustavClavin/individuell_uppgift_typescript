//import components
import '../styles/productDetails.css'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import DetailedProduct from "../components/DetailedProduct"
import Footer from "../components/Footer"
import Header from "../components/Header"
import ProductListCard from "../components/ProductListCard"
import { useProducts } from "../utils/contexts/ProductContext"
import { useOrders } from '../utils/contexts/OrderContext';
import { useAuth } from '../utils/contexts/AuthContext';
import Cart from '../components/Cart';



const ProductDetails = () => {
    const auth: AuthState = useAuth()
    const { id } = useParams<string>()
    const products: ProductState = useProducts()
    const orders: OrderState = useOrders()

    const [product, setProduct] = useState<ProductType | null>(null)
    const [suggested, setSuggested] = useState<ProductType[] | null>(null)
    const [quantity, setQuantity] = useState<number>(1)
    const [cartKey, setCartKey] = useState<number>(0)


    useEffect(() => {
        const productId: number = Number(id)
        const fetchedProduct: ProductType | null = products.actions.getProduct(productId)

        if(fetchedProduct !== null){
            setProduct(fetchedProduct)
            const suggestedProducts: ProductType[] = products.products.filter((product) => product.category === fetchedProduct.category)
            setSuggested(suggestedProducts)
        }
        
        
        
    }, [id, products.actions])
    
    const addToCart = () => {
        const currentOrder: OrderItem[] = orders.currentOrder
        if(product){
            const itemToAdd: OrderItem = {
                id: currentOrder.length + 1,
                product: product,
                quantity: quantity,
                itemTotal: product.price * quantity
            }

            const existingIndex: number = currentOrder.findIndex((item) => item.product.id == product.id)
            
            if(existingIndex !== -1){
                const updatedItem: OrderItem = currentOrder[existingIndex]
                updatedItem.quantity += quantity
                updatedItem.itemTotal = updatedItem.product.price * updatedItem.quantity
                orders.actions.updateCurrentOrder(updatedItem)
            }else{
                orders.actions.addToCurrentOrder(itemToAdd)
            }
            

            setCartKey(prevKey => prevKey + 1)
        }
    }

    


    
    return (
        <div className='productDetails'>
            <Header></Header>

            {product ?(
                <>
                    <div className='detailedContainer'>
                    <DetailedProduct key={product.id} product={product}></DetailedProduct>
                    <div className='quantity'>
                        <label htmlFor="productQuantity">Quantity</label>
                        <input type="number" id="productQuantity" onChange={(e) => setQuantity(Number(e.target.value))} value={quantity} />
                        <button onClick={addToCart}>Add to cart</button>
                    </div>
                    </div>
                    
                    
                    
                </>
                
            ):(
                <div className='detailedProduct'>404 Product Not found</div>
            )}
            
            {suggested && suggested.length > 0 &&(
                <>

                <h2>Suggested products</h2>
                <div className="suggestedGrid">
                    {suggested.map((product) => (
                        <ProductListCard  key={product.id} product={product} />
                    ))}
                </div>
                
                </>
            )}

            
            <Footer></Footer>
        </div>
    )
}

export default ProductDetails