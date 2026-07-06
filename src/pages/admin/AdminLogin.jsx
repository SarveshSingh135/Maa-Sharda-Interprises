import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const admin =
    JSON.parse(localStorage.getItem("admin")) || {
      shopName: "Maa Sharda Enterprises",
      adminName: "Admin",
      username: "admin",
      email: "admin@gmail.com",
      mobile: "9005622817",
      address: "Prayagraj, Uttar Pradesh",
      password: "123456",
    };

  const handleLogin = () => {
    if (
      (login === admin.username ||
        login === admin.email) &&
      password === admin.password
    ) {
      alert("✅ Login Successful");
      navigate("/admin");
    } else {
      alert("❌ Invalid Username/Email or Password");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-box">

        <button
          className="back-btn"
          onClick={() => navigate("/home")}
        >
          ← Back To Website
        </button>

        <img
          src="/maa.png"
          alt="Logo"
          className="login-logo"
        />

        <h1>Admin Login</h1>

        <input
          type="text"
          placeholder="Username or Email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    </div>
  );
}