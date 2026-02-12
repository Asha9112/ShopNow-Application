import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const placeOrder = () => {
    alert("Payment successful!");
    navigate("/success");
  };

  return (
    <div style={styles.container}>
      <h2>Payment</h2>

      <div style={styles.option}>
        <input type="radio" checked readOnly />
        <label> Cash on Delivery</label>
      </div>

      <button style={styles.payBtn} onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "auto",
  },
  option: {
    marginBottom: "20px",
  },
  payBtn: {
    background: "black",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
  },
};

export default Payment;
