import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./verification.scss";
import axios from "axios";

import { baseUrl } from "@app/helpers/variables";

const numberInputs = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export default function Verification() {
  const [EditComponent, SetEditComponent] = useState(false);
  const [edittedEmail, SetedittedEmail] = useState("");
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const functionEditEmail = async (e) => {
    e.preventDefault();
    try {
      const GetTheUsers = await axios.get(`${baseUrl}/register`);
      const users = GetTheUsers.data;

      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      console.log(user);

      if (user) {
        const response = await axios.patch(`${baseUrl}/register/${user.id}`, {
          email: edittedEmail,
        });
        if (response.status === 200) {
          SetEditComponent(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  emailjs.init({
    publicKey: "oWwXTGE5QgGotrAuI",
    // Do not allow headless browsers
    limitRate: {
      // Set the limit rate for the application
      id: "app",
      // Allow 1 request per 10s
      throttle: 10000,
    },
  });

  const Navigate = useNavigate();

  const [values, setValues] = useState(["", "", "", "", ""]); // Track values of each input
  const inputRefs = useRef([]); // Store refs for each input element
  const [code, setcode] = useState(Math.floor(Math.random() * 99999) + 1000);
  localStorage.setItem("code", code);

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newValues = [...values];
    newValues[index] = value;
    // Move to the next input if there's a value
    setValues(newValues);
    if (value && index < numberInputs.length - 1) {
      // Focus next input
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("verified") === null) {
      Navigate("/auth/login");
    } else if (localStorage.getItem("verified") == "true") {
      emailjs
        .send("service_jzt7qq6", "template_r2nj78k", {
          code,
          email: localStorage.getItem("email"),
        })
        .then(
          (response) => {
            console.log("ایمیل ارسال شد", response.status, response.text);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, []);

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && values[index] === "") {
      // Focus previous input if backspace is pressed and the current input is empty
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "Backspace" && values[index] !== "") {
      // If there's a value, just delete it
      const newValues = [...values];
      newValues[index] = "";
      setValues(newValues);
    } else if (e.key === "Delete" && values[index] === "") {
      // Focus next input if delete is pressed and current input is empty
      if (index < numberInputs.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (e.key === "Delete" && values[index] !== "") {
      // If there's a value, just delete it
      const newValues = [...values];
      newValues[index] = "";
      setValues(newValues);
    }
  };

  const Navigated = useNavigate();

  const checkcode = (e) => {
    e.preventDefault();

    let enteredCode = localStorage.getItem("code");

    if (enteredCode == code) {
      alert("Verfication was seccesfully");
      Navigated("/profile/user");
    } else {
      alert("error");
    }

    const AdminCheck = async () => {
      try {
        const GetTheUsers = await axios.get(`${baseUrl}/register`);
        const users = GetTheUsers.data;

        const user = users.find(
          (user) => user.username === username && user.password === password
        );

        console.log(user);

        if (user) {
          localStorage.setItem("admin", user.admin);

          if (user.admin) {
            Navigate("/profile/admin/new-product");
          } else {
            Navigate("/profile/user");
          }
        } else {
          alert("false");
        }
      } catch (error) {
        console.log(error);
      }
    };
    AdminCheck();
  };

  // if (AdminCheckState) {

  // }

  return (
    <div className="wrapper">
      <div className="model">
        <img src="/assets/images/verification.png" alt="model sign up" />
      </div>
      <form onSubmit={checkcode}>
        <h3>BLACK DARK</h3>
        {!EditComponent ? (
          <div className="details">
            <div className="box-container">
              {numberInputs.map((number, index) => (
                <input
                  key={number.id}
                  type="text"
                  className="numbers"
                  value={values[index]}
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <button type="submit"> تایید کد </button>
            <div className="row">
              <span className="countdown"> ارسال مجدد ۴:۵۹ </span>
              <button type="button" onClick={() => SetEditComponent(true)}>
                {" "}
                ویرایش ایمیل{" "}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="box-container">
              <input
                onInput={(e) => SetedittedEmail(e.target.value)}
                type="email"
                placeholder="ایمیل جدید خود را وارد کنید !ّ"
              />
            </div>
            <button
              className="Edit-email-button"
              type="button"
              onClick={functionEditEmail}
            >
              {" "}
              ویرایش ایمیل جدید
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
