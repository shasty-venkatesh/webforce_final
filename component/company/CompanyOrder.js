import React, { useContext, useEffect, useState, useCallback } from "react";
import "../../style/companyorder.css";
import axios from "axios";
import CompanyHeader from "./CompanyHeader";
import { GlobalContext } from "../home/GlobalContext";
import debounce from "lodash/debounce";
import toast, { Toaster } from "react-hot-toast";

const CompanyOrder = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { globalId } = useContext(GlobalContext);

  const fetchGroupOrder = useCallback(
    debounce(async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/worker");
        let grouporder = res.data.flatMap((item) => item.grouporder || []);

        setUsers((prevUsers) =>
          JSON.stringify(prevUsers) !== JSON.stringify(grouporder)
            ? grouporder
            : prevUsers
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchGroupOrder();
    return () => fetchGroupOrder.cancel();
  }, [fetchGroupOrder]);

  const handleOrder = useCallback(
    async (order) => {
      setLoading(true);
      try {
        const resorder = await axios.get(
          `http://localhost:3000/api/v1/company/${globalId}`
        );
        const remainingOrder =
          resorder.data.order === undefined ? [] : resorder.data.order;
        const confirmOrder = { ...order, sellingStatus: "confirm" };

        await fetchGroupOrder();

        await axios.put(`http://localhost:3000/api/v1/company/${globalId}`, {
          order: [...remainingOrder, confirmOrder],
        });

        const resworker = await axios.get(
          "http://localhost:3000/api/v1/worker"
        );
        let worker = resworker.data.find((item) => item.phone === order.phone);

        if (!worker) {
          console.error("Worker not found");
          return;
        }

        const groupOrder = worker.grouporder || [];
        const categoryOrder = groupOrder.filter(
          (item) => item.category === order.category
        );

        if (categoryOrder.length === 0) {
          console.error("Category not found in worker's group order");
          return;
        }

        const categoryOrderPlaced = {
          ...categoryOrder[0],
          sellingStatus: "confirm",
        };
        const remainingGroupOrder = groupOrder.filter(
          (item) => item.category !== order.category
        );
        const groupOrderDetail = [categoryOrderPlaced, ...remainingGroupOrder];

        const sanitizedPhone = categoryOrderPlaced.phone
          .trim()
          .replace(/\s+/g, "")
          .replace(/:/g, "");

        const resworkercompany = await axios.put(
          `http://localhost:3000/api/v1/user/worker/company/${sanitizedPhone}`,
          {
            grouporder: groupOrderDetail,
          }
        );

        const id = worker._id;
        const response = await axios.get(
          `http://localhost:3000/api/v1/worker/${id}`
        );

        const companydata = {
          name: resorder.data.name,
          email: resorder.data.email,
          phone: resorder.data.phone,
          address: resorder.data.address,
          landmark: resorder.data.landmark,
          pincode: resorder.data.pincode,
        };

        const groupcompany = response.data.grouporder.map((item) =>
          item.sellingStatus === "confirm"
            ? { ...item, companydata: companydata }
            : item
        );
        console.log(groupcompany);
        await axios.put(`http://localhost:3000/api/v1/worker/${id}`, {
          grouporder: groupcompany,
        });
        const confirmorderworkerconfirm = response.data.order.map((item) =>
          item.category === order.category
            ? { ...item, companydata: companydata, sellingStatus: "confirm" }
            : item
        );
        await axios.put(`http://localhost:3000/api/v1/worker/${id}`, {
          order: confirmorderworkerconfirm,
        });
        toast.success("Order Successfull");
      } catch (error) {
        toast.error("Order Failed");
      } finally {
        setLoading(false);
      }
    },
    [globalId, fetchGroupOrder]
  );

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <CompanyHeader />
      <div className="companyorder">
        <div className="table-container">
          <h2 className="table-title">Company Status</h2>

          {/* Table */}
          <div className="table-wrapper">
            <table className="scrap-table">
              <thead>
                <tr>
                  <th>Owner Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Category</th>
                  <th>Weight</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((entry, index) => (
                    <tr key={entry.id || index}>
                      <td>
                        <p>{entry.name}</p>
                      </td>
                      <td>
                        <p>{entry.email}</p>
                      </td>
                      <td>
                        <p>{entry.phone}</p>
                      </td>
                      <td>
                        <p>{entry.category}</p>
                      </td>
                      <td>
                        <p>{entry.weight}kg</p>
                      </td>
                      <td>
                        <p>₹{entry.price}</p>
                      </td>
                      <td>
                        {entry.sellingStatus === "pending" ? (
                          <button
                            onClick={() => handleOrder(entry)}
                            disabled={loading}
                          >
                            {loading ? "Processing..." : "Buy"}
                          </button>
                        ) : (
                          <p>Order Placed</p>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No matching data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOrder;
