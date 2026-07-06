

import { useEffect, useState } from "react";
import { getOrders } from "../services/firebaseServices";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
  const data = await getOrders();
  console.log("Orders:", data);
  setOrders(data);
};

  return (
    <div className="page">
      <h1 style={{ color: "#fff", marginBottom: "30px" }}>
        My Orders
      </h1>

      {orders.length === 0 ? (
        <h2 style={{ color: "#fff" }}>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              maxWidth: "900px",
              margin: "25px auto",
              background: "#fff",
              color: "#000",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 5px 20px rgba(0,0,0,.2)",
            }}
          >
            <h3
  style={{
    marginBottom: "20px",
    color: "#001B5E",
    fontWeight: "bold",
    fontSize: "20px",
    opacity: "1",
    textShadow: "none",
  }}
>
  Order ID : {order.orderId}
</h3>
            <div
              style={{
                textAlign: "left",
                fontSize: "20px",
                lineHeight: "2",
              }}
            >
              <p><b>👤 Customer :</b> {order.name}</p>

              <p><b>📞 Mobile :</b> {order.mobile}</p>

              <p><b>💳 Payment :</b> {order.paymentMethod}</p>

              <p><b>💰 Total :</b> ₹{order.total}</p>

              <p>
                <b>📦 Status :</b>{" "}
                <span style={{ color: "#0d6efd" }}>
                  {order.status}
                </span>
              </p>
            </div>

            <hr style={{ margin: "25px 0" }} />

            <h3
  style={{
    color: "#001B5E",
    fontSize: "30px",
    fontWeight: "700",
    margin: "25px 0 15px",
    opacity: 1,
    textShadow: "none",
  }}
>
  🚚 Order Tracking
</h3>

            <div
              style={{
                textAlign: "left",
                fontSize: "20px",
                lineHeight: "2",
              }}
            >
              <p>🟢 Order Placed</p>

              <p>
                {[
                  "Confirmed",
                  "Packed",
                  "Shipped",
                  "Out For Delivery",
                  "Delivered",
                ].includes(order.status)
                  ? "✅ Order Confirmed"
                  : "⚪ Waiting"}
              </p>

              <p>
                {[
                  "Packed",
                  "Shipped",
                  "Out For Delivery",
                  "Delivered",
                ].includes(order.status)
                  ? "📦 Packed"
                  : "⚪ Waiting"}
              </p>

              <p>
                {[
                  "Shipped",
                  "Out For Delivery",
                  "Delivered",
                ].includes(order.status)
                  ? "🚚 Shipped"
                  : "⚪ Waiting"}
              </p>

              <p>
                {[
                  "Out For Delivery",
                  "Delivered",
                ].includes(order.status)
                  ? "🛵 Out For Delivery"
                  : "⚪ Waiting"}
              </p>

              <p>
                {order.status === "Delivered"
                  ? "🏠 Delivered"
                  : "⚪ Waiting"}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}