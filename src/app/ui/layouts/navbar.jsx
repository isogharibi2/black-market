import React from "react";
import "./navbar.scss";

import { Link, useNavigate } from "react-router-dom";

export default function navbar() {
  const Navigate = useNavigate();

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
      id: 3,
      title: "وبلاگ",
      url: "/blog",
    },
  ];

  const NavbarOpt = [
    {
      id: 1,
      title: "کاپشن",
    },
    {
      id: 2,
      title: "ژاکت",
    },
    {
      id: 3,
      title: "کت و شلوار",
    },
    {
      id: 4,
      title: "شلوار",
    },
    {
      id: 5,
      title: "تیشرت",
    },
    {
      id: 6,
      title: "پیراهن",
    },
  ];

  function NavigateUser() {
    Navigate(
      localStorage.getItem("verified") ? "/profile/user" : "/auth/register"
    );
  }

  return (
    <section>
      <nav>
        {links.map((link) => (
          <ul key={link.id}>
            <li>
              <Link to={link.url}> {link.title} </Link>
            </li>
          </ul>
        ))}

        <button className="cart">
          سبد خرید
          <div className="indicator">2</div>
        </button>
        <button
          style={{ cursor: "pointer" }}
          className="profile-me"
          onClick={NavigateUser}
        >
          {localStorage.getItem("verified") ? "پروفایل من" : "ثبت نام / ورود"}
        </button>
      </nav>
      <div className="title">
        <span className="TitleName">BLACK DARK</span>
        <ul className="ul">
          {NavbarOpt.map((Clothes) => (
            <li key={Clothes.id}>
              <Link to={Clothes.url}> {Clothes.title} </Link>
            </li>
          ))}
        </ul>
        <div className="search">
          <input type="search-box" placeholder="جستجو" />
          <img src="/public/assets/icons/Vector.svg" alt="" />
        </div>
      </div>
    </section>
  );
}
