import React, { useContext } from "react";
import "./register.scss";

import { Link } from "react-router-dom";
import Input from "@app/ui/components/input";

import { AuthenticationContext } from "@app/context/AuthenticationContext";
import { baseUrl } from "@app/helpers/variables";
import axios from "axios";

import { useMutation } from "@tanstack/react-query";

export default function Register() {
  const { username, email , password , confirmPassword } = useContext(AuthenticationContext);

  const formType = "register";

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/register` , {
        username : username , 
        email : email ,
        password : password , 
        confirmPassword : confirmPassword
      });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  const { mutate: register } = useMutation({
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
          <Input formType={formType} />
          <button type="submit">ثبت نام</button>
        </div>
        <Link to="/auth/login"> حساب کاربری دارید؟ ورود </Link>
      </form>
    </div>
  );
}
