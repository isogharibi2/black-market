import React, { useContext } from "react";
import "./input.scss";

import { AuthenticationContext } from "@app/context/AuthenticationContext";

export default function Input({ formType }) {
  const { username, setUsername } = useContext(AuthenticationContext);
  const { email, setEmail } = useContext(AuthenticationContext);
  const { password, setPassword } = useContext(AuthenticationContext);
  const { confirmPassword, setConfirmPassword } = useContext(
    AuthenticationContext
  );

  const { loginUsername, setLoginUsername } = useContext(AuthenticationContext);
  const { loginPassword, setLoginPassword } = useContext(AuthenticationContext);

  return (
    <>
      {formType === "register" ? (
        <>
          <input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onInput={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder=" تکرار رمز عبور"
            value={confirmPassword}
            onInput={(e) => setConfirmPassword(e.target.value)}
          />
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="نام کاربری"
            value={loginUsername}
            onInput={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={loginPassword}
            onInput={(e) => setLoginPassword(e.target.value)}
          />
        </>
      )}
    </>
  );
}
