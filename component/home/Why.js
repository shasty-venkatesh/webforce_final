import React from "react";
import "../../style/why.css";

function Why() {
  return (
    <section id="whyus" className="why_us">
      <div className="container text-center">
        <h2 className="header--why-us">Why us</h2>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-xl-3">
            <div className="why_us_col">
              <img
                src="https://ikp.edgekit.net/h1rxzpffx/scrapuncle/why-us/rupee_h5cohN94jkyh.png"
                alt="Best Rates"
              />
              <div>
                <h4>Best Rates</h4>
                <p>
                  We provide the best value for your scrap from our network of
                  Recyclers.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-xl-3">
            <div className="why_us_col">
              <img
                src="https://ikp.edgekit.net/h1rxzpffx/scrapuncle/why-us/thumbs-up_vOIp-YChzZhh.png"
                alt="Convenience"
              />
              <div>
                <h4>Convenience</h4>
                <p>
                  Doorstep pickup according to user's convenient date &amp;
                  time.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-xl-3">
            <div className="why_us_col">
              <img
                src="https://ikp.edgekit.net/h1rxzpffx/scrapuncle/why-us/trust_TmQdK2fLBVD.png"
                alt="Trust"
              />
              <div>
                <h4>Trust</h4>
                <p>
                  Trained &amp; Verified Pickup Staff with Swapeco Smart
                  Weighing Scale
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-xl-3">
            <div className="why_us_col">
              <img
                src="https://ikp.edgekit.net/h1rxzpffx/scrapuncle/why-us/eco_wwfqNtl3n-r.png"
                alt="Eco-friendly"
              />
              <div>
                <h4>Eco-friendly</h4>
                <p>We ensure responsible recycling of your scrap items.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Why;
