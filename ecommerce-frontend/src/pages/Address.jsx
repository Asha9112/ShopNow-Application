import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Address() {
  // ✅ ALL HOOKS AT TOP
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  // ✅ CONDITIONAL LOGIC AFTER HOOKS
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Address:", address);
    navigate("/payment");
  };

  return (
    <div style={styles.container}>
      <h2>Delivery Address</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Full Name"
          value={address.name}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleChange}
          required
        />

        <input
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleChange}
          required
        />

        <input
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          required
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          required
        />

        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default Address;
