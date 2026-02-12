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
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <div style={styles.container}>
      {products.length === 0 && (
        <p>No products available. Add from admin.</p>
      )}

      {products.map((p) => (
        <div key={p.id} style={styles.card}>
          <img src={p.image} alt={p.name} style={styles.image} />
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button style={styles.button} onClick={() => addToCart(p)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    width: "200px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  button: {
    background: "black",
    color: "white",
    border: "none",
    padding: "8px",
    cursor: "pointer",
  },
};

export default Home;
