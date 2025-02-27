import workerImg from "../../image/headphone.png";
import phoneIcon from "../../image/telephone.png";
import cashIcon from "../../image/cash.png";
import locationIcon from "../../image/pin.png";
import weightIcon from "../../image/weight-scale.png";
import recycleIcon from "../../image/recycleicon.png";

import "../../style/worker.css";

function Workercard({
  name,
  time,
  slot,
  address,
  phoneNumber,
  weight,
  cost,
  category,
  completed,
  canceled,
}) {
  return (
    <div className="workercard">
      <div className="workerheader">
        <div className="workerheader1">
          <img src={workerImg} alt="icon" className="personicon" />
          <p className="workername">{name}</p>
        </div>
        <div className="workertime">
          <p className="time">{time}</p>
          <p className="slot">{slot}</p>
        </div>
      </div>
      <div>
        <ul className="workerbody">
          <li>
            <img src={locationIcon} alt="icon" className="icon" />
            <p className="workerdetail">{address}</p>
          </li>
          <li>
            <img src={phoneIcon} alt="icon" className="icon" />
            <p className="workerdetail">{phoneNumber}</p>
          </li>
          <li>
            <img src={weightIcon} alt="icon" className="icon" />
            <p className="workerdetail">{weight}KG</p>
          </li>
          <li>
            <img src={cashIcon} alt="icon" className="icon" />
            <p className="workerdetail">₹{cost}</p>
          </li>
          <li>
            <img
              width="24"
              height="24"
              src={recycleIcon}
              alt="recycle-sign"
              className="icon"
            />
            <p className="workerdetail">{category}</p>
          </li>
        </ul>
        <div className="workerbutton">
          <button className="completed" onClick={completed}>
            ✓
          </button>
          <button className="cancel" onClick={canceled}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default Workercard;
