import { useState } from "react";

export default function AdminFurniture() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [products, setProducts] = useState(
  JSON.parse(
    localStorage.getItem("furnitureProducts")
  ) || []
);
  const [originalPrice, setOriginalPrice] =
    useState("");
  const [offerPrice, setOfferPrice] =
    useState("");
  const [images, setImages] = useState([]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();

            reader.onloadend = () => {
              resolve(reader.result);
            };

            reader.readAsDataURL(file);
          })
      )
    ).then((allImages) => {
      setImages(allImages);
    });
  };

  const handleSave = () => {
    if (
      !name ||
      !description ||
      !originalPrice ||
      !offerPrice
    ) {
      alert("Please fill all fields");
      return;
    }

    const product = {
      name,
      description,
      brand,
      stock,
      originalPrice,
      offerPrice,
      images,
    };

    const oldProducts =
      JSON.parse(
        localStorage.getItem(
          "furnitureProducts"
        )
      ) || [];

    oldProducts.push(product);
    setProducts(oldProducts);

    localStorage.setItem(
      "furnitureProducts",
      JSON.stringify(oldProducts)
    );

    alert("Furniture Added Successfully");

    setName("");
    setDescription("");
    setBrand("");
    setStock("");
    setOriginalPrice("");
    setOfferPrice("");
    setImages([]);
  };

  return (
    <div className="admin-page">
      <h1>Furniture Management</h1>

      <input
        type="file"
        multiple
        onChange={handleImage}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Furniture Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Brand Name"
        value={brand}
        onChange={(e) =>
          setBrand(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) =>
          setStock(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Original Price"
        value={originalPrice}
        onChange={(e) =>
          setOriginalPrice(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Offer Price"
        value={offerPrice}
        onChange={(e) =>
          setOfferPrice(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={handleSave}>
        Save Furniture
      </button>

      {images.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="preview"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          ))}
        </div>
      )}
      <hr style={{ margin: "30px 0" }} />

<h2>Saved Products</h2>

{products.length === 0 ? (
  <p>No Products Added</p>
) : (
  products.map((item, index) => (
    <div
      key={index}
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginTop: "15px",
        borderRadius: "10px",
        background: "#fff",
        color: "#000",
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        width="120"
        height="120"
        style={{ objectFit: "cover" }}
      />

      <h3>{item.name}</h3>

      <p>{item.description}</p>

      <p>Stock: {item.stock}</p>

      <p>Price: ₹{item.price}</p>

      <p>Offer Price: ₹{item.originalPrice}</p>

      <button
        onClick={() => {
          const updatedProducts = products.filter(
            (_, i) => i !== index
          );

          setProducts(updatedProducts);

          localStorage.setItem(
            "FurnitureProducts",
            JSON.stringify(updatedProducts)
          );
        }}
        style={{
          background: "red",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  ))
)}
    </div>
  );
}