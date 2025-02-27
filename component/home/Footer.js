import React from 'react';
import '../../style/footer.css';
import logoImg from "../../image/logo.png";

const Footer = () => {
  return (
    <footer className="footer_section">
      <div className="container footer_container">
        <div className="row footer_padding">
          {/* Contact Section */}
          <div className="col-md-4">
            <p className="contact_us">Contact Us</p>
            <p>
              <ion-icon
                icon="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Call</title><path d='M451 374c-15.88-16-54.34-39.35-73-48.76-24.3-12.24-26.3-13.24-45.4.95-12.74 9.47-21.21 17.93-36.12 14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48 5.41-23.23 14.79-36c13.22-18 12.22-21 .92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9 44 119.9 47 108.83 51.6A160.15 160.15 0 0083 65.37C67 76 58.12 84.83 51.91 98.1s-9 44.38 23.07 102.64 54.57 88.05 101.14 134.49S258.5 406.64 310.85 436c64.76 36.27 89.6 29.2 102.91 23s22.18-15 32.83-31a159.09 159.09 0 0013.8-25.8C465 391.17 468 391.17 451 374z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/></svg>"
                role="img"
                className="md"
              />
              &nbsp;
              <a href="tel:+918595358613" className='number'>+91 8960106544</a>
            </p>
            <p className='gmail'>
              <ion-icon
                icon="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Mail</title><rect x='48' y='96' width='416' height='320' rx='40' ry='40' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-linejoin='round' d='M112 160l144 112 144-112' class='ionicon-fill-none ionicon-stroke-width'/></svg>"
                role="img"
                className="md"
              />
              &nbsp; team@E-Scrap.com
            </p>
            <p style={{ fontWeight: '700'  }} className='com'>
              Customer Support available <br /> from 10am - 7pm
            </p>
            <p className="find_us">Find Us Here</p>
            <ul className="find_us_ul">
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://ikp.edgekit.net/y8s2vhk66ef/image_2_Bi5cqcyBFNT.png?updatedAt=1628624823915"
                    alt="instagram"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://ikp.edgekit.net/y8s2vhk66ef/image_3_yByOZld4XFh.png?updatedAt=1628624824789"
                    alt="twitter"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://ikp.edgekit.net/y8s2vhk66ef/image_6_zHp_XCLcq9Z.png?updatedAt=1628624826605"
                    alt="linkedin"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://ikp.edgekit.net/y8s2vhk66ef/image_5_3EElSEX6sCW.png?updatedAt=1628624825705"
                    alt="facebook"
                  />
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 footer-address">
            <img
              className="logo_class"
              src={logoImg}
              alt="Scrapuncle"
            />
            <p className="swapeco">
              <b>Swapeco Solutions Private Limited</b>
            </p>
            <p>
              <b>Regd. Address:</b> <br />
              C-171, Phase-I, Okhla Industrial Estate Phase 1, New Delhi - 110020
            </p>
            <p>
              <br />
              <b>Corr Address:</b>
              <br />
              Incubation Center, IIIT Delhi, Okhla Phase 3, New Delhi - 110020
            </p>
          </div>
        </div>
      </div>

      {/* Helper Action (Fixed button for WhatsApp/Call) */}
      <div className="helper-action active">
        
        <ul>
          <li>
            <a href="tel:+918595358613">
              <img
                src="https://ikp.edgekit.net/h1rxzpffx/scrapuncle/assets/telephone-call_0Etr04ShlH.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675339109083"
                style={{ background: 'rgb(255, 255, 255)', borderRadius: '100%' }}
                alt="Call"
              />
            </a>
          </li>
          <li>
            <a href="https://wa.me/918595358613">
              <img
                src="https://ikp.edgekit.net/h1rxzpffx/scrapuncle/assets/whatsapp_VhssjIqsN5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675339111494"
                alt="WhatsApp"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;