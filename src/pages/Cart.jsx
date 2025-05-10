import { useEffect, useState } from "react";
import productImage from "../assets/washing-machine-2.jpg";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([
      {
        image: "/src/assets/washing-machine-2.jpg",
        title: "Product 1",
        price: 40,
        quantity: 2,
      },
      {
        image: "/src/assets/washing-machine-2.jpg",
        title: "Product 2",
        price: 30,
        quantity: 1,
      },
      {
        image: "/src/assets/washing-machine-2.jpg",
        title: "Product 3",
        price: 50,
        quantity: 3,
      },
    ]);
  }, []);

  const navigate = useNavigate()

  const goToCheckoutPage = () => {
    navigate('/checkout')
  }
  return (
    <>
      <div className="container">
        <h1 className="my-4">Cart</h1>

        <div id="cart-items">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={product.image}
                      alt="Product Name"
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button className="btn btn-danger">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row align-items-center">
            <div className="col">
              <h3>Total: $50.00</h3>
            </div>
            <div className="col text-end">
              <button className="btn btn-success" onClick={goToCheckoutPage}>Checkout</button>
            </div>
          </div>
        </div>

        <div id="empty-cart-message">
          <p>Your cart is empty.</p>
        </div>
      </div>
    </>
  );
};

export default Cart;
