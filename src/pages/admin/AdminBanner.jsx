import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminBanner() {
  const navigate = useNavigate();

  const [banner, setBanner] = useState("");

  useEffect(() => {
    const savedBanner = localStorage.getItem("heroBanner");

    if (savedBanner) {
      setBanner(savedBanner);
    }
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setBanner(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const saveBanner = () => {
    if (!banner) {
      alert("Please Select Banner");
      return;
    }

    localStorage.setItem("heroBanner", banner);

    alert("Banner Saved Successfully");
  };

  const removeBanner = () => {
    localStorage.removeItem("heroBanner");
    setBanner("");

    alert("Banner Removed");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07173A",
        color: "white",
        padding: "40px",
      }}
    >
      <button
        onClick={() => navigate("/admin")}
        style={{
          padding: "12px 25px",
          background: "#ffc107",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        ← Dashboard
      </button>

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#FFD700",
        }}
      >
        🖼 Banner Management
      </h1>

      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          background: "#10245a",
          padding: "30px",
          borderRadius: "15px",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        <br />
        <br />

        {banner && (
          <img
            src={banner}
            alt="Banner Preview"
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
              borderRadius: "10px",
              border: "3px solid gold",
            }}
          />
        )}

        <br />
        <br />

        <button
          onClick={saveBanner}
          style={{
            width: "100%",
            padding: "15px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Save Banner
        </button>

        <br />
        <br />

        <button
          onClick={removeBanner}
          style={{
            width: "100%",
            padding: "15px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Remove Banner
        </button>
      </div>
    </div>
  );
}