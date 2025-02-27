import React, { useContext, useEffect, useState } from "react";
import "../../style/workerstatus.css";
import WorkerHeader from "../worker/WorkerHeader";
import axios from "axios";
import { GlobalContext } from "../home/GlobalContext";

const WorkerList = () => {
  const [scrapData, setScrapData] = useState([]);
  const { globalId, setGlobalId } = useContext(GlobalContext);

  useEffect(() => {
    async function handleScrapData() {
      const resworker = await axios.get(
        `http://localhost:3000/api/v1/worker/${globalId}`
      );
      let filteredOrders = resworker.data.order;
      console.log(filteredOrders)
      filteredOrders = filteredOrders.filter(
        (item) => item.status === "completed" || item.status === "canceled"
      );
      setScrapData(filteredOrders);
    }
    handleScrapData();
  }, []);

  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [minCost, setMinCost] = useState("");
  const [maxCost, setMaxCost] = useState("");

  const filteredData = scrapData.filter((entry) => {
    return (
      (statusFilter === "all" || entry.status === statusFilter) &&
      (dateFilter === "" || entry.date === dateFilter) &&
      (minCost === "" || entry.cost_of_scrap >= parseFloat(minCost)) &&
      (maxCost === "" || entry.cost_of_scrap <= parseFloat(maxCost))
    );
  });

  return (
    <div>
      <WorkerHeader />
      <div className="table-container">
        <h2 className="table-title">Scrap Data Table</h2>
        <div className="filter-container">
          <label htmlFor="status-filter" className="filterheader">
            Filter by Status:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filterstatus"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="cancel">Cancelled</option>
          </select>
          <label htmlFor="date-filter" className="filterheader">
            Filter by Date:
          </label>
          <input
            type="date"
            id="date-filter"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="filterstatus"
          />
          <label htmlFor="min-cost" className="filterheader">
            Min Cost:
          </label>
          <input
            type="number"
            id="min-cost"
            value={minCost}
            onChange={(e) => setMinCost(e.target.value)}
            className="filterstatus"
          />
          <label htmlFor="max-cost" className="filterheader">
            Max Cost:
          </label>
          <input
            type="number"
            id="max-cost"
            value={maxCost}
            onChange={(e) => setMaxCost(e.target.value)}
            className="filterstatus"
          />
        </div>
        <div className="table-wrapper">
          <table className="scrap-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Cost ($)</th>
                <th>Weight (kg)</th>
                <th>Phone</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{entry.name}</td>
                  <td>{entry.address}</td>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                  <td>₹{entry.price}</td>
                  <td>{entry.weight} KG</td>
                  <td>{entry.phone}</td>
                  <td>{entry.category}</td>
                  <td className={entry.status}>{entry.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkerList;
