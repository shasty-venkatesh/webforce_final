import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./component/home/User";
import Schedule from "./component/home/Schedule";
import CheckStatus from "./component/home/CheckStatus";
import Login from "./component/home/Login";
import Register from "./component/home/Register";
import WorkerHome from "./component/worker/WorkerHome";
import WorkerList from "./component/worker/WorkerStatus";
import AppointmentForm from "./component/worker/AppointmentForm";
import Sellingproduct from "./component/worker/Sellingproduct";
import CompanyAddFrom from "../src/component/company/CompanyAddFrom";
import { GlobalProvider } from "../src/component/home/GlobalContext";
import CompanyOrder from "./component/company/CompanyOrder";
import ScrapRate from "./component/home/ScrapRate";
import AdminDashboard from "./component/admin/AdminDashboard";
import YouTubeVideoSearch from "./component/home/YouTubeVideoSearch";
import AdminCompany from "./component/admin/AdminCompany";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<User />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/checkstatus" element={<CheckStatus />} />
          <Route path="/worker" element={<WorkerHome />} />
          <Route path="/workerstatus" element={<WorkerList />} />
          <Route path="/workeradd" element={<AppointmentForm />} />
          <Route path="/sellingproduct" element={<Sellingproduct />} />
          <Route path="/companyform" element={<CompanyAddFrom />} />
          <Route path="/companyorder" element={<CompanyOrder />} />
          <Route path="/scraprate" element={<ScrapRate />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/you" element={<YouTubeVideoSearch />} />
          <Route path="/companyadmin" element={<AdminCompany />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
