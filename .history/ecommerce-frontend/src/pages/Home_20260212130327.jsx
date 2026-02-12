import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Home() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div style={styles.container}>
      {products.length === 0 && (
        <p>No products available. Add from admin.</p>
      )}

      {products.map((p) => {
        const discount = 25;
        const originalPrice = Math.round(p.price / (1 - discount / 100));

        return (
          <div key={p.id} style={styles.card}>
            <div style={styles.imageWrapper}>
              <img src={p.image} alt={p.name} style={styles.image} />
              <div style={styles.discountBadge}>{discount}% OFF</div>
            </div>

            <button
              style={styles.addBtn}
              onClick={() => addToCart(p)}
            >
              ADD
            </button>

            <div style={styles.priceRow}>
              <span style={styles.offerPrice}>₹{p.price}</span>
              <span style={styles.originalPrice}>₹{originalPrice}</span>
            </div>

            <p style={styles.name}>{p.name}</p>

            <div style={styles.tags}>
              <span style={styles.tag}>Top Quality</span>
              <span style={styles.tag}>Trending</span>
            </div>

            <div style={styles.rating}>⭐ 4.8 (10k)</div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "20px",
    padding: "30px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },

  card: {
    background: "white",
    padding: "12px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    position: "relative",
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "contain",
  },

  discountBadge: {
    position: "absolute",
    top: "8px",
    left: "8px",
    background: "red",
    color: "white",
    padding: "4px 6px",
    fontSize: "12px",
    borderRadius: "4px",
  },

  addBtn: {
    position: "absolute",
    right: "12px",
    top: "150px",
    background: "white",
    border: "2px solid #ff4081",
    color: "#ff4081",
    padding: "4px 10px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  priceRow: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  offerPrice: {
    color: "green",
    fontWeight: "bold",
    fontSize: "18px",
  },

  originalPrice: {
    textDecoration: "line-through",
    color: "#999",
    fontSize: "14px",
  },

  name: {
    marginTop: "8px",
    fontWeight: "500",
  },

  tags: {
    marginTop: "6px",
    display: "flex",
    gap: "6px",
  },

  tag: {
    background: "#e0f7fa",
    padding: "4px 6px",
    fontSize: "11px",
    borderRadius: "6px",
  },

  rating: {
    marginTop: "6px",
    fontSize: "13px",
    color: "green",
  },
};

export default Home;
