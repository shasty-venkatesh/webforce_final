import Workercard from "./Workercard";
import WorkerHeader from "./WorkerHeader";
import "../../style/worker.css";
import WorkerImg from "../../image/worker.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../home/GlobalContext";

function WorkerHome() {
  const [scrapData, setScrapData] = useState([]);
  const [scrapDatafordb, setScrapDatafordb] = useState([]);
  const { globalId, setGlobalId } = useContext(GlobalContext);

  useEffect(() => {
    async function handleScrapData() {
      const res = await axios.get("http://localhost:3000/api/v1/user");
      const data = res.data;
      let orders = [];

      data.forEach((element) => {
        element.order.forEach((order) => {
          orders.push({ ...order, phone: element.phone });
        });
      });
      // console.log(orders);
      const resworker = await axios.get(
        `http://localhost:3000/api/v1/worker/${globalId}`
      );
      const Workeraddress = resworker.data.landmark;
      let filteredOrders = orders.filter(
        (order) =>
          order.landmark.trim().toLowerCase() ===
          Workeraddress.trim().toLowerCase()
      );
      // console.log(filteredOrders);//
      const landmarkorder = filteredOrders;
      filteredOrders = filteredOrders.filter(
        (item) => item.status === "pending"
      );
      // console.log(filteredOrders);
      setScrapData(filteredOrders);
      setScrapDatafordb(landmarkorder);
      // console.log(scrapDatafordb);//
      const resworkercompleted = await axios.get(
        `http://localhost:3000/api/v1/worker/${globalId}`
      );
      const order = resworkercompleted.data.order;
      console.log(order);
      const otherorder = order.filter((item) => item.status !== "completed");
      const completeOrder = order.filter((item) => item.status === "completed");
      // console.log(otherorder)
      const setSellingStatus = completeOrder.map((item) => {
        return { ...item };
      });
      const orderdetail = [...otherorder, ...setSellingStatus];
      const resworkercompletedupdate = await axios.put(
        `http://localhost:3000/api/v1/worker/${globalId}`,
        { order: orderdetail }
      );
      // console.log(resworkercompletedupdate);
    }
    handleScrapData();
  }, []);

  async function handleStatus(id, status) {
    const updatedScrapData = scrapDatafordb.map((item, i) =>
      item._id === id ? { ...item, status: status } : item
    );
    console.log(updatedScrapData);
    setScrapData(updatedScrapData);
    setScrapDatafordb(updatedScrapData);

    try {
      await axios.put(`http://localhost:3000/api/v1/worker/${globalId}`, {
        order: updatedScrapData,
      });

      const completedOrder = updatedScrapData.find((item) => item._id === id);
      console.log(completedOrder);

      const resUsers = await axios.get("http://localhost:3000/api/v1/user");
      const users = resUsers.data;

      const user = users.find((u) => u.phone === completedOrder.phone);
      if (!user) {
        console.error("User not found for phone:", completedOrder.phone);
        return;
      }

      const updatedOrders = user.order.map((order) =>
        order.date === completedOrder.date &&
        order.time === completedOrder.time &&
        order.price === completedOrder.price
          ? { ...order, status: status }
          : order
      );

      await axios.put(
        `http://localhost:3000/api/v1/user/worker/:${user.phone}`,
        {
          order: updatedOrders,
        }
      );

      const filteredOrders = updatedScrapData.filter(
        (item) => item.status === "pending"
      );
      setScrapData(filteredOrders);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  }

  return (
    <div>
      <WorkerHeader />
      <div className="workersection">
        <img src={WorkerImg} alt="worker" className="workerimg" />
        <div className="workercardlist">
          {scrapData.length === 0 ? (
            <p className="noorder">Better luck next time</p>
          ) : (
            scrapData.map((item, index) => (
              <Workercard
                key={index}
                name={item.name}
                address={item.address}
                cost={item.price}
                phoneNumber={item.phone}
                slot={item.time}
                time={item.date}
                weight={item.weight}
                category={item.category}
                index={index}
                completed={() => handleStatus(item._id, "completed")}
                canceled={() => handleStatus(item._id, "canceled")}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkerHome;
