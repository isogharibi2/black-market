import React, { useContext } from "react";
import "./login.scss";

import { Link, useNavigate } from "react-router-dom";

import Input from "@ui/components/input";
import { AuthenticationContext } from "@app/context/AuthenticationContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function Login() {
  const { loginUsername, loginPassword } = useContext(AuthenticationContext);
  const Navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/register`);
      const user = response.data.find(
        (user) =>
          user.username === loginUsername && user.password === loginPassword
      );
      if (user) {
        toast.success("seccess login", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          onClose :  () => Navigate("/auth/verification") 
        });
        localStorage.setItem("verified", true);
        localStorage.setItem("email" , user.email)
        localStorage.setItem("username" , user.username)
        localStorage.setItem("password" , user.password)
      } else {
        toast.error("your username or password is not true", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const formType = "login";
  const { data: login } = useQuery({
    queryKey: "login",
    queryFn: loginUser,
  });

  return (
    <div className="wrapper">
      <ToastContainer />
      <div className="model">
        <img src="/assets/images/login.png" alt="model login" />
      </div>

      <form onSubmit={loginUser}>
        <h3>BLACK DARK</h3>
        <div className="details">
          <Input formType={formType} />
          <button type="submit">ورود</button>
          <div className="row">
            <Link to="/auth/register">ثبت نام</Link>
            <Link to="/auth/forget-password">فراموشی رمز عبور</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
