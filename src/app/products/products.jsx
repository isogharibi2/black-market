// import { baseUrl } from '@app/helpers/variables';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React, { useState } from 'react'

// import { Link, useNavigate } from "react-router-dom";

// export default function Products() {

//   const loginState = localStorage.getItem('verified');
//   const [queryValue, setQueryValue] = useState("");

//   const navigate = useNavigate()

//   const links = [
//     {
//       id: 0,
//       title: "صفحه اصلی",
//       url: "/",
//     },
//     {
//       id: 1,
//       title: "تماس با ما",
//       url: "/contact-us",
//     },
//     {
//       id: 2,
//       title: "درباره ما",
//       url: "/about-us",
//     },
//     {
//       id: 3,
//       title: "وبلاگ",
//       url: "/blog",
//     },
//   ];



//   const handelCategory = (Category) => {
//     setQueryValue(Category);
//     console.log(Category)
//   }

//   const queryFn = async () => {
//     try {
//       const { data } = await axios.get(`${baseUrl}/specail-offers?Category=${queryValue}`);
//       return data
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const { data: products } = useQuery({
//     queryKey: ["products", queryValue],
//     queryFn,
//   })

//   return (
//     <section>
//       <nav>
//         <ul>
//           {links.map((link) => (
//             <li key={link.id}>
//               <Link to={link.url}> {link.title} </Link>
//             </li>
//           ))}
//         </ul>

//         <button className="cart">
//           سبد خرید
//           <div className="indicator">2</div>
//         </button>
//         <button className="profile-me" onClick={() => navigate(loginState ? '/profile/user' : '/auth/register')}>
//           {loginState ? "پروفایل من" : "ثبت نام / ورود"}
//         </button>
//       </nav>
//       <div className="sub-nav">
//         <div className="search-bar">
//           <img src="/public/assets/icons/Vector.svg" alt="" />
//           <input type="text" name="search-all" id="searchTheWholeSite" placeholder="جستجو" />
//         </div>
//         <ul>
//           <li onClick={(e) => handelCategory(e.target.textContent)}> پیراهن </li>
//           <li onClick={(e) => handelCategory(e.target.textContent)}> تیشرت </li>
//           <li onClick={(e) => handelCategory(e.target.textContent)}> شلوار </li>
//           <li onClick={(e) => handelCategory(e.target.textContent)}> کت و شلوار </li>
//           <li onClick={(e) => handelCategory(e.target.textContent)}> ژاکت </li>
//           <li onClick={(e) => handelCategory(e.target.textContent)}> کاپشن </li>
//         </ul>
//         <h3>BLACK DARK</h3>
//       </div>
//       <div>
//         {products && products.map((products) => (
//           <div key={products.id}>
//             <p></p>
//             <h3>{products.title}</h3>
//             <p>{products.Category}</p>
//             <p>BRAND :{products.brand}</p>
//             <p>ORIGINAL PRICE : {products.originalPrice}تومان</p>
//             <p>OFFER PRICE : {products.offerPrice ? products.offerPrice : "not available"}تومان</p>
//             <p>DISCOUNT : {products.percentage}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }
import { baseUrl } from '@app/helpers/variables';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function Products() {
  const loginState = localStorage.getItem('verified');
  const [queryValue, setQueryValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const links = [
    { id: 0, title: "صفحه اصلی", url: "/" },
    { id: 1, title: "تماس با ما", url: "/contact-us" },
    { id: 2, title: "درباره ما", url: "/about-us" },
    { id: 3, title: "وبلاگ", url: "/blog" },
  ];

  const categories = [
    "پیراهن", "تیشرت", "شلوار", "کت و شلوار", "ژاکت", "کاپشن"
  ];

  const handleCategory = (category) => {
    setQueryValue(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQueryValue(searchInput);
  };

  const queryFn = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/specail-offers`, {
        params: {
          Category: queryValue,
          q: searchInput
        }
      });
      return data;
    } catch (err) {
      console.error("Error fetching products:", err);
      throw new Error("Failed to fetch products");
    }
  };

  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ["products", queryValue, searchInput],
    queryFn,
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + " تومان";
  };

  return (
    <section className="products-container">
      {/* Navigation */}
      <nav className="main-nav">
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.id}>
              <Link to={link.url}>{link.title}</Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="cart-btn">
            سبد خرید
            <span className="indicator">2</span>
          </button>
          <button 
            className="profile-btn" 
            onClick={() => navigate(loginState ? '/profile/user' : '/auth/register')}
          >
            {loginState ? "پروفایل من" : "ثبت نام / ورود"}
          </button>
        </div>
      </nav>

      {/* Sub Navigation */}
      <div className="sub-nav">
        <form onSubmit={handleSearch} className="search-bar">
          <img src="/public/assets/icons/Vector.svg" alt="Search icon" />
          <input 
            type="text" 
            placeholder="جستجو" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">جستجو</button>
        </form>
        
        <ul className="category-list">
          {categories.map((category) => (
            <li 
              key={category} 
              onClick={() => handleCategory(category)}
              className={queryValue === category ? 'active' : ''}
            >
              {category}
            </li>
          ))}
        </ul>
        
        <h3 className="brand-title">BLACK DARK</h3>
      </div>

      {/* Products Display */}
      <div className="products-grid">
        {isLoading && <div className="loading">در حال بارگذاری...</div>}
        {isError && <div className="error">خطا در دریافت محصولات: {error.message}</div>}
        
        {products?.length === 0 && (
          <div className="no-products">محصولی یافت نشد</div>
        )}

        {products?.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img 
                src={`/public/assets/images/${product.img}`} 
                alt={product.title} 
                onError={(e) => {
                  e.target.src = '/public/assets/images/placeholder.png';
                }}
              />
              {product.percentage && (
                <span className="discount-badge">{product.percentage}% تخفیف</span>
              )}
            </div>
            
            <div className="product-details">
              <h3>{product.title}</h3>
              <p className="category">{product.Category}</p>
              <p className="brand">برند: {product.brand}</p>
              
              <div className="price-section">
                {product.offerPrice ? (
                  <>
                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                    <span className="offer-price">{formatPrice(product.offerPrice)}</span>
                  </>
                ) : (
                  <span className="price">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              
              <div className="sizes">
                سایزهای موجود: 
                {['SM', 'S', 'M', 'L', 'XL'].map(size => (
                  product[`size${size}`] && <span key={size}>{size}</span>
                ))}
              </div>
              
              <button 
                className="add-to-cart"
                onClick={() => console.log('Add to cart', product.id)}
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}