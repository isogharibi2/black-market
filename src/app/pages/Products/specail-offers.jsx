import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { baseUrl } from "@app/helpers/variables";

export default function SpecailOffer() {
  const [ProductDetails, SetProductDetails] = useState([]);

  const { slug } = useParams();

  useEffect(() => {
    const GetProductDeatls = async () => {
      const response = await axios.get(
        `${baseUrl}/specail-offers?slug=${slug}`
      );
      SetProductDetails(response.data);
    };
    GetProductDeatls();
  });

  return (
    <>
      {ProductDetails?.map((product) => (
        <div key={product.id}>
          <h1>{product.title}</h1>
          <ul>
            {product.sizes?.map((size, index) => (
              <li key={index}> {size} </li>
            ))}
          </ul>
          <ul>
            {product.colors.map((color , index)=>(
              <li key={index}> {color} </li>
            ))}
          </ul>
          <span>{product.originalPrice}</span>
          <span>{product.offerPrice}</span>
          <img src={product.img} alt="" />
          <span>{product.percentage}</span>
        </div>
      ))}
    </>
  );
}
