import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./verification.scss";

const numberInputs = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export default function Verification() {
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
      emailjs.send("service_jzt7qq6", "template_r2nj78k", { code , email : localStorage.getItem("email") }).then(
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

  const checkcode = (e) => {
    e.preventdefault();
    let enteredCode = localStorage.getItem("code");

    if (enteredCode == code) {
      alert("Verfication was seccesfully");
    } else {
      alert("error");
    }
  };

  return (
    <div className="wrapper">
      <div className="model">
        <img src="/assets/images/verification.png" alt="model sign up" />
      </div>
      <form onSubmit={checkcode}>
        <h3>BLACK DARK</h3>
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
            <Link to="/auth/login"> ویرایش ایمیل </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
