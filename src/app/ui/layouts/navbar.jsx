import React from "react";
import "./navbar.scss";

import { Link } from "react-router-dom";

export default function navbar() {
  const links = [
    {
      id: 0,
      title: "تماس با ما",
      url: "/contact-us",
    },
    {
      id: 1,
      title: "درباره ما",
      url: "/about-us",
    },
    {
      id: 2,
      title: "وبلاگ",
      url: "/blog",
    },
    {
      id: 2,
      title: "وبلاگ",
      url: "/blog",
    },
  ];

  const NavbarOpt = [
    {
      id: 1,
      title: "کاپشن",
    }, {
      id: 2,
      title: "ژاکت",
    }, {
      id: 3,
      title: "کت و شلوار",
    }, {
      id: 4,
      title: "شلوار",
    }, {
      id: 5,
      title: "تیشرت",
    }, {
      id: 5,
      title: "پیراهن",
    },
  ]


  return (
    <section>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <li to={link.url}> {link.title} </li>
            </li>
          ))}
        </ul>

        <button className="cart">
          سبد خرید
          <div className="indicator">2</div>
        </button>
        <button className="profile-me">پروفایل من</button>


      </nav>
      <div className="title">
        <span>BLACK DARK</span>
        <ul className="ul">
          {NavbarOpt.map((Clothes) => (
            <li key={Clothes.id}>
              <li to={Clothes.url}> {Clothes.title} </li>
            </li>
          ))}
        </ul>
        <div className="search">
          <input type="search-box" />
          <img src="/public/assets/icons/Vector.svg" alt="" />
        </div>
      </div>
    </section>
  );
}
