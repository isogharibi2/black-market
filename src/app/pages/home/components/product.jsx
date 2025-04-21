import React from "react";
import "./product.scss";

import { Link } from "react-router-dom";
import Offer from "@app/ui/components/offer";

export default function Product({ image, OgPrice, FinalPrice, name, address ,OfferValue }) {
  return (
    <>
      <Link to={address}>
        <div className="productDetail">
          <Offer
          OfferValue={OfferValue}
          />
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
      </Link>
    </>
  );
}
