import React, { useState } from "react";
import "./special-sale.scss";

import Product from "../components/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@app/helpers/variables";

export default function SpecialSale() {

  const queryFn = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/specail-offers`);
      return data
    } catch (err) {
      console.error(err)
    }
  }

  const { data : images } = useQuery({
    queryKey : [ "images" ],
    queryFn
  })

  return (
    <div className="ProductsDetails">
      {images?.map((products) => (
        <Product
          key={products.id}
          image={products.img}
          name={products.title}
          OgPrice={products.originalPrice}
          address={`/products/special-offers/${products.slug}`}
          FinalPrice={products.offerPrice}
          OfferValue={products.percentage}
        />
      ))}
    </div>
  );
}
