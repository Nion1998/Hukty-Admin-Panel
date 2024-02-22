import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "./SignIn.css";
import { AuthContext } from "../../Contexts/UserContext";

const SignIn = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  // password show and hide
  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if ((email, password)) {
      console.log();
      login(email, password)
        .then((rsp) => {
          // setShowAlert(true); // Show the alert

          console.log("login data", rsp.data.data.token);
          localStorage.setItem("user", JSON.stringify(rsp.data.data));
          localStorage.setItem("_authToken", rsp.data.data.token);

          if (from === "/") {
            navigate("/admin");
          } else {
            navigate(from, { replace: true });
          }
        })
        .catch((er) => {
          console.log(er.response.data);
          const form = event.target;
          if (er.response.data.errors.email) {
            form.email.value = "";
          }
          if (er.response.data.errors.password) {
            form.password.value = "";
          }
          setError(er.response.data.errors);
        });
    } else {
      console.log("please submit the all input ");
      return;
    }
  };

  return (
    <div className="common-container">
      <div className="d-flex align-items-center">
        <div className="form-area">
          <div className="d-flex justify-content-center">
            {/* <img src={loginpageimg} alt="loginpageimg" className="img-fluid" /> */}
          </div>
          <div className="d-flex justify-content-center text-color-00B2FF mb-4 fs-27">
            Sign in
          </div>
          <form onSubmit={handleSubmit} action="" className="simple-input">
            <div className={`form-group  ${error.email ? "error" : ""}`}>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  error.email ? error.email[0] : "Your email address"
                }
              />
            </div>
            <div
              className={`form-group position-relative ${
                error.password ? "error" : ""
              }`}
            >
              <div className="input-eye" onClick={handlePasswordVisibility}>
                {/* Conditionally render the eye icon based on showPassword state */}
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </div>
              <input
                type={showPassword ? "text" : "password"} // Show/hide the password based on showPassword state
                name="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                placeholder={error.password ? error.password[0] : "Password"}
              />
            </div>
            <div className="d-flex align-items-center justify-content-end mb-2">
              <Link
                className="ms-auto text-color-00B2FF"
                to={"/forgot-password"}
              >
                Forgot Password
              </Link>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className={
                  email && password
                    ? "Submit_button w-100"
                    : "Submit_button-hold"
                }
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
