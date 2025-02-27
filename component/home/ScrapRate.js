import React, { useState } from "react";
import "../../style/scraprate.css";
import Header from "./Header";
import Footer from "../home/Footer";
import { useNavigate } from "react-router-dom";

const iconMapping = {
  Clothes: "checkroom",
  Newspaper: "description",
  "Office Paper (A3/A4)": "article",
  "Copies/Books": "menu_book",
  Cardboard: "inventory_2",
  "PET Bottles/Other Plastic": "recycling",
  Iron: "construction",
  "Steel Utensils": "kitchen",
  Aluminium: "settings",
  Brass: "emoji_events",
  Copper: "cable",
  "Split AC Copper Coil 1.5 Ton (Indoor + Outdoor)": "ac_unit",
  "Window AC 1.5 Ton (Copper Coil)": "ac_unit",
  "SPLIT/WINDOW AC 1 Ton (Copper Coil)": "ac_unit",
  "Front Load Fully Automatic Washing Machine": "local_laundry_service",
  "Printer/Scanner/Fax Machine": "print",
  "Metal E-waste": "devices",
  "Plastic E-waste": "devices_other",
  "CRT TV": "tv",
  "Ceiling Fan": "",
  "Scrap Laptop": "laptop",
  "CRT Monitor": "computer",
  "LCD Monitor": "monitor",
  "Computer CPU": "memory",
};

const rates = {
  normal_recyclables: [
    { item: "Clothes", rate: "RS 2/kg" },
    { item: "Newspaper", rate: "RS 14/kg" },
    { item: "Office Paper (A3/A4)", rate: "RS 14/kg" },
    { item: "Copies/Books", rate: "RS 12/kg" },
    { item: "Cardboard", rate: "RS 8/kg" },
    { item: "PET Bottles/Other Plastic", rate: "RS 8/kg" },
    { item: "Iron", rate: "RS 26/kg" },
    { item: "Steel Utensils", rate: "RS 40/kg" },
    { item: "Aluminium", rate: "RS 105/kg" },
    { item: "Brass", rate: "RS 305/kg" },
    { item: "Copper", rate: "RS 425/kg" },
  ],
  large_appliances: [
    {
      item: "Split AC Copper Coil 1.5 Ton (Indoor + Outdoor)",
      rate: "RS 4150/piece",
    },
    { item: "Window AC 1.5 Ton (Copper Coil)", rate: "RS 4050/piece" },
    { item: "SPLIT/WINDOW AC 1 Ton (Copper Coil)", rate: "RS 3000/piece" },
    {
      item: "Front Load Fully Automatic Washing Machine",
      rate: "RS 1350/piece",
    },
  ],
  small_appliances: [
    { item: "Printer/Scanner/Fax Machine", rate: "RS 20/kg" },
    { item: "Metal E-waste", rate: "RS 28/kg" },
    { item: "Plastic E-waste", rate: "RS 15/kg" },
    { item: "CRT TV", rate: "RS 200/piece" },
    { item: "Ceiling Fan", rate: "RS 35/kg" },
  ],
  mobiles_computers: [
    { item: "Scrap Laptop", rate: "RS 300/piece" },
    { item: "CRT Monitor", rate: "RS 150/piece" },
    { item: "LCD Monitor", rate: "RS 20/kg" },
    { item: "Computer CPU", rate: "RS 225/piece" },
  ],
};

const ScrapRate = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate=useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <div>
      <Header />
      <div className="container">
      <button className="backbutton" onClick={() => navigate("/")}>
          ←
        </button>
        <h1>Scrap Rates</h1>
        <input
          type="text"
          placeholder="Search for an item..."
          value={searchTerm}
          onChange={handleSearch}
        />

        {Object.keys(rates).map((category) => {
          const filteredItems = rates[category].filter((rate) =>
            rate.item.toLowerCase().includes(searchTerm)
          );

          if (filteredItems.length === 0) return null;

          return (
            <div key={category} className="category-section">
              <h2>{category.replace(/_/g, " ")}</h2>
              <div className="items-container">
                {filteredItems.map((rate, index) => (
                  <div key={index} className="item-card">
                    <span className="material-icons scrap-icon">
                      {iconMapping[rate.item] || "help_outline"}
                    </span>

                    <p className="rate">{rate.rate}</p>
                    <p className="item-name">{rate.item}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default ScrapRate;
