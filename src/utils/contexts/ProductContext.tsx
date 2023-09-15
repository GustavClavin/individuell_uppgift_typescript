import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { getProductsFromLocalStorage, saveProductsToLocalStorage } from "../helpers/localStorage"

const defaultState: ProductState = {
    products: [],
    actions: {
        
        getProduct: (id) => null
    }
}

const ProductContext = createContext<ProductState>(defaultState)

const ProductProvider = ({children}: PropsWithChildren) => {
    const [products, setProducts] = useState<ProductType[]>([])

    useEffect(() => {
        _getProductsFromLocalStorage()
    },[])

    const _getProductsFromLocalStorage = (): void => {
        const storedThreads = getProductsFromLocalStorage()
        setProducts(storedThreads)
    }

    const getProduct = (id: number): ProductType | null => {
        return products.find(t => t.id === id) || null
    }

    return (
        <ProductContext.Provider 
            value={{
                products,
                actions: {
    
                    getProduct
                }
            }}>
                {children}
        </ProductContext.Provider>

    )
}



const useProducts = () => {
    const products: ProductState = useContext(ProductContext)

    return products
}

export {
    useProducts,
    ProductProvider

}