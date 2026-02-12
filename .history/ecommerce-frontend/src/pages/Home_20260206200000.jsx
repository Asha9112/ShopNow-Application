import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Home() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  // 🔥 Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Products from backend:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div style={styles.container}>
      {products.length === 0 && <p>No products available</p>}

      {products.map((p) => (
        <div key={p.id} style={styles.card}>
          <img src={p.image} alt={p.name} style={styles.img} />
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button style={styles.btn} onClick={() => addToCart(p)}>
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
    gap: "20px",
    padding: "20px",
    flexWrap: "wrap",
  },
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    width: "200px",
    textAlign: "center",
  },
  img: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  btn: {
    backgroundColor: "black",
    color: "white",
    border: "none",
    padding: "8px",
    cursor: "pointer",
  },
};

export default Home;
