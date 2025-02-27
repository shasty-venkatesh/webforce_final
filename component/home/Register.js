import React, { useState } from "react";
import axios from "axios";
import "../../style/register.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Header from "./Header";
import Banner from "./Banner";
import Why from "./Why";
import Work from "./Work";
import Footer from "./Footer";
import Household from "./Household";

function Register() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (details.password !== details.confirmPassword) {
      setError("Passwords do not match!");
      toast.error("Passwords do not match!");
      return;
    }

    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user", {
        name: details.name,
        email: details.email,
        password: details.password,
        phone: details.phone,
      });

      console.log("Registration successful:", response.data);

      toast.success("Registered successfully!");

     
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
      setError("Registration failed. Please try again.");
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <Banner />
      <div className="registersection">
        <h1 className="registerheader">Create an Account</h1>
        <p className="registerpara">
          Register with your details to create an account.
        </p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={details.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            value={details.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            value={details.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={details.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
          <input
            type="text"
            id="phone"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />

          <button type="submit">Register</button>
        </form>

        <p className="loginpara loginlink">
          Already have an account? Just{" "}
          <Link className="link" to="/">
            Login
          </Link>
        </p>
      </div>
      <Work />
      <Why />
      <Household />
      <Footer />
    </div>
  );
}

export default Register;
