import { useState } from "react";
import "./App.css";
import products from "./data/products";

function App() {
  const [productList, setProductList] = useState([...products]);
  const [cartList, setCartList] = useState([]);
  const [cartListID, setCartListID] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (index) => {
    if (!cartListID.includes(productList[index].id)) {
      const newProductInCart = productList[index];
      const newCartList = [...cartList];
      newProductInCart.quantity = 1;
      newCartList.push(newProductInCart);
      //validate item in cartlist
      setCartListID([...cartListID, newProductInCart.id]);
      setCartList([...newCartList]);
      setTotal(total + newProductInCart.price);
    } else {
      const targetProduct = products[index].id;
      const newArr = cartList.map((item) => {
        if (item.id === targetProduct) {
          item.quantity += 1;
          setTotal(total + item.price);
          return item;
        } else {
          return item;
        }
      });
      setCartList([...newArr]);
    }
  };

  const deleteItem = (index) => {
    setTotal(total - cartList[index].quantity * cartList[index].price);
    const newArr = [...cartList];
    newArr.splice(index, 1);
    setCartList([...newArr]);
    const newID = [...cartListID];
    newID.splice(index, 1);
    setCartListID([...newID]);
  };

  const addQuantity = (index) => {
    setTotal(total + cartList[index].price);
    const newArr = [...cartList];
    newArr[index].quantity += 1;
    setCartList([...newArr]);
  };
  const subtractQuantity = (index) => {
    const newArr = [...cartList];
    if (newArr[index].quantity > 0) {
      setTotal(total - cartList[index].price);
      newArr[index].quantity -= 1;
      setCartList([...newArr]);
    }
    if (newArr[index].quantity === 0) {
      newArr.splice(index, 1);
      setCartList([...newArr]);
      const newCartListID = [...cartListID];
      newCartListID.splice(index, 1);
      setCartListID(newCartListID);
    }
  };
  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {productList.map((item, index) => {
            return (
              <div className="product" key={index}>
                <img src={item.image} alt="sample name" />
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <button
                  onClick={() => {
                    addToCart(index);
                  }}
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1></h1>
        <h1 className="cart-heading">Cart (Total Price is {total} Baht)</h1>
        <div className="cart-item-list">
          {cartList.map((item, i) => {
            return (
              <div className="cart-item" key={i}>
                <h1>Item name: {item.name}</h1>
                <h2>Price: {item.price} Baht</h2>
                <h2>Quantity: {item.quantity}</h2>
                <button
                  className="delete-button"
                  onClick={() => {
                    deleteItem(i);
                  }}
                >
                  x
                </button>
                <div className="quantity-actions">
                  <button
                    className="add-quantity"
                    onClick={() => {
                      addQuantity(i);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="subtract-quantity"
                    onClick={() => {
                      subtractQuantity(i);
                    }}
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
