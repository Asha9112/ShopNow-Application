import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeItem } =
    useContext(CartContext);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    if (!user) {
      // Not logged in → go to login page
      navigate("/login");
    } else {
      // Logged in → continue checkout
      navigate("/address");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item) => (
        <div key={item.id} style={styles.item}>
          <h4>{item.name}</h4>

          <div style={styles.controls}>
            <button onClick={() => decreaseQty(item.id)}>-</button>
            <span style={{ margin: "0 10px" }}>{item.qty}</span>
            <button onClick={() => increaseQty(item.id)}>+</button>
          </div>

          <p>₹{item.price * item.qty}</p>

          <button
            style={styles.remove}
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h3>Total: ₹{total}</h3>

          <button
            style={styles.checkout}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  item: {
    borderBottom: "1px solid #ccc",
    padding: "10px 0",
    marginBottom: "10px",
  },
  controls: {
    display: "flex",
    alignItems: "center",
  },
  remove: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    marginTop: "5px",
  },
  checkout: {
    background: "black",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    marginTop: "15px",
  },
};

export default Cart;
