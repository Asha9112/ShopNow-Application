import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart } = useContext(CartContext);

  // Calculate total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item) => (
        <div key={item.id} style={styles.item}>
          <h4>{item.name}</h4>
          <p>
            ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
          </p>
        </div>
      ))}

      {cart.length > 0 && (
        <h3 style={{ marginTop: "20px" }}>
          Total: ₹{total}
        </h3>
      )}
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
