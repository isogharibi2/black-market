import React from "react";

import "./home.scss";

export default function Home() {
  return (
    <section className="Hero-container">
      <div className="first-model">
        <div className="hero-img">
          <div className="Hero-model"></div>
          <img src="/public/assets/images/hero-model.png" alt="" />
        </div>
        <div className="Arrow-right-up"></div>
      </div>
      <div className="men-women-clothes">
        <div className="men-clothes">
          <div className="men-clothes-p1">
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
          <div className="women-clothes-p2"></div>
        </div>
      </div>
    </section>
  );
}
