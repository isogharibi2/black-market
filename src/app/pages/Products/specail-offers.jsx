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
        `${baseUrl}/special-products?slug=${slug}`
      );
      SetProductDetails(response.data);
    };
    GetProductDeatls();
  });

  return (
    <>
      {ProductDetails.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
          <span>{product.OgPrice}</span>
          <span>{product.FinalPrice}</span>
          <img src={product.image} alt="" />
          <span>{product.OfferValue}</span>
        </div>
      ))}
    </>
  );
}
