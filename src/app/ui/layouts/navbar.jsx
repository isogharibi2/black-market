import React from "react";
import "./navbar.scss";

import { Link, useNavigate } from "react-router-dom";

export default function navbar() {

  const loginState = localStorage.getItem('verified');

  const navigate = useNavigate()

  const links = [
    {
      id: 0,
      title: "صفحه اصلی",
      url: "/",
    },
    {
      id: 1,
      title: "تماس با ما",
      url: "/contact-us",
    },
    {
      id: 2,
      title: "درباره ما",
      url: "/about-us",
    },
    {
      id: 3,
      title: "وبلاگ",
      url: "/blog",
    },
  ];

  return (
    <>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <Link to={link.url}> {link.title} </Link>
            </li>
          ))}
        </ul>

        <button className="cart">
          سبد خرید
          <div className="indicator">2</div>
        </button>
        <button className="profile-me" onClick={() => navigate(loginState ? '/profile/user' : '/auth/register')}>
          {loginState ? "پروفایل من" : "ثبت نام / ورود"}
        </button>
      </nav>
      <div className="sub-nav">
        <div className="search-bar">
          <img src="/public/assets/icons/Vector.svg" alt="" />
          <input type="text" name="search-all" id="searchTheWholeSite" placeholder="جستجو" />
        </div>
        <ul>
          <li> پیراهن </li>
          <li> تیشرت </li>
          <li> شلوار </li>
          <li> کت و شلوار </li>
          <li> ژاکت </li>
          <li> کاپشن </li>
        </ul>
        <h3>BLACK DARK</h3>
      </div>
    </>
  );
}