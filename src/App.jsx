import "bootstrap/dist/css/bootstrap.min.css";
import "../public/style.css";
import "./assets/loader.css";
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
import NavBar from "./layouts/NavBar";
import Home from "./Pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import MyAccount from "./pages/MyAccount";
import MyOrders from "./pages/MyOrders";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import SingleProduct from "./pages/SingleProduct";
import Footer from "./layouts/Footer.jsx";
import Loader from "./layouts/Loader.jsx";
import "./Api.js";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { myStoreHook } from "./pages/StoreContext.jsx";

function App() {
  const {
    setPageLoading,
    loader,
    setUserLogout,
    isAuthenticated,
    cart,
    addProductsToCart,
    removeItemsFromCart,
    setUserLoggedInStatus,
    setLoggedInUserdata,
    clearCartItems,
    loggedInUserData
  } = myStoreHook();

  return (
    <>
      <Router>
        <NavBar
          cartItems={cart}
          isAuthenticated={isAuthenticated}
          setUserLogout={setUserLogout}
        />
        <div className="container">
          <ToastContainer />
          {loader && <Loader />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={
                <Products
                  setPageLoading={setPageLoading}
                  onAddToCart={addProductsToCart}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <SingleProduct
                  setPageLoading={setPageLoading}
                  onAddToCart={addProductsToCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  isAuthenticated={isAuthenticated}
                  onRemoveProduct={removeItemsFromCart}
                  cart={cart}
                />
              }
            />
            <Route
              path="/my-account"
              element={<MyAccount loggedInUserData={loggedInUserData} />}
            />
            <Route
              path="/my-orders"
              element={
                <MyOrders
                  loggedInUserData={loggedInUserData}
                  setPageLoading={setPageLoading}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  loggedInUserData={loggedInUserData}
                  clearCartItems={clearCartItems}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Auth
                  setLoggedInUserdata={setLoggedInUserdata}
                  setPageLoading={setPageLoading}
                  isAuthenticated={setUserLoggedInStatus}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
