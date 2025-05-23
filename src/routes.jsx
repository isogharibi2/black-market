import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "@app/ui/layouts/navbar";

import Home from "@pages/home";
import NotFound from "@app/pages/404";
import Register from "@pages/auth/register";
import Login from "@app/pages/auth/login";
import Verification from "@app/pages/auth/verification/index";
import SpecailOffer from "@app/pages/Products/specail-offers";
import User from "@app/pages/profile/user";
import Admin from "@app/pages/profile/admin";
import Productdetlais from "@app/ui/components/productdetlais";
import Product from "@app/products/products";
import ProfilePage from "@app/pages/profile/ProfilePage";

function App() {
  const location = useLocation();

  const notAllowed = [
    "/auth/register",
    "/auth/login",
    "/auth/verify",
    "/auth/forget-password",
    "/auth/verification",
    "/products"
  ];
  const hideNav = notAllowed.includes(location.pathname);

  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/verification" element={<Verification />} />
        <Route
          path="/products/special-offers/:slug"
          element={<SpecailOffer />}
        />
        <Route path="/profile/user" element={<User/>}/>
        <Route path="/profile/admin/new-product" element={<Admin/>}/>
        <Route path="/products/product-details/:slug" element={ <Productdetlais />} />
        <Route path="/Products" element={ <Product />} />
        <Route path="/ProfilePage" element={<ProfilePage />}/>
      </Routes>
    </>
  );
}

export default App;
