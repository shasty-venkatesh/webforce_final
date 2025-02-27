import React, { useState, useEffect, useContext } from "react";
import WorkerHeader from "./WorkerHeader";
import "../../style/sellproduct.css";
import { GlobalContext } from "../home/GlobalContext";
import toast, { Toaster } from "react-hot-toast";
import recycleImg from "../../image/recyclecart.png";
import axios from "axios";

function Sellingproduct() {
  const [scrapData, setScrapData] = useState([]);
  const { globalId } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchAndUseScrapData() {
      try {
        const resworker = await axios.get(
          `http://localhost:3000/api/v1/worker/${globalId}`
        );

        const name = resworker.data.name;
        const email = resworker.data.email;
        const phone = resworker.data.phone;
        let filteredOrders = resworker.data.order.filter(
          (item) => item.status === "completed"
        );

        const groupedScrapData = filteredOrders.reduce((acc, item) => {
          const existingItem = acc.find((i) => i.category === item.category);

          if (existingItem) {
            existingItem.weight =
              Number(existingItem.weight) + Number(item.weight);
            existingItem.price =
              Number(existingItem.price) + Number(item.price);
          } else {
            acc.push({
              name: name,
              email: email,
              phone: phone,
              category: item.category,
              weight: item.weight,
              price: item.price,
              sellingStatus: item.sellingStatus,
              companydata: item.companydata,
            });
          }
          return acc;
        }, []);
        setScrapData(groupedScrapData);
      } catch (error) {
        console.error("Error fetching scrap data:", error);
      }
    }

    if (globalId) {
      fetchAndUseScrapData();
    }
  }, [globalId]);

  const handleSell = async (category) => {
    console.log("hello");

    const updatedData = scrapData.map((item) =>
      item.category === category ? { ...item, sellingStatus: "pending" } : item
    );

    const resCategory = await axios.get(
      `http://localhost:3000/api/v1/worker/${globalId}`
    );
    const order = resCategory.data.order;
    // console.log(order);
    const categoryOrder = order.map((item) =>
      item.category === category ? { ...item, sellingStatus: "pending" } : item
    );
    try {
      const res1 = await axios.put(
        `http://localhost:3000/api/v1/worker/${globalId}`,
        {
          order: categoryOrder,
        }
      );
      console.log(res1.data);
      // console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }

    setScrapData(updatedData);

    try {
      await axios.put(`http://localhost:3000/api/v1/worker/${globalId}`, {
        grouporder: updatedData,
      });
      toast.success("Ready to Sell");
    } catch (error) {
      toast.error("Sorry!!!");
    }
  };

  function handlecompany(data) {
    console.log(data);
    const companydata = data.companydata[0];
    toast((t) => (
      <span
        style={{
          border: "2px solid green",
          padding: "10px",
          borderRadius: "5px",
          display: "inline-block",
        }}
      >
        <h1 style={{ textAlign: "center" }}>{companydata.name}</h1>
        <p>Email : {companydata.email}</p>
        <p>Phone Number : {companydata.phone}</p>
        <p>Address : {companydata.address}</p>
        <p>Pincode : {companydata.pincode}</p>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => toast.dismiss(t.id)} className="dismissbutton">
            Dismiss
          </button>
        </div>
      </span>
    ));
  }

  return (
    <div>
      <Toaster />
      <WorkerHeader />
      <div className="sellproduct">
        {scrapData.map((item, k) => (
          <div key={k} className="product">
            <p className="owner">{item.category}</p>
            <div className="feature">
              <p>{item.weight}kg</p>
              <p>₹{item.price}</p>
            </div>

            {item.sellingStatus === undefined ? (
              <button
                className="sellingbutton"
                onClick={() => handleSell(item.category)}
                disabled={item.sellingStatus === "pending"}
              >
                sell
              </button>
            ) : item.sellingStatus === "pending" ? (
              <p className="sellingbutton statusconfirm pending">pending</p>
            ) : (
              <p
                className=" sellingbutton statusconfirm"
                onClick={() => {
                  handlecompany(item);
                }}
              >
                order confirm
              </p>
            )}
          </div>
        ))}
        <img src={recycleImg} alt="recycle" className="recycleimg" />
      </div>
    </div>
  );
}

export default Sellingproduct;
