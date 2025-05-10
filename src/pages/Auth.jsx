import { useState } from "react";

const Auth = () => {
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

  const handleLoginFormData = (e) => {
    e.preventDefault();
    console.log(loginData);

    setLoginData({
      login_username: "",
      login_password: "",
    });
  };

  const handleOnChangeSignupFormData = (e) => {
    const { name, value } = e.target;

    setSignUpData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignupFormData = (e) => {
    e.preventDefault();
    console.log(signUpData);
    
    setSignUpData({
      signup_name: "",
      signup_email: "",
      signup_username: "",
      signup_password: "",
    });
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
