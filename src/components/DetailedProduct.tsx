import React, { useEffect, useState } from "react";


interface Props {
    product: ProductType
}



const DetailedProduct = (props: Props) => {
    const [product, setProduct] = useState<ProductType | null>(null)
    
    useEffect(() => {
        switch(props.product.category){
            case('Table'):
                const table = props.product as Table
                setProduct(table)
                break;

            case('Chair'):
                const chair = props.product as Chair
                setProduct(chair)
                break;
                
            case('Miscellaneous'):
                const _product = props.product as Product
                setProduct(_product)
                break;    
        }
    }, [])
    

    return (
        <>
        {product && (
            <>
                <img className="detailsIMG" src={product.imgurl} alt={product.name} />
                <h3>Product category: {product.category}</h3>
                <p>{product.name}</p>
                
                <p>Brand: {product.brand}</p>
                <p>Price: {product.price} kr</p>
                <p>Description: {product.description}</p>
                {product.category !== 'Miscellaneous' && (
                    <p>Color: {('color' in product) ? product.color : 'N/A'}</p>
                )}
                {product.category === 'Chair' && (
                    <p>Has back support? {('hasBackSupport' in product) ? 'Yes' : 'No'}</p>
                )}
                {product.category === 'Table' && (
                    <p>Size: {('size' in product) ? product.size : 'N/A'}</p>
                )}
            </>
        )}
        </>
            
            
        
    )
}

export default DetailedProduct