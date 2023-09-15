import { useOrders } from "../utils/contexts/OrderContext"
import React, { useEffect, useState } from "react";
import '../styles/cart.css'




const Cart = () => {
    const orders: OrderState = useOrders()
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
    const [reloadCart, setReloadCart] = useState<boolean>(false)
    const [orderTotal, setOrderTotal] = useState<number>(0)
    
    

    const toggleCart = ():void => {
        setIsCartOpen(!isCartOpen)
    }
    useEffect(() => {
        setIsCartOpen(orders.currentOrder.length > 0)
        if(orders.currentOrder.length === 0){
            setIsCartOpen(false)
        }
        
        setOrderTotal(calculateOrderTotal())
    }, [orders.currentOrder])
    
    const calculateOrderTotal = () => {
        const total: number = orders.currentOrder.reduce((total, orderItem) => {
            return total + orderItem.itemTotal;
        }, 0)
        return total
    }
    
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {

        if(e.currentTarget.id === 'clearCart'){
            orders.actions.clearCurrentOrder()
            setReloadCart(true)
        }

        const itemIndex: number = orders.currentOrder.findIndex((item) => item.product.name === e.currentTarget.value)
        
        if(itemIndex !== -1){

            switch (e.currentTarget.id){

                case('cartAdd'):
                    const addItem: OrderItem = {...orders.currentOrder[itemIndex]}
                    addItem.quantity ++
                    addItem.itemTotal = addItem.product.price * addItem.quantity
                    orders.actions.updateCurrentOrder(addItem)
                    break;

                case('cartReduce'):
                    const reduceItem: OrderItem = {...orders.currentOrder[itemIndex]}
                    reduceItem.quantity --
                    reduceItem.itemTotal = reduceItem.product.price * reduceItem.quantity

                    if(reduceItem.quantity < 1){
                        orders.actions.removeFromCurrentOrder(orders.currentOrder[itemIndex])
                    }else{
                        orders.actions.updateCurrentOrder(reduceItem)
                    }
                    break;
                   
                case('cartRemove'):
                    orders.actions.removeFromCurrentOrder(orders.currentOrder[itemIndex])
                    break;    
            }

            if(orders.currentOrder[itemIndex].itemTotal === 0){
                orders.actions.removeFromCurrentOrder(orders.currentOrder[itemIndex])
            }
        }
        
        setReloadCart(true)
    }
    
    useEffect(() => {
        setOrderTotal(calculateOrderTotal())
        setReloadCart(false)
    },[reloadCart])

    


    return (
        <div>
            <h2 className="cartTitle" onClick={toggleCart}>Cart</h2>
            {isCartOpen && (
                <>
                    <div className="openCart">
                    <ul>
                        {orders.currentOrder.map((orderItem) => {
                            
                            if (orderItem.quantity > 0) {
                                console.log(orderItem.product.name)
                                console.log('id: ' + orderItem.id)
                                return (
                                    <li key={orderItem.id}>
                                        <img className="cartIMG" src={orderItem.product.imgurl} alt={orderItem.product.name} />
                                        <div className="cartNameAndQuantity">
                                            <p>{orderItem.product.name}</p>
                                            <p>x{orderItem.quantity}</p>
                                        </div>
                                        <div>Unit Price: {orderItem.product.price}kr</div>
                                        <div>Item Total: {orderItem.itemTotal}kr</div>
                                        <div className="cartButtonContainer">
                                        <button id="cartAdd" onClick={handleClick} value={orderItem.product.name}>+</button>
                                        <button id="cartReduce" onClick={handleClick} value={orderItem.product.name}>-</button>
                                        <button id="cartRemove" onClick={handleClick} value={orderItem.product.name}>x</button>
                                        </div>
                                        
                                    </li>
                                )
                            }
                            return null
                        })}
                    </ul>
                    <div>Order Total: {orderTotal}kr</div>
                    {orders.currentOrder.length > 0 && (
                        <button id="clearCart" onClick={handleClick}>Clear Cart</button>
                    )} 
                    </div>    
                </>
            )}
        </div>
    )
}

export default Cart