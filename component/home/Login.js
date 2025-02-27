import React, { useContext, useState } from "react";
import "../../style/login.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Header from "./Header";
import Banner from "./Banner";
import Why from "./Why";
import Work from "./Work";
import Footer from "./Footer";
import Household from "./Household";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";

function Login() {
  const navigate = useNavigate();
  const { globalId, setGlobalId } = useContext(GlobalContext);
  const [details, setDetails] = useState({
    email: "",
    password: "",
    role: "",
  });

  async function handleworker() {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/worker");
      const data = res.data;
      const matchedWorker = data.find(
        (worker) =>
          worker.email === details.email && worker.password === details.password
      );
      if (!matchedWorker) {
        toast.error("Invalid Email and password for worker");
      } else {
        setGlobalId(matchedWorker._id);
        toast.success("Login successfully for worker");
        setTimeout(() => {
          navigate("/worker");
        }, 2000);
      }
    } catch (err) {
      toast.error("Login failed for worker");
    }
  }

  async function handlecustomer() {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user");
      const data = res.data;
      const matchedCompany = data.find(
        (user) =>
          user.email === details.email && user.password === details.password
      );
      if (!matchedCompany) {
        toast.error("Invalid Email and password for customer");
      } else {
        console.log(matchedCompany._id);
        await setGlobalId(matchedCompany._id);
        toast.success("Login successfully for customer");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (err) {
      toast.error("Login failed for customer");
    }
  }

  async function handlecompany() {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/company");
      const data = res.data;
      console.log(data);
      const matchedCompany = data.find(
        (user) =>
          user.email === details.email && user.password === details.password
      );
      if (!matchedCompany) {
        toast.error("Invalid Email and password for company");
      } else {
        console.log(matchedCompany._id);
        await setGlobalId(matchedCompany._id);
        toast.success("Login successfully for company");
        setTimeout(() => {
          navigate("/companyorder");
        }, 2000);
      }
    } catch (err) {
      toast.error("Login failed for company");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.role === "worker") {
      handleworker();
    } else if (details.role === "customer") {
      handlecustomer();
    } else if (details.role === "company") {
      handlecompany();
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <Banner />
      <div className="loginsection">
        <h1 className="loginheader">Welcome Back</h1>
        <p className="loginpara">Please enter your details to login.</p>
        <form onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            required
          />

          <fieldset>
            <legend>Role</legend>
            <label>
              <input
                type="radio"
                name="role"
                value="customer"
                checked={details.role === "customer"}
                onChange={handleChange}
              />
              Customer
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="worker"
                checked={details.role === "worker"}
                onChange={handleChange}
              />
              Worker
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="company"
                checked={details.role === "company"}
                onChange={handleChange}
              />
              Company
            </label>
          </fieldset>

          <button type="submit">Submit</button>
        </form>
        <p className="registerpara registerlink">
          New to One! Just{" "}
          <Link className="link" to="/register">
            Register only for user
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

export default Login;
