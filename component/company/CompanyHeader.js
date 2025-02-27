import React from "react";
import logoImg from "../../image/logo.png";
import { Link, useLocation,useNavigate } from "react-router-dom";

function CompanyHeader() {
  const location = useLocation();
  const navigate=useNavigate();
  return (
    <div className="workerheaderbar">
      <header>
        <img src={logoImg} alt="logo" />
        <nav>
          <ul>
            <li>
              <Link
                className={location.pathname === "/companyorder" ? "active" : "link"}
                to="/companyorder"
              >
                Scrap Shop
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <button className="logout" onClick={() => navigate("/")}>
        Logout
      </button>
    </div>
  );
}

export default CompanyHeader;
