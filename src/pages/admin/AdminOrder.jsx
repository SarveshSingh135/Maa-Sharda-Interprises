import { useEffect, useState } from "react";

import {
  getOrders,
  deleteOrder,
  updateOrderStatus,
} from "../../services/firebaseServices";

export default function AdminOrder() {

  const [orders, setOrders] = useState([]);

  const loadOrder = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <div className="admin-page">

      <h1>🛒 Customer Order</h1>

      {orders.length === 0 ? (

        <h2>No Orders Found</h2>

      ) : (

        orders.map((order) => (

          <div
            key={order.id}
            style={{
              background: "#fff",
              color: "#000",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >

            <h2>{order.name}</h2>

            <p>📞 {order.phone}</p>

            <p>{order.address}</p>

            <p>{order.city}</p>

            <p>{order.pincode}</p>

            <h3>Total : ₹{order.total}</h3>

            <h3>Status : {order.status}</h3>

            <h3>Products</h3>

            {order.products?.map((item, index) => (

              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "20px",
                  marginBottom: "10px",
                  alignItems: "center",
                }}
              >

                <img
                  src={item.image}
                  alt={item.name}
                  width="80"
                  height="80"
                  style={{ objectFit: "cover" }}
                />

                <div>
                  <h4>{item.name}</h4>
                  <p>₹{item.offerPrice}</p>
                </div>

              </div>

            ))}

            <br />

            <button
              onClick={async () => {
                await updateOrderStatus(order.id, "Confirmed");
                loadOrder();
              }}
            >
              Confirm
            </button>

            <button
              style={{ marginLeft: "10px" }}
              onClick={async () => {
                await updateOrderStatus(order.id, "Delivered");
                loadOrder();
              }}
            >
              Delivered
            </button>

            <button
              style={{
                marginLeft: "10px",
                background: "red",
                color: "#fff",
              }}
              onClick={async () => {
                await deleteOrder(order.id);
                loadOrder();
              }}
            >
              Delete
            </button>

            <button
  style={{ marginLeft: "10px" }}
  onClick={async () => {
    await updateOrderStatus(order.id, "Packed");
    loadOrder();
  }}
>
  Packed
</button>

<button
  style={{ marginLeft: "10px" }}
  onClick={async () => {
    await updateOrderStatus(order.id, "Shipped");
    loadOrder();
  }}
>
  Shipped
</button>

<button
  style={{ marginLeft: "10px" }}
  onClick={async () => {
    await updateOrderStatus(order.id, "Out For Delivery");
    loadOrder();
  }}
>
  Out For Delivery
</button>

          </div>

        ))

      )}

    </div>
  );
}