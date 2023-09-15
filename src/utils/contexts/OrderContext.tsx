import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { updateProductsToLocalStorage, getOrdersFromLocalStorage, saveOrdersToLocalStorage, saveCurrentOrderToLocalStorage, getCurrentOrderFromLocalStorage} from "../helpers/localStorage"



const defaultState: OrderState = {
    orders: [],
    currentOrder: getCurrentOrderFromLocalStorage() || [],
    actions: {
        updateCurrentOrder: (orderItem) => {},
        createOrder: (orderItems, user) => {},
        updateStock: (order) => {},
        addToCurrentOrder: (orderItem) => {},
        removeFromCurrentOrder: (orderItem) => {},
        clearCurrentOrder: () => {}

    }
}

const OrderContext = createContext<OrderState>(defaultState)

const OrderProvider = ({children}: PropsWithChildren) => {
    const [orders, setOrders] = useState<Order[]>(defaultState.orders)
    const [currentOrder, setCurrentOrder] = useState<OrderItem[]>(defaultState.currentOrder)

    useEffect(() => {
        _getOrdersFromLocalStorage()
    },[])
    
    useEffect(() => {
        if (currentOrder) {
            saveCurrentOrderToLocalStorage(currentOrder)
        }
    },[JSON.stringify(currentOrder)])

    const _getOrdersFromLocalStorage = () => {
        const storedOrders: Order[] = getOrdersFromLocalStorage()
        setOrders(storedOrders)
    }

    const updateCurrentOrder = (orderItem: OrderItem): void => {
        const itemIndex: number = orderItem.id - 1
        const updatedOrder: OrderItem[] = [...currentOrder]
        updatedOrder[itemIndex] = orderItem
        setCurrentOrder(updatedOrder)
    }

    const addToCurrentOrder = (orderItem: OrderItem): void => {
        const newCurrentOrder: OrderItem[] = [...currentOrder, orderItem]
        setCurrentOrder(newCurrentOrder)
    }

    const removeFromCurrentOrder = (orderItem: OrderItem): void => {
        const newCurrentOrder: OrderItem[] = currentOrder.filter((item) => item.id !== orderItem.id)
        newCurrentOrder.map((item) => {
            item.id = newCurrentOrder.findIndex((_item) => _item.product.name === item.product.name) +1
        })
        setCurrentOrder(newCurrentOrder)
      }

    const clearCurrentOrder = (): void => {
        setCurrentOrder([])
    }

    const createOrder = (orderItems: OrderItem[], user: User): void => {
        let _orderTotal: number = 0
        orderItems.map((item) => {
            _orderTotal += item.itemTotal
        })

        const newOrder: Order = {
            id: orders.length + 1,
            items: orderItems,
            status: 'Pending',
            orderTotal: _orderTotal,
            user: user
        }
        const _orders: Order[] = getOrdersFromLocalStorage()
        const newOrders: Order[] = [..._orders, newOrder]
        saveOrdersToLocalStorage(newOrders)
        _orderTotal = 0
        
    }



    const updateStock = (order: Order):void => {
        updateProductsToLocalStorage(order)
    }


    return (
        <OrderContext.Provider 
            value={{
                orders,
                currentOrder,
                actions: {
                    updateCurrentOrder,
                    createOrder,
                    updateStock,
                    addToCurrentOrder,
                    removeFromCurrentOrder,
                    clearCurrentOrder
                }
            }}>
                {children}
        </OrderContext.Provider>

    )
}



const useOrders = () => {
    const orders: OrderState = useContext(OrderContext)

    return orders
}

export {
    useOrders,
    OrderProvider

}