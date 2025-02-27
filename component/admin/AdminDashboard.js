import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../home/GlobalContext";
import AdminHeader from "../admin/AdminHeader";
import "../../style/admin.css";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

const AdminDashboard = () => {
  const [workers, setWorkers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { globalId } = useContext(GlobalContext);

  useEffect(() => {
    fetchWorkers();
  }, []);

  async function fetchWorkers() {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/admin");
      setWorkers(res.data[0]?.worker || []);
    } catch (error) {
      console.error("❌ Error fetching workers:", error);
      setWorkers([]);
    }
  }

  async function handleAddToJoin(worker) {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/admin/${globalId}`
      );
      const otherWorkers = res.data.worker.filter(
        (item) => item.email !== worker.email
      );
      const updatedWorker = { ...worker, status: "added" };

      await axios.put(`http://localhost:3000/api/v1/admin/${globalId}`, {
        worker: [...otherWorkers, updatedWorker],
      });
      setWorkers([...otherWorkers, updatedWorker]);

      const addWorker = { ...worker, order: [], grouporder: [] };
      await axios.post("http://localhost:3000/api/v1/worker", addWorker);
      const template = {
        password: addWorker.password,
      };

      emailjs.send(
        "service_d64fm4e",
        "template_8483ypt",
        template,
        "cYRySSbZulMsdghGj"
      );
      
      toast.success("Worker Appointed");
    } catch (error) {
      toast.error("failed to appoint worker");
    }
  }

  async function handleRemoveWorker(worker) {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/admin/${globalId}`
      );
      const updatedWorkers = res.data.worker.filter(
        (item) => item.email !== worker.email
      );

      await axios.put(`http://localhost:3000/api/v1/admin/${globalId}`, {
        worker: updatedWorkers,
      });
      setWorkers(updatedWorkers);

      await axios.delete(`http://localhost:3000/api/v1/worker/${worker._id}`);
      toast.success("Worker Removed ");
    } catch (error) {
      toast.error("failed to remove worker");
    }
  }

  const filteredWorkers = workers.filter((worker) => {
    if (filter !== "all" && worker.status !== filter) return false;
    if (search && !worker.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <AdminHeader />
      <div className="table-container">
        <div className="filter-container">
          <h1>Worker status</h1>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label>Filter by Status: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="added">Added</option>
          </select>
        </div>
        <div className="table-wrapper">
          <table className="scrap-table">
            <thead>
              <tr>
                <th>Worker Name</th>
                <th>Aadhar Number</th>
                <th>Address</th>
                <th>Landmark</th>
                <th>Pincode</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.length > 0 ? (
                filteredWorkers.map((entry, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td>{entry.name}</td>
                    <td>{entry.aadhaar}</td>
                    <td>{entry.address}</td>
                    <td>{entry.landmark}</td>
                    <td>{entry.pincode}</td>
                    <td>{entry.phone}</td>
                    <td>{entry.email}</td>
                    <td>
                      {entry.status === "pending" ? (
                        <>
                          <button
                            onClick={() => handleAddToJoin(entry)}
                            className="btn-update"
                          >
                            Add
                          </button>
                          <button
                            onClick={() => handleRemoveWorker(entry)}
                            className="btn-delete"
                          >
                            Remove
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleRemoveWorker(entry)}
                          className="btn-delete"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      padding: "20px",
                    }}
                  >
                    No workers available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
