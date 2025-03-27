import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    paypalEmail: "",
    bankAccountNumber: "",
  });

  const numberofItems = cart.length;
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setPaymentDetails({
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      paypalEmail: "",
      bankAccountNumber: "",
    });
  };
  const handlePlaceOrder = () => {
    alert("Your order has been placed successfully.");
    navigate(`/OrderSummery`);
  };
  return (
    <div className="row">
      <div className="cart-container col-sm-8">
        <div className="box">
          <div className="box-title">Shopping Details</div>
          <form>
            <h6>User Details</h6>
            <div className="row">
              <div className="col-sm-4 p-2">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={userDetails.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-sm-4 p-2">
                <label htmlFor="email">Email:</label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-sm-4 p-2">
                <label htmlFor="address">Address:</label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  value={userDetails.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </form>
        </div>

        <div className="box">
          <div className="box-title p-2">Payment Details</div>
          <form>
            <div className="row">
              <div class="form-check col-sm-4">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  value="creditCard"
                  checked={paymentMethod === "creditCard"}
                  onChange={handlePaymentMethodChange}
                />
                <label class="form-check-label" for="radio1">
                  Credit Card
                </label>
              </div>
              <div class="form-check  col-sm-4">
                <input
                  class="form-check-input"
                  type="radio"
                  value="bankTransfer"
                  checked={paymentMethod === "bankTransfer"}
                  onChange={handlePaymentMethodChange}
                />
                <label class="form-check-label" for="radio1">
                  Net Banking
                </label>
              </div>
              <div class="form-check  col-sm-4">
                <label class="form-check-label" for="radio1"></label>
              </div>
            </div>
            {paymentMethod === "creditCard" && (
              <div className="row p-2">
                <div className="col-sm-4">
                  <label htmlFor="cardNumber">Card Number:</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-4">
                  <label htmlFor="cardExpiry">Expiry Date:</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    value={paymentDetails.cardExpiry}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-4">
                  <label htmlFor="cardCvc">CVV:</label>
                  <input
                    type="text"
                    id="cardCvc"
                    name="cardCvc"
                    value={paymentDetails.cardCvc}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div>
                <label htmlFor="paypalEmail" className="mb-3">
                  PayPal Email:
                </label>
                <input
                  type="email"
                  id="paypalEmail"
                  name="paypalEmail"
                  value={paymentDetails.paypalEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {paymentMethod === "bankTransfer" && (
              <div>
                <label htmlFor="bankAccountNumber">Bank Account Number:</label>
                <input
                  type="text"
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  value={paymentDetails.bankAccountNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
          </form>
        </div>

        <div className="box">
          <div className="box-title">
            Cart Items
            <p>
              {" "}
              <h6>{numberofItems} Items</h6>
            </p>
          </div>
          <div className="box-content">
            <div style={styles.itemsRow}>
              {cart.map((item, index) => (
                <div key={index} style={styles.item}>
                  <img src={item.image} alt={item.name} style={styles.image} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <h6 className="mt-3">Order Summery</h6>
        <p>Sub Total : {subtotal}</p>
        <p>Shipping : Free</p>
        <p>Estimated Tax: ---</p>
        <p>
          <strong>Estimated Total: {subtotal.toFixed(2)}</strong>
        </p>
        <p>
          <button className="btn btn-primary" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </p>
      </div>
    </div>
  );
};
const styles = {
  cartContainer: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    margin: "20px 0",
  },
  itemsRow: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
  },
  item: {
    margin: "0 10px",
  },
  image: {
    width: "50px",
    height: "auto",
  },
};
export default Checkout;
