
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty = (updated[index].qty || 1) + 1;
    updateCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];

    if ((updated[index].qty || 1) > 1) {
      updated[index].qty--;
      updateCart(updated);
    }
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    updateCart(updated);
  };

  const subtotal = cart.reduce((sum, item) => {
    const qty = item.qty || 1;
    const price = Number(item.offerPrice || item.price || 0);
    return sum + qty * price;
  }, 0);

  const originalTotal = cart.reduce((sum, item) => {
    const qty = item.qty || 1;
    const price = Number(
      item.originalPrice ||
      item.offerPrice ||
      item.price ||
      0
    );

    return sum + qty * price;
  }, 0);

  const discount = originalTotal - subtotal;

  const deliveryCharge = subtotal >= 1000 ? 0 : 50;

  const finalTotal = subtotal + deliveryCharge;

  return (
    <div className="cart-page">

      <button
        className="back-btn"
        onClick={() => navigate("/home")}
      >
        ← Back
      </button>

      <h1 className="cart-title">🛒 My Cart</h1>

      {cart.length === 0 ? (

        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "#fff",
            padding: "20px",
          }}
        >
          <div style={{ fontSize: "90px" }}>
            🛒
          </div>

          <h2
            style={{
              fontSize: "42px",
              marginTop: "20px",
            }}
          >
            Your Cart is Empty
          </h2>

          <p
            style={{
              color: "#ccc",
              fontSize: "20px",
              marginTop: "10px",
            }}
          >
            Looks like you haven't added anything yet.
          </p>

          <button
            onClick={() => navigate("/home")}
            style={{
              marginTop: "30px",
              padding: "15px 40px",
              background: "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Continue Shopping
          </button>

        </div>

      ) : (

        <>
          {cart.map((item, index) => (
            <div
              className="cart-card"
              key={index}
            >
              <div className="cart-left">

                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-img"
                />

                <div className="qty-box">

                  <button
                    onClick={() =>
                      decreaseQty(index)
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.qty || 1}
                  </span>

                  <button
                    onClick={() =>
                      increaseQty(index)
                    }
                  >
                    +
                  </button>

                </div>

              </div>

              <div className="cart-right">

                <h2>{item.name}</h2>

                <p className="brand">
                  {item.brand}
                </p>

                <div className="price-box">

                  {item.originalPrice && (
                    <span className="old-price">
                      ₹{item.originalPrice}
                    </span>
                  )}

                  <span className="new-price">
                    ₹{item.offerPrice || item.price}
                  </span>

                </div>

                <p className="delivery">
                  🚚 Delivery in 2-3 Days
                </p>

                <div className="cart-buttons">

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(index)
                    }
                  >
                    Remove
                  </button>

                  <button
                    className="save-btn"
                    onClick={() =>
                      alert("Coming Soon")
                    }
                  >
                    Save For Later
                  </button>

                  <button
                    className="buy-now-btn"
                    onClick={() =>
                      navigate("/checkout")
                    }
                  >
                    Buy Now
                  </button>

                </div>

              </div>

            </div>
          ))}

          <div className="cart-footer">

            <div className="price-details">

              <h2>Price Details</h2>

              <hr />

              <div className="price-row">
                <span>Original Price</span>
                <span>₹{originalTotal}</span>
              </div>

              <div className="price-row">
                <span>Discount</span>
                <span style={{ color: "green" }}>
                  - ₹{discount}
                </span>
              </div>

              <div className="price-row">
                <span>Delivery Charge</span>

                {deliveryCharge === 0 ? (
                  <span style={{ color: "green" }}>
                    FREE
                  </span>
                ) : (
                  <span>₹{deliveryCharge}</span>
                )}

              </div>

              <hr />

              <div className="price-row total-row">
                <strong>Total Amount</strong>

                <strong>
                  ₹{finalTotal}
                </strong>
              </div>

              <p
                style={{
                  color: "green",
                  marginTop: "15px",
                  fontWeight: "bold",
                }}
              >
                🎉 You Saved ₹{discount}
              </p>

              <button
                className="place-order-btn"
                onClick={() =>
                  navigate("/checkout")
                }
              >
                Proceed To Checkout
              </button>

            </div>

          </div>
        </>
      )}

    </div>
  );
}