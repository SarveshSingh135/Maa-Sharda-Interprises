import { useNavigate } from "react-router-dom";

export default function AdminLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  return (
    <div className="admin-page">
      <h1>🚪 Logout</h1>
      <button onClick={handleLogout}>Logout Now</button>
    </div>
  );
}