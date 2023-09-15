import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'


interface props {
    product: ProductType
}



const ProductListCard = (props: props) => {
    const [product, setProduct] = useState<ProductType>()
    const navigate = useNavigate()

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
    

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        navigate(`/${product?.id}`)
    }




    return (
        <div className="cardContainer" onClick={onClick}>
            {product && (
                <>
                <img className="cardIMG" src={product.imgurl} alt={product.name} />
                <div className="cardInfo">
                <h3>{product.category}</h3>
                <p>{product.name}</p>
                <p>{product.price} kr</p>
                </div>
                
                </>
                )}
        </div>
    )
}

export default ProductListCard