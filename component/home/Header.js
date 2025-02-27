import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../../image/logo.png";
import "../../style/header.css";
// import "../../style/loginModal.css"; // Import the new CSS file
import toast from "react-hot-toast";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import you from "./YouTubeVideoSearch";

function Header() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setGlobalId } = useContext(GlobalContext);

  const handleInputChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleAdmit(e) {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:3000/api/v1/admin");
      const data = res.data;

      const matchedAdmin = data.find(
        (user) =>
          user.email.trim() === credentials.email.trim() &&
          user.password.trim() === credentials.password.trim()
      );

      if (!matchedAdmin) {
        toast.error("Invalid admin credentials");
        return;
      }

      setGlobalId(matchedAdmin._id);
      toast.success("Admin login successful!");

      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Server error. Try again later.");
    }
  }

  return (
    <div className="headerbar">
      <header>
        <img src={logoImg} alt="logo" />
        <nav>
          <ul>
            <li>
              <Link className={location.pathname === "/scraprate" ? "active" : "link"} to="/scraprate">
                Scrap Rates
              </Link>
            </li>
            <li>
              <Link className={location.pathname === "/workeradd" ? "active" : "link"} to="/workeradd">
                Get Hired
              </Link>
            </li>
            <li>
              <Link className={location.pathname === "/companyform" ? "active" : "link"} to="/companyform">
                Be Partner with us
              </Link>
            </li>
            <li>
              <Link className={location.pathname === "/you" ? "active" : "link"} to="/you">
                Get Tutorials
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      
      <button className="loginadmin" onClick={() => setShowLogin(true)}>
        Login for admin
      </button>

      {/* Admin Login Form - Centered */}
      {showLogin && (
        <div className="admin-login-overlay">
          <div className="admin-login-modal">
            <h2>Admin Login</h2>
            <form onSubmit={handleAdmit}>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                required
              />
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowLogin(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
