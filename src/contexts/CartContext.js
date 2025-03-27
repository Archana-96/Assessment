import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [count, setcount] = useState(0);
  const [paths, setPath] = useState([{ name: "Home", link: "/" }]);

  //Set the Cart value to localstorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //Add the items to Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...existingProduct, quantity: existingProduct.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    console.log(cart);
    console.log(count);
    setcount(cartCount);
  };

  //Remove from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  //Breadcrumb array passing
  const handlemenueselect = (name, link) => {
    console.log(name, link);
    let pathsarray = [...paths];
    console.log(pathsarray);
    const newPath = [
      {
        name: "Home",
        link: "/",
      },
      {
        name: name,
        link: link,
      },
    ];

    setPath(newPath);
  };

  // Quantity update in Cart
  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        handlemenueselect,
        paths,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
