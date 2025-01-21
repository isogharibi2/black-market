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
  ];

  return (
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
      <button className="profile-me">پروفایل من</button>
    </nav>
  );
}
