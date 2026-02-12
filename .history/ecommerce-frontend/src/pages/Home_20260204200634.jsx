import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const products = [
  { id: 1, name: "Men T-Shirt", price: 799, image: "https://via.placeholder.com/200" },
  { id: 2, name: "Women Dress", price: 1499, image: "https://via.placeholder.com/200" },
  { id: 3, name: "Shoes", price: 1999, image: "https://via.placeholder.com/200" }
];

function Home() {
  const { addToCart } = useContext(CartContext);

  return (
    <div style={styles.container}>
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
    flexWrap: "wrap"
  },
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    width: "200px",
    textAlign: "center"
  },
  img: {
    width: "100%"
  },
  btn: {
    backgroundColor: "black",
    color: "white",
    border: "none",
    padding: "8px",
    cursor: "pointer"
  }
};

export default Home;
