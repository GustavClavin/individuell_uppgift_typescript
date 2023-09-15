const PRODUCTS_STORAGE_KEY = '@LS_PRODUCTS';
const USERS_STORAGE_KEY = '@LS_USERS';
const ORDERS_STORAGE_KEY = '@LS_ORDERS';
const CURRENT_ORDER_STORAGE_KEY = '@LS_CURRENT_ORDER'

type StorageKey = string

const getFromLocalStorage = (key: StorageKey): any => {
    
    const data = localStorage.getItem(key);    
    return data ? JSON.parse(data) : null;
}

const saveToLocalStorage = (key: StorageKey, data: any): void => {
    const stringifiedData = JSON.stringify(data);

    localStorage.setItem(key, stringifiedData);
}
//------------------------------------------------------------------------------------------------

export const getProductsFromLocalStorage = (): ProductType[] => {
    return getFromLocalStorage(PRODUCTS_STORAGE_KEY) || [];
}

export const saveProductsToLocalStorage = (products: ProductType[]): void => {
    saveToLocalStorage(PRODUCTS_STORAGE_KEY, products);
}

export const updateProductsToLocalStorage = (order: Order): Order => {
    const products: ProductType[] = getProductsFromLocalStorage()

    order.items.forEach(
        (item) => item.product.stock -= item.quantity
    )

    const _IDs: number[] = order.items.map(
        (item) => item.product.id
    )

    const _products: ProductType[] = order.items.map(
        (item) => item.product

    )

    const updatedProductsArray = products.filter(
        (product) => !_IDs.includes(product.id)
    )

    const updatedProducts = [...updatedProductsArray, ..._products]
    saveProductsToLocalStorage(updatedProducts)

    return order
}
//------------------------------------------------------------------------------------------------

export const getUsersFromLocalStorage = (): User[] => {
    return getFromLocalStorage(USERS_STORAGE_KEY)
}

export const saveUserToLocalStorage = (users: User[]): void => {
    saveToLocalStorage(USERS_STORAGE_KEY, users);
}
//------------------------------------------------------------------------------------------------

export const getOrdersFromLocalStorage = (): Order[] => {
    return getFromLocalStorage(ORDERS_STORAGE_KEY) || [];
}

export const saveOrdersToLocalStorage = (orders: Order[]): void => {
    saveToLocalStorage(ORDERS_STORAGE_KEY, orders);
}

export const saveCurrentOrderToLocalStorage = (currentOrder: OrderItem[]): void => {
    saveToLocalStorage(CURRENT_ORDER_STORAGE_KEY, currentOrder)
}

export const getCurrentOrderFromLocalStorage = (): OrderItem[] => {
    return getFromLocalStorage(CURRENT_ORDER_STORAGE_KEY)
    
}
//------------------------------------------------------------------------------------------------

export const removeFromLocalStorage = (key: StorageKey): void => {
    localStorage.removeItem(key);
}

export const clearLocalStorage = (): void => {
    localStorage.clear();
}