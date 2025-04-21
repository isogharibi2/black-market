import React from "react";
import "./offer.scss";

export default function Offer({ OfferValue }) {
  return (
    <div className="Off">
      <span>Off</span>
      <span>{OfferValue}</span>
    </div>
  );
}
