import React from "react";
import "../../style/household_business.css";

function Household() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h2 className="deferent_title">
                Households &amp; Businesses have different needs and we cater to
                each of them
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="row f-sm-column-reverse">
        <div className="col-md-6">
          <div className="content-holder">
            <p className="deferent_sub_title">For Households</p>
            <ul className="deferent_ul">
              <li>
                <img
                  src="https://ik.imagekit.io/99x/startup/99xCheck_S1K62CB8I.svg"
                  alt="assets"
                />
                <span className="sub-sub-title">On-Demand Doorstep Pickups</span>
              </li>
              <li>
                <img
                  src="https://ik.imagekit.io/99x/startup/99xCheck_S1K62CB8I.svg"
                  alt="assets"
                />
                <span className="sub-sub-title" >Accurate Digital Weighing</span>
              </li>
              <li>
                <img
                  src="https://ik.imagekit.io/99x/startup/99xCheck_S1K62CB8I.svg"
                  alt="assets"
                />
                <span className="sub-sub-title" >Safety (Trained &amp; Verified Staff)</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-6 mb-4 text-center">
          <img
            className="deferent_image"
            src="https://ikp.edgekit.net/y8s2vhk66ef/home_illust_1_vqbxsy5za.png?updatedAt=1628667425589"
            alt="defent_image"
          />
        </div>
      </div>
      <div className="row" style={{ marginTop: "50px" }}>
        <div className="col-md-6 text-center">
          <img
            className="deferent_image_household"
            src="https://ikp.edgekit.net/y8s2vhk66ef/business_illust1_1_UjVieCFRixz.png?updatedAt=1628667425278"
            alt="defent_image"
          />
        </div>
        <div className="col-md-6">
          <div className="content-holder">
            <p className="deferent_sub_title">For Businesses</p>
            <ul className="deferent_ul">
              <li>
                <img
                  src="https://ik.imagekit.io/99x/startup/99xCheck_S1K62CB8I.svg"
                  alt="assets"
                />
                <span className="sub-sub-title" >Formal Payments &amp; Documentation</span>
              </li>
              <li>
                <img
                  src="https://ik.imagekit.io/99x/startup/99xCheck_S1K62CB8I.svg"
                  alt="assets"
                />
                <span className="sub-sub-title" >Sustainability Reports</span>
              </li>
              <li>
                <img
                  src="https://ik.imagekit.io/99x/startup/99xCheck_S1K62CB8I.svg"
                  alt="assets"
                />
                <span className="sub-sub-title" >Competitive Prices</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Household;