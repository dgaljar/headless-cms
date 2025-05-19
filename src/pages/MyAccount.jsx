import { useEffect, useState } from "react";

const MyAccount = ({loggedInUserData}) => {


  return (
    <>
      <div className="container">
        <h1 className="my-4">My Account</h1>
        <div id="user-info">
          <form>
            <div className="mb-3 row">
              <label htmlFor="formName" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="formName"
                  className="form-control"
                  value={loggedInUserData.name || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="formEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  id="formEmail"
                  className="form-control"
                  value={loggedInUserData.email || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="formUsername" className="col-sm-2 col-form-label">
                Username
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="formUsername"
                  className="form-control"
                  value={loggedInUserData.username || ""}
                  readOnly
                />
              </div>
            </div>
          </form>
        </div>
        <div id="loading-message" style={{display: "none"}}>
          <p>Loading user information...</p>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
