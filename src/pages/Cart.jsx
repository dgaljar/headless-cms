import { useEffect, useState } from "react";
import productImage from "../assets/washing-machine-2.jpg";
import { useNavigate } from "react-router-dom";

const Cart = ({ onRemoveProduct, cart, isAuthenticated }) => {
  const [cartItems, setCartItems] = useState(cart);
  const navigate = useNavigate();

  const goToCheckoutPage = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  console.log(cart);

  const renderProductPrice = (product) => {
    if (product.sale_price) {
      return (
        <>
          <span className="text-muted text-decoration-line-through me-2">
            ${product.regular_price}
          </span>
          <span className="text-danger">${product.sale_price}</span>
        </>
      );
    }
    return <>${product.regular_price || product.price}</>;
  };

  const calculateTotalItemsPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = item.price ? parseFloat(item.price) : 0;
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

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
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product, index) => (
                <tr key={index}>
                  <td className="text-center">
                    <img
                      src={product?.images[0]?.src}
                      alt={product.name}
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{renderProductPrice(product)}</td>
                  <td className="text-center">{product.quantity}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => onRemoveProduct(product)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row align-items-center">
            <div className="col">
              <h3>Total: ${calculateTotalItemsPrice()}</h3>
            </div>
            <div className="col text-end">
              <button className="btn btn-success" onClick={goToCheckoutPage}>
                Checkout
              </button>
            </div>
          </div>
        </div>

        <div id="empty-cart-message">
          {cartItems.length > 0 ? "" : <p>Your cart is empty.</p>}
        </div>
      </div>
    </>
  );
};

export default Cart;
