import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../../components/SearchBar";


export default function ElectricalPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const products =
    JSON.parse(
      localStorage.getItem("electricalProducts")
    ) || [];

  return (
    <div className="page">

      <button
        className="back-btn"
        onClick={() => navigate("/home")}
      >
        ← Back
      </button>

      <h1>Electrical Products</h1>
      <SearchBar
      search={search} 
      setSearch={setSearch}
      />

      {products.length === 0 ? (
        <>
          <h3>House Wire</h3>
          <h3>Cable</h3>
          <h3>MCB</h3>
          <h3>Switch</h3>
          <h3>Modular Board</h3>
          <h3>LED Bulb</h3>
        </>
      ) : (
        <div className="products-grid">
          {products
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => (
              <div className="product-card" key={index}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="product-img"
                />

                <h2>{item.name}</h2>

                <p>{item.description}</p>

                <h3>{item.brand}</h3>

                <p>Stock : {item.stock}</p>

                <h3>
                  ₹{item.offerPrice}
                  <del
                    style={{
                      marginLeft: "10px",
                      color: "gray",
                    }}
                  >
                    ₹{item.originalPrice}
                  </del>
                </h3>
                <div className="product-buttons">
                  <button
                    className="buy-btn"
                    onClick={() => {
                      const cart =
                        JSON.parse(localStorage.getItem("cart")) || [];

                      cart.push(item);

                      localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                      );

                      navigate("/cart");
                    }}
                  >
                    Buy Now
                  </button>

                  <button
                    className="cart-btn"
                    onClick={() => {
                      const cart =
                        JSON.parse(localStorage.getItem("cart")) || [];

                      cart.push(item);

                      localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                      );

                      alert("Added To Cart");
                    }}
                  >
                    🛒 Add To Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

    </div>
  );
}