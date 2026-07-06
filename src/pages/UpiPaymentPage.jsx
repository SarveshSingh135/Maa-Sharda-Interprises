import { useLocation } from "react-router-dom";

export default function UpiPaymentPage() {
  const { state } = useLocation();

  return (
    <div className="page">
      <h1>UPI Payment</h1>

      <img
        src="/qr.png"
        alt="QR Code"
        className="qr-image"
        style={{ width: "250px" }}
      />

      <h3>UPI ID</h3>
      <h2>9005622817@kotakbank</h2>

      <h3>Total ₹{state?.order?.total}</h3>

      <button className="buy-btn">
        I Have Paid
      </button>
    </div>
  );
}