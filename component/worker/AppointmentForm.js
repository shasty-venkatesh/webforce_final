import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Header from "../home/Header";
import WorkerAddImg from "../../image/workerbackground.png";
import "../../style/workeraddform.css";

function AppointmentForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    landmark: "",
    pincode: "",
    phone: "",
    aadhaar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const generateRandomPassword = () => Math.floor(1000 + Math.random() * 9000).toString();
      
      const newWorker = {
        ...formData,
        status: "pending",
        password: generateRandomPassword(),
      };

      // Fetch existing admin data
      const res = await axios.get("http://localhost:3000/api/v1/admin");
      const admin = res.data[0];

      if (!admin) {
        toast.error("Admin data not found!");
        setLoading(false);
        return;
      }

      const workerExists = admin.worker.some((item) => item.email === newWorker.email);
      if (workerExists) {
        toast.error("Worker with this email already exists!");
        setLoading(false);
        return;
      }

      // Update worker list
      const updatedWorkers = [...admin.worker, newWorker];

      await axios.put(`http://localhost:3000/api/v1/admin/${admin._id}`, { worker: updatedWorkers });

      toast.success("Your application has been submitted successfully!");
    } catch (error) {
      toast.error("An error occurred while submitting your application.");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  }, [formData, loading]);

  return (
    <div>
      <Toaster />
      <Header />
      <div className="workeraddfrom">
        <button className="backbutton" onClick={() => navigate("/")}>←</button>
        
        <form onSubmit={handleSubmit}>
          <div className="nameemail">
            <div>
              <label htmlFor="name">Enter Name</label>
              <br />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Enter Email</label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Enter the Address</label>
          <br />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="address"
            required
          />
          <br />
          <input
            type="text"
            name="landmark"
            placeholder="Taluk"
            value={formData.landmark}
            onChange={handleChange}
          />
          <input
            type="number"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="pincode"
            required
          />
          <br />

          <div className="phoneaddhar">
            <div>
              <label>Enter Phone Number</label>
              <br />
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Enter Aadhaar Number</label>
              <br />
              <input
                type="text"
                name="aadhaar"
                placeholder="Aadhaar Number"
                value={formData.aadhaar}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <input type="submit" value={loading ? "Submitting..." : "SUBMIT DETAILS"} disabled={loading} />
        </form>
        
        <div>
          <img src={WorkerAddImg} alt="worker" className="workerimg" />
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
