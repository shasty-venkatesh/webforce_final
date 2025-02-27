import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ScheduleImg from "../../image/schedule.png";
import "../../style/schedule.css";
import Header from "./Header";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import toast, { Toaster } from "react-hot-toast";

function Schedule() {
  const navigate = useNavigate();
  const { globalId, setGlobalId } = useContext(GlobalContext);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("");
  const [wasteCategories, setWasteCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/scraprate"
        );
        setWasteCategories(response.data);
      } catch (error) {
        console.error("Error fetching scrap rates:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resget = await axios.get(
      `http://localhost:3000/api/v1/user/${globalId}`
    );
    const phoneNumber = resget.data.phone;
    const customerName = resget.data.name;
    const orders = Array.isArray(resget.data.order) ? resget.data.order : [];

    const response = await axios.get(
      `http://localhost:3000/api/v1/scraprate/${category}`
    );
    const item = response.data[0];
    console.log(item);

    await axios.put(`http://localhost:3000/api/v1/user/${globalId}`, {
      order: [
        ...orders,
        {
          name: customerName,
          date,
          time,
          address,
          landmark,
          pincode,
          weight,
          category,
          price: Number(weight) * item.rate,
          phone: phoneNumber,
          status: "pending",
        },
      ],
    });

    toast.success("Scheduled your order successfully!");
    setDate("");
    setAddress("");
    setCategory("");
    setLandmark("");
    setPincode("");
    setTime("");
    setWeight("");
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <div className="scheduleform">
        <button className="backbutton" onClick={() => navigate("/home")}>
          ←
        </button>
        <form onSubmit={handleSubmit}>
          <div className="datetime">
            <div>
              <label>Enter Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Select the timing</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              >
                <option value="">Select Time</option>
                <option>11AM to 3PM</option>
                <option>3PM to 8PM</option>
              </select>
            </div>
          </div>
          <br />
          <label>Select an Address</label>
          <div>
            <input
              type="text"
              placeholder="Enter Full Address"
              className="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <div>
              <input
                type="text"
                placeholder="Taluk"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Pincode"
                className="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
          </div>
          <br />
          <div className="weight">
            <div>
              <label>Estimated Weight</label>
              <select
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              >
                <option value="">Select Weight</option>
                <option value="10">10kg</option>
                <option value="20">20kg</option>
                <option value="50">50kg</option>
                <option value="100">100kg</option>
                <option value="700">700kg</option>
                <option value="1000">1000kg</option>
              </select>
            </div>
            <br />
            <div className="category">
              <label>Category of Waste</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {wasteCategories.map((waste, index) => (
                  <option key={index} value={waste.item}>
                    {waste.item} (₹{waste.rate}/kg)
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
          <input type="submit" value="SCHEDULE A PICKUP" />
        </form>
        <img src={ScheduleImg} alt="scheduleimg" className="scheduleimg" />
        <p className="linkCheck">
          To view the scheduled pickups click{" "}
          <Link className="link" to="/checkstatus">
            Check My Pickups
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Schedule;
