import { baseUrl } from '@app/helpers/variables';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import "./products.scss"

import { Link, useNavigate } from "react-router-dom";

export default function Products() {

  const loginState = localStorage.getItem('verified');
  const [selectedCategory, setSelectedCategory] = useState("");

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



  // const handelCategory = (Category) => {
  //   setQueryValue(Category);
  //   console.log(Category)
  // }

  const queryFn = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/specail-offers`);
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: products } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn,
  })

  const categories = [...new Set(products?.map(product => product.Category))];

  const filteredProducts = products?.filter((product) => product.Category === selectedCategory);

  return (
    <section className=''>
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
        {categories?.map((category , index) => (
            <li onClick={(e) => setSelectedCategory(category)} key={index}> {category} </li>
          ))}
        </ul>
        <h3>BLACK DARK</h3>
      </div>
      <div className='Products'>
        {selectedCategory !== "" ? filteredProducts?.map((products) => (
          <div key={products.id}>
            <p></p>
            <h3>{products.title}</h3>
            <p>{products.Category}</p>
            <p>BRAND :{products.brand}</p>
            <p>ORIGINAL PRICE : {products.originalPrice}تومان</p>
            <p>OFFER PRICE : {products.offerPrice ? products.offerPrice : "not available"}تومان</p>
            <p>DISCOUNT : {products.percentage}</p>
          </div>
        )) : products?.map((products) => (
          <div key={products.id}>
            <p></p>
            <h3>{products.title}</h3>
            <p>{products.Category}</p>
            <p>BRAND :{products.brand}</p>
            <p>ORIGINAL PRICE : {products.originalPrice}تومان</p>
            <p>OFFER PRICE : {products.offerPrice ? products.offerPrice : "not available"}تومان</p>
            <p>DISCOUNT : {products.percentage}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
