//import components
import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import ProductListCard from "../components/ProductListCard"
import { useAuth } from "../utils/contexts/AuthContext"
import { useProducts } from "../utils/contexts/ProductContext"
import { useUser } from "../utils/contexts/UserContext"
import { saveProductsToLocalStorage } from "../utils/helpers/localStorage"

import "../styles/ProductListCard.css"
import '../styles/store.css'


const productsArray: ProductType[] = [
    {
        category: 'Table',
        imgurl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS5S_PJvDiU0bmVkOyX9xwgiLHNp3yKOkSQWeDc-72OuoR69fG7ZC_UD3fNOQY8NTeg9HD4xVRTihIk6ZtEZ8h7wD-awOt4vJ5JD1p_kmPaTm5qeAA-xJ7OxogCnKCoSfr8Ks-85IR1Nw&usqp=CAc',
        id: 1, 
        name: 'Basic Table',
        stock: 100,
        price: 1000,
        color: 'white',
        brand: 'IKEA',
        description: 'A basic table',
        size: 'M'

    },
    {
        category: 'Table',
        imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp8pVmUs9I3NFk49EargY6xGSllC1vbcrJ7-546UENMQ&s',
        id: 2, 
        name: 'Fancy Table',
        stock: 10,
        price: 10000,
        color: 'brown',
        brand: 'Not IKEA',
        description: 'A fancy table',
        size: 'L'

    },
    {
        category: 'Chair',
        imgurl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRoi6_dua_CfOvYxFqEzKk9H_Yh5QqiSbfPhrl8CDusGSYn3mYYJqqKRk--iPbF7VfxUA7kmuFd5f8kuMgxzYfNZrZ4W3-2x0nqeCwfaPkM4KpgZ5EmudDLxn-_rfpmXoEyaMIkFA&usqp=CAc',
        id: 3, 
        name: 'Basic Chair',
        stock: 100,
        price: 250,
        color: 'black',
        brand: 'IKEA',
        description: 'A basic chair',
        hasBackSupport: true
    },
    {
        category: 'Chair',
        imgurl: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQceHqsq3OLT-AaIhdtgUGRGRkVhGKop0f88JTXyuYj9qgVvm023Mr5-5hHlGGDxxqJCiQPks8cgsR9jUIZXNKI84KWbBDZLWYgg3BtyhTfuYfZiY-eee2Se1vVUIEDBMf6VC6LFSwYmw&usqp=CAc',
        id: 4, 
        name: 'Fancy Chair',
        stock: 10,
        price: 10000,
        color: 'red',
        brand: 'Not IKEA',
        description: 'A fancy chair',
        hasBackSupport: true
    },
    {
        category: 'Miscellaneous',
        imgurl: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQwcFqn_jP4MiGjpPpJPrzHZDRsHiarU6SXINswZe2OwXCzU6pf1SROFLFchtFsjwJqDzSQDuUMe1PcY0XmzBRfrnhXkyi-ZZ9CLB5rZax99fGd-1SssTkZ31JnVxHQ7SO4mFki3NU&usqp=CAc',
        id: 5, 
        name: 'Brush',
        stock: 1000,
        price: 50,
        brand: 'Cleaning Brand',
        description: 'A normal brush'
    },
    {
        category: 'Miscellaneous',
        imgurl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSep0hIrW_aWVgkym9PrcC3jiwpi5tbUGn_mrkzFIcdlmGA2ys6UEYG7S4CiA15GZTSw6lYjnB7Yq8gXVRHqFyAvcytbjSqkIAEguXygpue3f_U4c1V0SXlXUoR1GrCnBKZOTm0d-Cu&usqp=CAc',
        id: 6, 
        name: 'Spray',
        stock: 1000,
        price: 50,
        brand: 'Cleaning Brand',
        description: 'A normal brush'
    },

]

saveProductsToLocalStorage(productsArray)
const Store = () => {
    
    const products: ProductType[] = useProducts().products
    
    

    return (
        <div>
            <Header></Header>
            <div className="storeGrid">
            {products.map((product) => (
                <ProductListCard  key={product.id} product={product} />
            ))}
            </div>
            

            <Footer></Footer>
        </div>
    )
}

export default Store