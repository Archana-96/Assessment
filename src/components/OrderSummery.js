import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
const OrderSummery = () => {
  const { cart } = useContext(CartContext);
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  return (
    <div className="row" style={styles.row}>
      <div style={styles.container} className="col-sm-8">
        <h5>Order Confirmation</h5>
        <b>Order Number: 125642876</b>
        <p>Items Purchased:</p>
        <ul style={styles.itemList}>
          {cart.map((item, index) => (
            <li key={index} style={styles.item}>
              {item.title} (- {item.quantity}) - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <b>Total Amount: ${calculateTotal()}</b>
        <p style={styles.thankYou}>Thank you for your order!</p>
      </div>
    </div>
  );
};

const styles = {
  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
  },
  container: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    margin: "20px 0",
    maxWidth: "100%",
    alignItems: "center",
  },
  itemList: {
    listStyleType: "none",
    padding: 0,
  },
  item: {
    margin: "10px 0",
  },
  thankYou: {
    fontWeight: "bold",
    marginTop: "20px",
  },
};
export default OrderSummery;
