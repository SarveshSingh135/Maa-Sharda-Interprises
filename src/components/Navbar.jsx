import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">

        <h2 className="logo"
        onClick={() => navigate("/admin-login")} 
        style={{cursor: "pointer"}}
        >
          <img
            src="/maa.png"
            alt="Maa Sharda Enterprises"
          />
        </h2>

        <div
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        <div
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >
          <Link to="/home">Home</Link>

          <Link to="/electronics">
            Electronics
          </Link>

          <Link to="/furniture">
            Furniture
          </Link>

          <Link to="/appliances">
            Appliances
          </Link>

          <Link to="/electrical">
            Electrical
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          <Link to="/cart">
            🛒 Cart
          </Link>
          \<div
           className="nav-link"
            onClick={() => navigate("/my-orders")}
          >
            📦 My Orders
            </div>
        </div>

      </div>
    </nav>
  );
}