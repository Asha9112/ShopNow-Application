import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Home() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div style={styles.container}>
      {products.map((p) => {
        const discount = p.discount || 0;
        const originalPrice =
          discount > 0
            ? Math.round(p.price / (1 - discount / 100))
            : null;

        return (
          <div key={p.id} style={styles.card}>
            <div style={styles.imageWrapper}>
              <img src={p.image} alt={p.name} style={styles.image} />

              {discount > 0 && (
                <div style={styles.discountBadge}>
                  {discount}% OFF
                </div>
              )}

              <button
                style={styles.addBtn}
                onClick={() => addToCart(p)}
              >
                ADD
              </button>
            </div>

            <div style={styles.details}>
              <div style={styles.priceRow}>
                <span style={styles.offerPrice}>
                  ₹{p.price}
                </span>

                {discount > 0 && (
                  <span style={styles.originalPrice}>
                    ₹{originalPrice}
                  </span>
                )}
              </div>

              <p style={styles.name}>{p.name}</p>

              {p.category && (
                <p style={styles.category}>{p.category}</p>
              )}

              {p.stock && (
                <p style={styles.stock}>
                  {p.stock > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "25px",
    padding: "30px",
    background: "#f4f6f9",
  },

  card: {
    background: "white",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
  },

  discountBadge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "red",
    color: "white",
    padding: "5px 8px",
    fontSize: "12px",
    borderRadius: "6px",
    fontWeight: "bold",
  },

  addBtn: {
    position: "absolute",
    right: "10px",
    bottom: "10px",
    background: "white",
    border: "2px solid #ff4081",
    color: "#ff4081",
    padding: "5px 12px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  details: {
    padding: "15px",
  },

  priceRow: {
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
    color: "#888",
    fontSize: "14px",
  },

  name: {
    marginTop: "8px",
    fontWeight: "500",
  },

  category: {
    marginTop: "6px",
    fontSize: "13px",
    color: "#666",
  },

  stock: {
    marginTop: "6px",
    fontSize: "13px",
    fontWeight: "bold",
    color: "green",
  },
};

export default Home;
