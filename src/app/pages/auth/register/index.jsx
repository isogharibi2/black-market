import React, { useContext } from "react";
import "./register.scss";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { AuthenticationContext } from "@app/context/AuthenticationContext";

import { Link, useNavigate } from "react-router-dom";
import Input from "@app/ui/components/input";

export default function Register() {
  const { username, email, password } = useContext(AuthenticationContext);
  const Navigate = useNavigate();

  const formInputs = [
    {
      id: 0,
      type: "text",
      placeholder: "نام کاربری",
    },

    {
      id: 1,
      type: "text",
      placeholder: "شماره موبایل",
    },

    {
      id: 2,
      type: "password",
      placeholder: "رمز عبور",
    },
    {
      id: 3,
      type: "password",
      placeholder: "تکرار رمز عبور",
    },
  ];

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/register", {
        username,
        email,
        password,
        admin: false,
      });
      console.log(response.data);
      Navigate("/auth/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const { mutate: register } = useMutation({
    mutationKey: ["register"],
    mutationFn: registerUser,
  });

  return (
    <div className="wrapper">
      <div className="model">
        <img src="/assets/images/register.png" alt="model sign up" />
      </div>
      <form onSubmit={register}>
        <h3> BLACK DARK </h3>
        <div className="details">
          {<Input formType={"register"} />}
          <button type="submit">ثبت نام</button>
        </div>
        <Link to="/auth/login"> حساب کاربری دارید؟ ورود </Link>
      </form>
    </div>
  );
}
