import { Box, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { BsCheck2, BsEye, BsEyeSlash } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/UserContext";

const ChangePass = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [comNewPassword, setComNewPassword] = useState("");
  const { changePassword, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // password show and hide
  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      oldPassword &&
      newPassword.length >= 8 &&
      newPassword === comNewPassword
    ) {
      changePassword(oldPassword, newPassword, comNewPassword)
        .then((response) => {
          alert("Password Change successful");
          logOut();
        })
        .catch((error) => {
          console.error("Error deleting user:", error.response.data);
          // Handle the error
          if (error.response.data.detail) {
            setError(error.response.data.detail);
          }
        });
    } else {
      alert("Please check input filed ");
      return;
    }

    // Handle form submission logic here...

    setError(""); // Clear any previous errors
  };
  return (
    <div>
      <div className="common-container">
        <div className="d-flex align-items-center">
          <div className="form-area">
            {/* Heading */}
            <div className="d-flex justify-content-center text-color-00B2FF mb-4 fs-27">
              Create New Password
            </div>
            {/* Description */}
            <div className="d-flex justify-content-center w-100 text-center">
              <p className="fs-16">
                Your new password must be different from <br /> previously used
                password
              </p>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit} action="">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "100%" },
                }}
                noValidate
                autoComplete="off"
              >
                <div className="for-input-eye pt-3">
                  <TextField
                    type={"password"} // Show
                    id="oldPassword"
                    className=" w-100 "
                    name="oldPassword"
                    label="Enter your old password"
                    variant="outlined"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    error={!!error}
                    helperText={error}
                  />
                </div>
                <div className="for-input-eye pt-3">
                  <TextField
                    className=" w-100 "
                    type={"password"} // Show
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div
                    className="input-eye-custom"
                    onClick={handlePasswordVisibility}
                  >
                    {/* Conditionally render the eye icon based on showPassword state */}
                    {newPassword.length >= 8 ? (
                      <BsCheck2 className="text-color-00C300 "></BsCheck2>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="for-input-eye pt-3 ">
                  <TextField
                    type={showPassword ? "text" : "password"} // Show
                    className=" w-100 "
                    id="comNewPassword"
                    name="comNewPassword"
                    label="Confirm Password"
                    variant="outlined"
                    value={comNewPassword}
                    onChange={(e) => setComNewPassword(e.target.value)}
                  ></TextField>
                  <div
                    className="input-eye-custom"
                    onClick={handlePasswordVisibility}
                  >
                    {/* Conditionally render the eye icon based on showPassword state */}
                    {showPassword ? <BsEyeSlash /> : <BsEye />}{" "}
                    {newPassword === comNewPassword && comNewPassword ? (
                      <BsCheck2 className="text-color-00C300"></BsCheck2>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Box>
              <div className="form-group pt-3">
                <Button
                  type="submit"
                  className={
                    oldPassword &&
                    newPassword.length >= 8 &&
                    newPassword === comNewPassword
                      ? "Submit_button w-100"
                      : "Submit_button-hold"
                  }
                  variant="contained"
                  color="primary"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
