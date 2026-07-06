import { useNavigate } from "react-router-dom";

export default function SuccessPage() {

  const navigate = useNavigate();

  const order =
    JSON.parse(localStorage.getItem("lastOrder"));

    const orderId = 
    "MSE" +Math.floor(Math.random() * 1000000);

  return (

    <div
      className="page"
      style={{
        textAlign:"center",
        padding:"60px"
      }}
    >

      <h1
        style={{
          color:"limegreen",
          fontSize:"70px"
        }}
      >
        ✔
      </h1>

      <h1>
        Order Placed Successfully
      </h1>

      <h3>
        Thank You {order?.name}
         Order ID : {orderId}
      </h3>

      <p>
        Mobile : {order?.phone}
      </p>

      <p>
        Address :
        <br/>
        {order?.address}
      </p>

      <button
        className="buy-btn"
        onClick={() => navigate("/home")}
      >
        Continue Shopping
      </button>

    </div>

  );

}