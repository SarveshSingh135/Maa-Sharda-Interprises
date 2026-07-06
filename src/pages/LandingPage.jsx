import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="/maa.png"
        alt="logo"
        width="350"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/home")}
      />

      <h1
        fontSize="48px"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
        marginBottom="20px"
        className="brand-title"
        title="Maa Sharda Enterprises"
        textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
      >
        Maa Sharda Enterprises
        </h1>

      <p>Style, Comfort & Trust — Sab Kuch Ek Hi Jagah</p>

      <button className="enter-button"
        onClick={() => navigate("/home")}
        style={{
          padding: "14px 32px",
            background: "#FFD700",
            color: "#000",
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
          borderRadius: "30px",
          cursor: "pointer",

        }}
      >
        ✨ Explore Our Store
      </button>
    </div>
  );
}

export default LandingPage;