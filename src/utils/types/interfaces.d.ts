interface User {
	id: number
	userName: string
}
interface UsersState {
    users: User[],
    actions: {
        saveUser: (user: User) => void
        saveFirstUser: (users: User[]) => void
    }
}

interface AuthState {
    currentUser: User | null
    login: (user: User) => void
    logout: () => void
}

//-------------------------------------------------------------------------

interface Product {
    category: ProductCategory
    imgurl: string
    id: number
    name: string
    price: number
    stock: number
    
    brand: Brand
    description: string
}

interface Table extends Product {
    category: 'Table'
    size: Size
    color: string
}

interface Chair extends Product{
    category: 'Chair'
    hasBackSupport: boolean
    color: string
}

interface ProductState {
    products: ProductType [],
    actions: {
        
        getProduct: (id: number) => ProductType | null
    }
}

type Size = 'L' | 'M' | 'S'
type ProductCategory = 'Miscellaneous' | 'Table' | 'Chair'
type ProductType = Product | Table | Chair

//-------------------------------------------------------------------------

interface Order {
    id: number
    items: OrderItem []
    status: Status
    orderTotal: number
    user: User
}

interface OrderItem {
    id: number
    product: Product
    quantity: number
    itemTotal: number
}

type Status = 'Delivered' | 'Shipped' | 'Pending'

interface OrderState {
    orders: Order []
    currentOrder: OrderItem []
    actions: {
        updateCurrentOrder: (orderItem: OrderItem) => void
        createOrder: (orderItems: OrderItem[], user: User) => void,
        updateStock: (order: Order) => void
        addToCurrentOrder: (orderItem: OrderItem) => void
        removeFromCurrentOrder: (orderItem: OrderItem) => void
        clearCurrentOrder: () => void
    }
}
//-------------------------------------------------------------------------
