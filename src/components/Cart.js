import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const handleCheckoutClick = () => {
    navigate("/Checkout");
  };
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="row">
      <div className="col-sm-8">
        <h5 className="align-left d-flex p-3">Pickup and Delivery Options</h5>
        <div className="align-left d-flex">
          <button className="btn btn-primary m-2" style={{ width: "100px" }}>
            Ship
          </button>
          <button className="btn btn-primary m-2" style={{ width: "100px" }}>
            Pickup
          </button>
          <button className="btn btn-primary  m-2" style={{ width: "100px" }}>
            Same day
          </button>
        </div>
        <h6 className="align-left d-flex p-3">Bag</h6>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="cart-item d-flex">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
                style={styles.productImage}
              />
              <div className="cart-item-details p-3">
                <h5>{item.title}</h5>
                <p>{item.description}</p>
                <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                <select
                  id={`quantity-${item.id}`}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
                <div className="cart-item-options  p-1">
                  <label htmlFor={`color-${item.id}`}>Color :</label>
                  <select id={`color-${item.id}`}>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    {/* Add more colors as needed */}
                  </select>
                </div>

                <div className="cart-item-actions">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 m-2 btn btn-primary"
                  >
                    Remove
                  </button>
                  <button
                    className="p-2 m-2 btn btn-secondary"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Save for Later
                  </button>
                </div>

                <p className="cart-item-price">
                  <b>Price: ${(item.price * item.quantity).toFixed(2)}</b>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      {cart.length === 0 ? (
        <p></p>
      ) : (
        <div className="col-sm-4">
          <h6 className="mt-3">Order Summery</h6>
          <p>Sub Total : {subtotal}</p>
          <p>Shipping : Free</p>
          <p>Estimated Tax: ---</p>
          <p>
            <strong>Estimated Total: {subtotal}</strong>
          </p>
          <p>
            <button
              className="btn btn-primary"
              onClick={() => handleCheckoutClick()}
            >
              Checkout
            </button>
          </p>
          <p>
            <button className="btn btn-secondary">Add a Coupon code</button>
          </p>
        </div>
      )}
    </div>
  );
};
const styles = {
  productImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    width: "25%",
  },
  productCard: {
    width: "220px",
    margin: "0 auto",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: "30px",
  },
};

export default Cart;
