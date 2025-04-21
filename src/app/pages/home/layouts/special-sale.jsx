import React, { useState } from "react";
import "./special-sale.scss";

import Model1 from "/assets/images/model1.png";
import Model2 from "/assets/images/model2.png";
import Model3 from "/assets/images/model3.png";
import Model4 from "/assets/images/model4.png";
import Model5 from "/assets/images/model5.png";

import Product from "../components/product";

export default function SpecialSale() {
  const [ProductDetails, SetProductDetails] = useState([
    {
      id: 1,
      name: "کت بربری Burberry مدل A8 ",
      OgPrice: "1,416,000",
      FinalPrice: "1,916,000",
      image: Model1,
      address: "/products/special-offers/Burberry",
      OfferValue : "50%"
    },
    {
      id: 2,
      name: "کت شلوار  بروکس Brooks",
      OgPrice: "1,416,000",
      FinalPrice: "1,916,000",
      image: Model2,
      address: "/products/special-offers/Brooks",
      OfferValue : "40%"
    },
    {
      id: 3,
      name: "کت شلوارکانالی 320 Canali",
      OgPrice: "1,416,000",
      FinalPrice: "1,916,000",
      image: Model3,
      address: "/products/special-offers/Canali",
      OfferValue : "30%"
    },
    {
      id: 4,
      name: "کت زنانه اس پی ایتالیا SP-Italy",
      OgPrice: "1,416,000",
      FinalPrice: "1,916,000",
      image: Model4,
      address: "/products/special-offers/SP-Italy",
      OfferValue : "20%"

    },
    {
      id: 5,
      name: "کت چرمی بلک مدل وسطای vstay",
      OgPrice: "1,416,000",
      FinalPrice: "1,916,000",
      image: Model5,
      address: "/products/special-offers/vstay",
      OfferValue : "10%"
    },
  ]);
  return (
    <div className="ProductsDetails">
      {ProductDetails.map((products) => (
        <Product
          key={products.id}
          image={products.image}
          name={products.name}
          OgPrice={products.OgPrice}
          address={products.address}
          FinalPrice={products.FinalPrice}
          OfferValue={products.OfferValue}
        />
      ))}
    </div>
  );
}
