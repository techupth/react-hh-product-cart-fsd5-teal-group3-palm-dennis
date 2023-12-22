import { useState } from "react";
import "./App.css";
import lists from "./data/products";
function App() {
  const [products, setProducts] = useState([...lists]);
  const [cart, setCart] = useState([]);
  const [id, setId] = useState([]);

  function handleAddToCart(index) {
    const newToCart = products[index];
    newToCart.quantity ? (newToCart.quantity += 1) : (newToCart.quantity = 1);
    cart.includes(newToCart)
      ? setCart([...cart])
      : setCart([...cart, newToCart]);
    // if (id.includes(products[index].id)) {
    //   setId([...id]);

    // } else {
    //   setId([...id, products[index].id]);

    //   newToCart.quantity ? (newToCart.quantity += 1) : (newToCart.quantity = 1);
    //   setCart([...cart, newToCart]);
    // }
  }

  function handleRemoveFromCart(index) {
    const inCart = [...cart];
    inCart[index].quantity = 0;
    setCart(inCart.filter((_, i) => i !== index));
  }

  function addQuantity(index) {
    const inCart = [...cart];
    inCart[index].quantity += 1;
    setCart([...inCart]);
  }
  function subtractQuantity(index) {
    const inCart = [...cart];

    if (inCart[index].quantity === 1) {
      handleRemoveFromCart(index);
    } else {
      inCart[index].quantity -= 1;
      setCart([...inCart]);
    }
  }
  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {products.map(
            ({ id, name, price, image, description, quantity }, index) => {
              return (
                <div key={index} className="product">
                  <img src={image} alt="sample name" />
                  <h2>{name}</h2>
                  <p>{description}</p>
                  <button onClick={() => handleAddToCart(index)}>
                    Add to cart
                  </button>
                </div>
              );
            }
          )}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">
          {`Cart (Total Price is
          ${cart.reduce((acc, cur) => (acc += cur.price * cur.quantity), 0)}
          Baht)`}
        </h1>
        <div className="cart-item-list">
          {cart.map(({ id, name, price, quantity }, index) => {
            return (
              <div key={index} className="cart-item">
                <h1>Item name: {name}</h1>
                <h2>Price: {price} Baht</h2>
                <h2>Quantity: {quantity}</h2>
                <button
                  className="delete-button"
                  onClick={() => handleRemoveFromCart(index)}
                >
                  x
                </button>
                <div className="quantity-actions">
                  <button
                    className="add-quantity"
                    onClick={() => addQuantity(index)}
                  >
                    +
                  </button>
                  <button
                    className="subtract-quantity"
                    onClick={() => subtractQuantity(index)}
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
