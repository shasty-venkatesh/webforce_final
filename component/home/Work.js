import React from "react";
import "../../style/work.css";

function Work() {
  return (
    <section className="how_works">
      <div className="container text-center">
        <h2 className="how_works_title">How it works</h2>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="how_works_col">
              <h4>Schedule a pickup</h4>
              <img
                src="https://ikp.edgekit.net/y8s2vhk66ef/undraw_Online_calendar_re_wk3t_1_SHrgqjm1w6l.png?updatedAt=1628624813421"
                alt="Schedule a pickup"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="how_works_col">
              <h4>Pickup at your address</h4>
              <img
                src="https://ikp.edgekit.net/y8s2vhk66ef/undraw_Street_food_re_uwex_1_tHCc3auJgJY.png?updatedAt=1628624814853"
                alt="Pickup at your address"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="how_works_col">
              <h4>Receive payment</h4>
              <img
                src="https://ikp.edgekit.net/y8s2vhk66ef/undraw_Credit_card_payments_re_qboh_1_Sop8u3hvUiX.png?updatedAt=1628624812461"
                alt="Receive payment"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Work;