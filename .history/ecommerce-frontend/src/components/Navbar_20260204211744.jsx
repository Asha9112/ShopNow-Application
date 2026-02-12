import { Link } from "react-router-dom";

const styles = {
  nav: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    margin: 0,
  },
  link: {
    color: "#fff",
    marginLeft: "15px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

function Navbar() {
  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>ShopNow</h2>

      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/signup" style={styles.link}>Signup</Link>
      </div>
    </div>
  );
}

export default Navbar;
