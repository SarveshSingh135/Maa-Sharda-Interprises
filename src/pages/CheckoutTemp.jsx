import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveOrder } from "../services/firebaseServices";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const[paymentMethod, setPaymentMethod] = useState("COD"); // Default to Cash on Delivery

  const placeOrder = async () => {
    if (
      !name ||
      !phone ||
      !address ||
      !city ||
      !pincode
    ) {
      alert("Fill all details");
      return;
    }

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const total = cart.reduce(
      (sum, item) =>
        sum + Number(item.offerPrice || item.price || 0),
      0
    );

    const order = {
      orderId: "MSE" + Date.now(),
      name,
      phone,
      address,
      city,
      pincode,
      products: cart,
      total,
      
      paymentMethod,
      paymentStatus:
      paymentMethod==="COD"
      ?"Pending"
      :"Paid",

      status:"Pending",status: "Pending",

tracking: {
  confirmed: true,
  packed: false,
  shipped: false,
  outForDelivery: false,
  delivered: false,
},

createdAt: new Date(),       
    };

    if (paymentMethod === "UPI") {
  navigate("/upi-payment", {
    state: { order },
  });
  return;
}

if (paymentMethod === "ONLINE") {
  navigate("/payment", {
    state: { order },
  });
  return;
}
    try {
      // Save Order in Firebase
      await saveOrder(order);
      

      // Save for Success Page
      localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
      );

      // Clear Cart
      localStorage.removeItem("cart");

      alert("Order Placed Successfully");

      navigate("/success");
    } catch (error) {
      console.error(error);
      alert("Order Failed");
    }
  };

  return(
    <div className="page">
      <h1>Checkout</h1>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />

      <br />
      <br />

      <h3>Select Payment Method</h3>


    <div className="payment-box">

      <label className="payment-option">

        <input
          type="radio"
          value="COD"
          checked={paymentMethod === "COD"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />

        <div>
          <h4>💵 Cash On Delivery</h4>
          <p>Pay after delivery</p>
        </div>

      </label>

      <label className="payment-option">

        <input
          type="radio"
          value="UPI"
          checked={paymentMethod === "UPI"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />

        <div>
          <h4>📱 UPI Payment</h4>
          <p>Google Pay • PhonePe • Paytm</p>
        </div>

      </label>

      <label className="payment-option">

        <input
          type="radio"
          value="ONLINE"
          checked={paymentMethod === "ONLINE"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />

        <div>
          <h4>💳 Online Payment</h4>
          <p>Card • Net Banking • Wallet</p>
        </div>

      </label>

    </div>
     <button
  className="buy-btn"
  onClick={placeOrder}
>
  {paymentMethod === "COD" ? "Place COD Order" : "Proceed To Payment"}
</button>
    </div>
  );
} 