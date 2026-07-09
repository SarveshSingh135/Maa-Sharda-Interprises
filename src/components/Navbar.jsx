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
          <Link to="/home" onClick={() => setMenuOpen(false)}>
                 Home
          </Link>

          <Link to="/electronics" onClick={() => setMenuOpen(false)}>
                 Electronics
          </Link>

          <Link to="/furniture" onClick={() => setMenuOpen(false)}>
                 Furniture
          </Link>

          <Link to="/appliances" onClick={() => setMenuOpen(false)}>
                 Appliances
          </Link>

          <Link to="/electrical" onClick={() => setMenuOpen(false)}>
                 Electrical
          </Link>

          <Link to="/contact" onClick={() => setMenuOpen(false)}>
                 Contact
          </Link>

          <Link to="/cart" onClick={() => setMenuOpen(false)}>
                 🛒 Cart
          </Link>
        <div
  className="nav-link"
  onClick={() => {
    navigate("/my-orders");
    setMenuOpen(false);
  }}
>
  📦 My Orders
</div>
        </div>

      </div>
    </nav>
  );
}