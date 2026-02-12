import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Home() {
  const { cart, addToCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const getCartItem = (id) => {
    return cart.find(item => item.id === id);
  };

  return (
    <div style={styles.container}>
      {products.map((p) => {
        const cartItem = getCartItem(p.id);

        return (
          <div key={p.id} style={styles.card}>
            <img src={p.image} alt={p.name} style={styles.image} />

            <h3>{p.name}</h3>
            <p>₹{p.price}</p>

            {!cartItem ? (
              <button
                style={styles.button}
                onClick={() => addToCart(p)}
              >
                Add To Cart
              </button>
            ) : (
              <div style={styles.qtyBox}>
                <button
                  style={styles.qtyBtn}
                  onClick={() => decreaseQty(p.id)}
                >
                  -
                </button>

                <span style={styles.qtyText}>
                  {cartItem.qty}
                </span>

                <button
                  style={styles.qtyBtn}
                  onClick={() => increaseQty(p.id)}
                >
                  +
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "25px",
    padding: "30px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  button: {
    marginTop: "10px",
    padding: "8px 16px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  qtyBox: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },

  qtyBtn: {
    width: "30px",
    height: "30px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },

  qtyText: {
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default Home;
