import { useState } from "react";
import { registerStoreUser, loginUser, getLoggedInUserData } from "../Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { myStoreHook } from "./StoreContext";

const Auth = () => {
  const { setPageLoading, setUserLoggedInStatus, setLoggedInUserdata, toast } =
    myStoreHook();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    login_username: "",
    login_password: "",
  });

  const [signUpData, setSignUpData] = useState({
    signup_name: "",
    signup_email: "",
    signup_username: "",
    signup_password: "",
  });

  const handleOnChangeLoginFormData = (e) => {
    const { name, value } = e.target;

    setLoginData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //Handle Login Form Submit
  const handleLoginFormData = async (e) => {
    e.preventDefault();
    setPageLoading(true);

    try {
      const response = await loginUser({
        username: loginData.login_username,
        password: loginData.login_password,
      });

      setLoginData({
        login_username: "",
        login_password: "",
      });

      localStorage.setItem("auth_token", response.token);

      const userData = await getLoggedInUserData(response.token);

      const loggedInUserData = {
        id: userData.id,
        name: userData.name,
        email: response.user_email,
        username: response.user_nicename,
      };

      localStorage.setItem("user_data", JSON.stringify(loggedInUserData));

      setUserLoggedInStatus(true);
      setLoggedInUserdata(loggedInUserData);

      toast.success("User logged in successfully");
      navigate("/products");
    } catch (error) {
      toast.error("Invalid login details");
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleOnChangeSignupFormData = (e) => {
    const { name, value } = e.target;

    setSignUpData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle Sign Up Form Submit
  const handleSignupFormData = async (e) => {
    e.preventDefault();
    setPageLoading(true);

    try {
      await registerStoreUser({
        name: signUpData.signup_name,
        username: signUpData.signup_username,
        email: signUpData.signup_email,
        password: signUpData.signup_password,
      });

      setSignUpData({
        signup_name: "",
        signup_email: "",
        signup_username: "",
        signup_password: "",
      });
    } catch (error) {
      console.log(error);
    }

    setPageLoading(false);
    toast.success("User registerd successfully!");
  };

  return (
    <>
      <div className="container">
        <div className="toast-container"></div>
        <h1 className="my-4 text-center">Login / Signup</h1>
        <div className="row">
          {/* LOGIN FORM */}
          <div className="col-md-6">
            <h2>Login</h2>
            <form onSubmit={handleLoginFormData}>
              <div className="mb-3">
                <label htmlFor="loginUsername" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  name="login_username"
                  value={loginData.login_username}
                  onChange={handleOnChangeLoginFormData}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="login_password"
                  value={loginData.login_password}
                  onChange={handleOnChangeLoginFormData}
                />
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Login
              </button>
            </form>
          </div>

          {/* SIGNUPT FORM */}
          <div className="col-md-6">
            <h2>Signup</h2>
            <form onSubmit={handleSignupFormData}>
              <div className="mb-3">
                <label htmlFor="signupName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  name="signup_name"
                  value={signUpData.signup_name}
                  onChange={handleOnChangeSignupFormData}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="signupEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="signup_email"
                  value={signUpData.signup_email}
                  onChange={handleOnChangeSignupFormData}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="signupUsername" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  name="signup_username"
                  value={signUpData.signup_username}
                  onChange={handleOnChangeSignupFormData}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="signupPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="signup_password"
                  value={signUpData.signup_password}
                  onChange={handleOnChangeSignupFormData}
                />
              </div>

              <button type="submit" className="btn btn-success mt-3">
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
