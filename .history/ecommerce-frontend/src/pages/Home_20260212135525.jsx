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
            <img src={p.image} alt={p.name} style={styles.image} />

            {discount > 0 && (
              <div style={styles.discount}>
                {discount}% OFF
              </div>
            )}

            <h3>{p.name}</h3>
            <p>₹{p.price}</p>

            {discount > 0 && (
              <p style={styles.original}>
                ₹{originalPrice}
              </p>
            )}

            {p.rating > 0 && (
              <p>
                ⭐ {p.rating} ({p.reviews || 0})
              </p>
            )}

            <button
              style={styles.button}
              onClick={() => addToCart(p)}
            >
              Add To Cart
            </button>
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
    gap: "20px",
    padding: "30px",
  },
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  discount: {
    background: "red",
    color: "white",
    padding: "5px",
    borderRadius: "5px",
    marginTop: "5px",
  },
  original: {
    textDecoration: "line-through",
    color: "gray",
  },
  button: {
    marginTop: "10px",
    padding: "8px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;
