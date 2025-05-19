import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Create Context
const MyStoreContext = createContext();

export const MyStoreProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUserData, setLoggedInUserdata] = useState({});

  const setPageLoading = (status) => {
    setLoader(status);
  };

  //return product regular price / sale price value
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

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      setUserLoggedInStatus(true);
    }

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);

    const userDataStr = localStorage.getItem("user_data");
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        setLoggedInUserdata(userData);
      } catch (e) {
        console.error("Failed to parse user_data from localStorage", e);
        setLoggedInUserdata({});
      }
    }
  }, []);

  // Adding produtcs
  const addProductsToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productsExists = cart.find((item) => item.id === product.id);

    if (productsExists) {
      productsExists.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    setCart([...cart]);
    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Product added to Cart!");
  };

  //Remove item
  const removeItemsFromCart = (product) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const updateCart = cart.filter((item) => item.id !== product.id);

      setCart(updateCart);
      localStorage.setItem("cart", JSON.stringify(updateCart));

      toast.success("Product removed from cart");
    }
  };

  //Set User Auth after Login
  const setUserLoggedInStatus = (status) => {
    setIsAuthenticated(status);
  };

  //User Logout
  const setUserLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("orderItems");
    setUserLoggedInStatus(false);
  };

  //Remove Cart Items
  const clearCartItems = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <MyStoreContext.Provider
      value={{
        setPageLoading,
        loader,
        renderProductPrice,
        setUserLogout,
        isAuthenticated,
        cart,
        addProductsToCart,
        removeItemsFromCart,
        setUserLoggedInStatus,
        setLoggedInUserdata,
        clearCartItems,
        loggedInUserData,
        toast
      }}
    >
      {children}
    </MyStoreContext.Provider>
  );
};

// Custom Hook
export const myStoreHook = () => useContext(MyStoreContext);
