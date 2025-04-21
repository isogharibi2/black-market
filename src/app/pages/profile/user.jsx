import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function User() {
  const navigate = useNavigate();

  const deleteAccountUser = () => {
    localStorage.removeItem("verified");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    navigate("/auth/register");
  }

  useEffect(() => {
    if (!localStorage.getItem("verified")) {
      navigate("/auth/register");
    }
  }, [navigate]); // Added navigate to dependency array

  return (
    <div>
      <h1>Welcome to user page</h1>
      <button onClick={deleteAccountUser}>Log Out</button>
    </div>
  )
}