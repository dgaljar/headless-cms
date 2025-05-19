import { useState } from "react";
import { createAnOrder } from "../Api"
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const Checkout = ({clearCartItems, loggedInUserData}) => {
  const navigate = useNavigate()

  const userData = loggedInUserData || {};

  const [checkoutData, setCheckoutData] = useState({
    customer_id: userData.id || "",
    payment_method: "cod",
    payment_method_title: "Cash on Delivery",
    set_paid: false,
    billing: {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      email: userData.email || "",
      phone: "",
    },
  });

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;

    setCheckoutData((prevFormData) => ({
      ...prevFormData,
      billing: {
        ...prevFormData.billing,
        [name]: value,
      },
    }));
  };

  const handleCheckoutSubmit = (e) => {
    try {

      e.preventDefault();

      createAnOrder(checkoutData).then(() => {
        
        toast.success("Order has been placed")
      })

      clearCartItems()

      navigate('/products')
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4">Checkout</h1>
        <form onSubmit={handleCheckoutSubmit}>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="first_name" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                onChange={handleOnChangeInput}
                value={checkoutData.billing.first_name}
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="last_name" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                onChange={handleOnChangeInput}
                value={checkoutData.billing.last_name}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="address_1" className="form-label">
                Address:
              </label>
              <input
                type="text"
                className="form-control"
                name="address_1"
                onChange={handleOnChangeInput}
                value={checkoutData.billing.address_1}
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="city" className="form-label">
                City:
              </label>
              <input
                type="text"
                className="form-control"
                name="city"
                onChange={handleOnChangeInput}
                value={checkoutData.billing.city}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="state" className="form-label">
                State:
              </label>
              <input
                type="text"
                className="form-control"
                name="state"
                onChange={handleOnChangeInput}
                value={checkoutData.billing.state}
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="postcode" className="form-label">
                Postcode:
              </label>
              <input
                type="text"
                className="form-control"
                name="postcode"
                onChange={handleOnChangeInput}
                value={checkoutData.billing.postcode}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="country" className="form-label">
                Country:
              </label>
              <input
                type="text"
                className="form-control"
                name="country"
                onChange={handleOnChangeInput}
                value={checkoutData.billing.country}
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleOnChangeInput}
                value={checkoutData.billing.email}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="phone" className="form-label">
                Phone:
              </label>
              <input
                type="text"
                className="form-control"
                name="phone"
                onChange={handleOnChangeInput}
                value={checkoutData.billing.phone}
              />
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
