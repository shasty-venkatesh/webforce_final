import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "../../style/companyform.css";
import Header from "../home/Header";
import companyformbg from "../../image/companyformbg.png";

function CompanyAddForm() {
  const navigate = useNavigate();
  const [gstValid, setGstValid] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    gstNumber: "",
    address: "",
    landmark: "",
    pincode: "",
    email: "",
    phone: "",
  });

  // Handle GST Input and Verification
  const handleGstChange = async (e) => {
    const gst = e.target.value.trim();
    setFormData((prev) => ({ ...prev, gstNumber: gst }));

    // Verify GST only if the length is exactly 15 characters
    if (gst.length === 15) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Debounce API calls

        const response = await axios.post(
          "http://localhost:3000/api/verify-gst",
          { gstin: gst }
        );

        console.log("GST Verification Response:", response.data);

        // Ensure correct API response format
        if (response.data && response.data.flag) {
          setGstValid(true); // Valid GST
        } else {
          setGstValid(false); // Invalid GST
        }
      } catch (error) {
        console.error(
          "Error verifying GST:",
          error?.response?.data || error.message
        );
        setGstValid(false); // Treat errors as invalid GST
      }
    } else {
      setGstValid(null); // Reset validity if not 15 characters
    }
  };

  // Handle Other Input Changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle Form Submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (loading) return; // Prevent multiple submissions

      setLoading(true);
      try {
        const generateRandomPassword = () =>
          Math.floor(1000 + Math.random() * 9000).toString();

        const newCompany = {
          ...formData,
          status: "pending",
          password: generateRandomPassword(),
        };

        // Fetch admin data
        const res = await axios.get("http://localhost:3000/api/v1/admin");
        const admin = res.data[0];

        if (!admin) {
          toast.error("Admin data not found!");
          return;
        }

        // Check if email already exists
        const companyExists = admin.company.some(
          (item) => item.email === newCompany.email
        );
        if (companyExists) {
          toast.error("A company with this email already exists!");
          return;
        }

        // Update company data
        const updatedCompany = [...admin.company, newCompany];

        await axios.put(`http://localhost:3000/api/v1/admin/${admin._id}`, {
          company: updatedCompany,
        });

        toast.success("Your application has been submitted successfully!");
      } catch (error) {
        toast.error("An error occurred while submitting your application.");
        console.error("Submission error:", error);
      } finally {
        setLoading(false);
      }
    },
    [formData, loading]
  );

  return (
    <div>
      <Toaster />
      <Header />
      <div className="companyform">
        <button className="backbutton" onClick={() => navigate("/")}>
          ←
        </button>
      </div>
      <div className="companyform">
        <form onSubmit={handleSubmit}>
          <div className="namegst">
            <div>
              <label>Enter Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Enter GST Number</label>
              <input
                type="text"
                name="gstNumber"
                placeholder="GST Number"
                value={formData.gstNumber}
                onChange={handleGstChange}
              />
              {gstValid === true && <span className="valid">✅ Valid GST</span>}
              {gstValid === false && (
                <span className="invalid">❌ Invalid GST</span>
              )}
            </div>
          </div>

          <label>Enter Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="landmark"
            placeholder="Taluk"
            value={formData.landmark}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            className="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />

          <div className="namegst">
            <div>
              <label>Enter Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Enter Phone Number</label>
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <input type="submit" value="SUBMIT DETAILS" disabled={loading} />
        </form>
        <div>
          <img src={companyformbg} alt="companyimg" className="companyimg" />
        </div>
      </div>
    </div>
  );
}

export default CompanyAddForm;
