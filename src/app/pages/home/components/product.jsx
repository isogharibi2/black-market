import React from "react";
import "./product.scss";

export default function Product({ image, OgPrice, FinalPrice, name }) {
  return (
    // <div className="productDetail">
    //   <div className="info">
    //     <span>کت چرمی بلک مدل وسطای vstay</span>
    //     <div className="Prices">
    //       <span className="ogPrice">۱,۲۷۵,۰۰۰</span>
    //       <span>۱,۷۰۰,۰۰۰</span>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="productDetail">
        {/* badgecomponent */}
        <img src={image} alt="" />
        <div className="info">
          <span>{name}</span>
          <div className="Prices">
            <span className="ogPrice">{OgPrice}</span>
            <span>{FinalPrice}</span>
          </div>
        </div>
      </div>
    </>
  );
}
