import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PaymentPage() {
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    if (!cardNumber || !cardName || !expiry || !cvv) {
      alert("Please fill all card details");
      return;
    }

    alert("This is only UI. Real payment requires Razorpay or another payment gateway.");

    navigate("/success");
  };

  return (
    <div className="page">
      <h1>Card Payment</h1>

      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Card Holder Name"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="MM/YY"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />

      <br /><br />

      <button className="buy-btn" onClick={handlePayment}>
        Pay ₹ Now
      </button>
    </div>
  );
}