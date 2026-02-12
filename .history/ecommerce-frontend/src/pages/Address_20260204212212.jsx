
import { useState } from "react";

function Address() {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Address saved successfully!");
  };

  return (
    <div style={styles.container}>
      <h2>Delivery Address</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input name="street" placeholder="Street Address" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} required />

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
