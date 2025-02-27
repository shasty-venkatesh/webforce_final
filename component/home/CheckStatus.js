import CheckStatusImg from "../../image/checkstatus.png";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/checkstatus.css";
import Header from "./Header";
import calendarIcon from "../../image/calendar.png";
import cancelIcon from "../../image/cancel.png";
import completedIcon from "../../image/completed.png";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { format } from "date-fns";

function CheckStatus() {
  const [scheduleStatuses, setScheduleStatuses] = useState([]);
  const [canceledStatuses, setCanceledStatuses] = useState([]);
  const [completedStatuses, setCompletedStatuses] = useState([]);
  const { globalId, setGlobalId } = useContext(GlobalContext);
  useEffect(() => {
    async function handleSchedule() {
      const res = await axios.get(
        `http://localhost:3000/api/v1/user/${globalId}`
      );
      const order = res.data.order;
      const filteredOrdersforschedue = order.filter(
        (item) => item.status === "pending"
      );
      setScheduleStatuses(filteredOrdersforschedue);
      const filteredOrdersforcancel = order.filter(
        (item) => item.status === "canceled"
      );
      setCanceledStatuses(filteredOrdersforcancel);
      const filteredOrdersforcompleted = order.filter(
        (item) => item.status === "completed"
      );
      setCompletedStatuses(filteredOrdersforcompleted);
    }
    handleSchedule();
  }, []);

  const navigate = useNavigate();
  const [clickSchedule, setClickSchedule] = useState([true, false, false]);
  return (
    <div className="checkstatuspage">
      <Header />
      <button className="backbutton" onClick={() => navigate("/home")}>
        ←
      </button>
      <div className="checkstatus">
        <div className="statusbutton">
          <button
            className={!clickSchedule[0] ? "schedule" : "scheduleactive"}
            onClick={() => setClickSchedule([true, false, false])}
          >
            SCHEDULED
          </button>
          <button
            className={!clickSchedule[1] ? "cancel" : "cancelactive"}
            onClick={() => {
              setClickSchedule([false, true, false]);
            }}
          >
            CANCELLED
          </button>
          <button
            className={!clickSchedule[2] ? "completed" : "completedactive"}
            onClick={() => {
              setClickSchedule([false, false, true]);
            }}
          >
            COMPLETED
          </button>
        </div>
        <div className="list">
          {clickSchedule[0] ? (
            scheduleStatuses.length > 0 ? (
              <ScheduleStatus scheduleStatuses={scheduleStatuses} />
            ) : (
              <p className="noschedulestatus">Nothing Scheduled Pickups!</p>
            )
          ) : null}
          {clickSchedule[1] ? (
            canceledStatuses.length > 0 ? (
              <CancelStatus canceledStatuses={canceledStatuses} />
            ) : (
              <p className="nocancelstatus">
                There is no Cancelled Pickup at this moment
              </p>
            )
          ) : null}
          {clickSchedule[2] ? (
            completedStatuses.length > 0 ? (
              <CompletedStatus completedStatuses={completedStatuses} />
            ) : (
              <p className="nocompletedstatus">No Completed Pickups!</p>
            )
          ) : null}
        </div>

        <hr className="line" />
        <button
          className="schedulebutton"
          onClick={() => {
            navigate("/schedule");
          }}
        >
          SCHEDULE ANOTHER PICKUP
        </button>
        <img
          src={CheckStatusImg}
          alt="checkstatusimg"
          className="checkstatusimg"
        />
      </div>
    </div>
  );
}

function ScheduleStatus({ scheduleStatuses }) {
  return (
    <div>
      <ul>
        {scheduleStatuses.map((item, index) => {
          return (
            <li className="schedulelist" key={index}>
              <div className="schedulelistheader">
                <img src={calendarIcon} alt="icon" />
                <div>
                  <p className="scheduleaddress">{item.address}</p>
                  <div className="category">
                    <p>Category : {item.category}</p>
                    <p className="price">Price : ₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="scheduletime">
                  {format(new Date(item.date), "eeee, MMMM dd, yyyy")}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CancelStatus({ canceledStatuses }) {
  return (
    <div>
      <ul>
        {canceledStatuses.map((item, index) => {
          return (
            <li className="cancellist" key={index}>
              <div className="cancellistheader">
                <img src={cancelIcon} alt="icon" />
                <div>
                  <p className="canceladdress">{item.address}</p>
                  <div className="cancelcategory">
                    <p>Category : {item.category}</p>
                    <p className="price">Price : ₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="canceltime">
                  {" "}
                  {format(new Date(item.date), "eeee, MMMM dd, yyyy")}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CompletedStatus({ completedStatuses }) {
  return (
    <div>
      <ul>
        {completedStatuses.map((item, index) => {
          return (
            <li className="completedlist" key={index}>
              <div className="completedlistheader">
                <img src={completedIcon} alt="icon" />
                <div>
                  <p className="completedaddress">{item.address}</p>
                  <div className="completedcategory">
                    <p>Category : {item.category}</p>
                    <p className="price">Price : ₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="completedtime">
                  {" "}
                  {format(new Date(item.date), "eeee, MMMM dd, yyyy")}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CheckStatus;
