import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="dashboard">

      <h1 className="dashboard-title">
        Maa Sharda Admin Panel
      </h1>

      <p className="dashboard-subtitle">
        Welcome Admin 👋
      </p>

      <div className="dashboard-grid">

        <Link to="/admin/electronics" className="dashboard-card">
          <span>📺</span>
          <h3>Electronics</h3>
          <p>Add / Edit Products</p>
        </Link>

        <Link to="/admin/furniture" className="dashboard-card">
          <span>🪑</span>
          <h3>Furniture</h3>
          <p>Manage Furniture</p>
        </Link>

        <Link to="/admin/appliances" className="dashboard-card">
          <span>❄️</span>
          <h3>Appliances</h3>
          <p>Manage Appliances</p>
        </Link>

        <Link to="/admin/electrical" className="dashboard-card">
          <span>💡</span>
          <h3>Electrical</h3>
          <p>Manage Electrical</p>
        </Link>

        <Link to="/admin/banner" className="dashboard-card">
          <span>🖼️</span>
          <h3>Banner</h3>
          <p>Change Hero Banner</p>
        </Link>

        <Link to="/admin/offers" className="dashboard-card">
          <span>🎁</span>
          <h3>Offers</h3>
          <p>Manage Offers</p>
        </Link>

        <Link to="/admin/orders" className="dashboard-card">
          <span>🛒</span>
          <h3>Order</h3>
          <p>Customer Order</p>
        </Link>

        <Link to="/admin/messages" className="dashboard-card">
          <span>💬</span>
          <h3>Messages</h3>
          <p>Customer Queries</p>
        </Link>

        <Link to="/admin/reviews" className="dashboard-card">
          <span>⭐</span>
          <h3>Reviews</h3>
          <p>Customer Reviews</p>
        </Link>

        <Link to="/admin/profile" className="dashboard-card">
          <span>👤</span>
          <h3>Profile</h3>
          <p>Change Password</p>
        </Link>

        <Link to="/admin/settings" className="dashboard-card">
          <span>⚙️</span>
          <h3>Settings</h3>
          <p>Website Settings</p>
        </Link>

        <Link to="/home" className="dashboard-card logout">
          <span>🚪</span>
          <h3>Exit Admin</h3>
          <p>Back To Website</p>
        </Link>

      </div>

    </div>
  );
}