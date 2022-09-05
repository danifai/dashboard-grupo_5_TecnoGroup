import React from 'react';
import SmallCard from './SmallCard';




function ContentRowTop(props){
    let productInDataBase = {
        color:   "primary",
        titulo: "Products Quantity",
        valor: props.productsTotal,
        icono: "fas fa-film",
    }
    
    let amount ={
        color:   "success",
        titulo: "Users Quantity",
        valor: props.usersTotal,
        icono: "fas fa-user",
    }
    
    let user = {
        color:   "warning",
        titulo: "Categories quantity",
        valor: props.categoriesTotal,
        icono: "fas fa-user",
    }
    
    let cardProps = [productInDataBase,amount,user];

    return (
        <React.Fragment>
        {/*<!-- Content Row -->*/}
        <div className="row">
            {
                cardProps.map((producto,index)=>{
                    return <SmallCard  {...producto}  key= {index}/>
                })
            }      
        </div>
        </React.Fragment>
    )
}
export default ContentRowTop;