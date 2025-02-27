import BannerImg from "../../image/banner.png";
import "../../style/banner.css"
function Banner() {
  return (
    <div className="userbanner">
      <h1>
        Sell your recyclables online<br /> with <span>GreenLoop!</span>
      </h1>
      <p>Paper - Plastics - Metals - Appliances</p>
      <img src={BannerImg} alt="banner" />
    </div>
  );
}

export default Banner;
