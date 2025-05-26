import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./specail-offers.scss";

import { baseUrl } from "@app/helpers/variables";

export default function SpecailOffer() {
  const [ProductDetails, SetProductDetails] = useState([]);
  const [ selectedColor , setselectedColor ] = useState(null)
  const [ selectedSize  , setselectedSize ] = useState(null)

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
    <section className="HeroSpecialOffers">
      <div className="CallBackDiv">
        <ul className="CallBakUl">
          <li>home</li>
          <img src="/assets/icons/CALLBACKARROW.png" alt="" />
          <li>products</li>
        </ul>
      </div>
      {ProductDetails?.map((product) => (
        <div className="ProductAllDEtails" key={product.id}>
          <div className="TextHerosPD">
            <h1 className="TitleTextPD">{product.title}</h1>
            <h1 className="ENtitlePD">{product.enTitle}</h1>
            <ul className="SizePcker">
              {product.sizes?.map((size, index) => (
                <li className={selectedSize === index ? 'selectedSize' : ''} onClick={() => handelSize(index)} key={index}> {size} </li>
              ))}
            </ul>
            <ul className="ColorPicker">
              {product.colors.map((color, index) => (
                <li className={selectedColor === index ? 'selectedColor' : ''} onClick={() => handelColor(index)} key={index}> {color} </li>
              ))}
            </ul>
            <span>{product.originalPrice}</span>
            <span>{product.offerPrice}</span>
            <span>{product.percentage}</span>
          </div>
          <div className="ImgHerosPD">
            <img src={product.img} alt="" />
          </div>
        </div>
      ))}
    </section>
  );
}
