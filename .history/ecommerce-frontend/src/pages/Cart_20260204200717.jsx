
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item, index) => (
        <div key={index} style={styles.item}>
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  item: {
    borderBottom: "1px solid #ccc",
    padding: "10px 0"
  }
};

export default Cart;
