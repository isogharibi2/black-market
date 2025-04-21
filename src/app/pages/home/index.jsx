import React from "react";

import "./home.scss";
import Product from "./components/product";
import SpecialSale from "./layouts/special-sale";

export default function Home() {
  return (
    <section className="Hero-container">
      <div className="first-model">
        <div className="hero-img">
          <div className="Hero-model">
            <span className="HeroModelText">Hakopian</span>
            <span className="ClothesTxt">کت شلوار های هاکوپیان</span>
            <span className="ClothesLink">
              انواع کت شلوار های مردانه و زنانه در بلک دارک
            </span>
            <div className="ClothesArrowLink"></div>
          </div>
          <img
            className="img"
            src="/public/assets/images/hero-model.png"
            alt=""
          />
        </div>
        <div className="Arrow-right-up"></div>
      </div>
      <div className="men-women-clothes">
        <div className="men-clothes">
          <div className="men-clothes-p1">
            <div className="MenClothesTxt">
              <div className="MenClothesTxtLink"></div>
              <span className="PoshakMens">پـوشـاک مـردانـه</span>
            </div>
            <img
              className="men-img"
              src="/public/assets/images/man.png"
              alt=""
            />
            <div className="multi-p">
              <p className="p-p1">MEN'S</p>
              <p className="p-p2">CLOTHING</p>
            </div>
          </div>
          <div className="men-clothes-p2"></div>
        </div>
        <div className="women-clothes">
          <div className="women-clothes-p1">
            <img
              className="women-img"
              src="/public/assets/images/women.png"
              alt=""
            />
          </div>
          <div className="women-clothes-p2">
            <div className="WomensTexts">
              <span className="WomenText">WOMEN'S </span>
              <span className="WomenText-C">C</span>
            </div>
            <span className="WomenTextEnd">LOTHING</span>
          </div>
        </div>
      </div>
      <div className="SpecialSales">
        <h1>فروش ویژه فصل</h1>
        <SpecialSale />
      </div>
    </section>
  );
}
