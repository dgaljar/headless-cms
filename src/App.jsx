import "bootstrap/dist/css/bootstrap.min.css";
import '../public/style.css'
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
import NavBar from "./layouts/NavBar";
import Home from "./Pages/Home";
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import MyAccount from "./pages/MyAccount"
import MyOrders from "./pages/MyOrders"
import Auth from "./pages/Auth"
import Checkout from "./pages/Checkout"
import SingleProduct from "./pages/SingleProduct";
import './Api.js'

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/my-account' element={<MyAccount />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/login' element={<Auth />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
