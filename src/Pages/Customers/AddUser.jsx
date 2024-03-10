import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/UserContext";

const AddUser = () => {
  const { addUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const countryData = useLoaderData();

  if (!countryData) {
    return;
  }

  console.log("countryData", countryData);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const email = form.email.value;
    const mobile = form.mobile.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;
    const gender = form.gender.value;
    const role = form.role.value;
    const country = form.country.value;

    addUser(
      first_name,
      last_name,
      email,
      mobile,
      password,
      confirm_password,
      gender,
      role,
      country
    )
      .then((rsp) => {
        toast.success("Brand create successful.");
        console.log("Brands update", rsp);
        navigate("/admin/users");
      })
      .catch((er) => {
        setError(er.response.data.errors);
        console.log(er.response.data);
        toast.error("Brand create  unsuccessful.");
        // setError(er.response.data.errors);
      });
  };

  return (
    <div className="container-fluid ">
      <div className=" py-3 d-flex justify-content-between align-items-center">
        <div className="">
          <Link to={"/admin"} className="path-text ">
            Dashboard /
          </Link>{" "}
          <Link to={"/admin/users"} className="path-text ">
            Users /
          </Link>{" "}
          <span className="path-text-span">Add New User</span>
          <div className="page-title">Add New User</div>
        </div>
      </div>

      <div className="main-div p-2  p-md-3 p-lg-4  w-100">
        <div className="form-section ">
          <form
            onSubmit={handleFormSubmit}
            action=""
            className="simple-input2  "
          >
            <div className="row gy-4 gx-5">
              <div className="col-12 col-lg-6  ">
                <div
                  className={`form-group  ${error.first_name ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">First Name </div>
                  <input
                    type="text"
                    name="first_name"
                    className="form-control"
                    placeholder={
                      error.first_name ? error.first_name[0] : "first name "
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-lg-6  ">
                <div
                  className={`form-group  ${error.last_name ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">Last Name </div>
                  <input
                    type="text"
                    name="last_name"
                    className="form-control"
                    placeholder={
                      error.last_name ? error.last_name[0] : "last name "
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-lg-6  ">
                <div className={`form-group  ${error.email ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Email </div>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder={error.email ? error.email[0] : "email "}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-6  ">
                <div className={`form-group  ${error.mobile ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Phone Number</div>
                  <input
                    type="number"
                    name="mobile"
                    className="form-control"
                    placeholder={error.mobile ? error.mobile[0] : "mobile "}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-6  ">
                <div className={`form-group  ${error.password ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Password</div>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder={
                      error.password ? error.password[0] : "password"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-lg-6  ">
                <div
                  className={`form-group  ${
                    error.confirm_password ? "error" : ""
                  }`}
                >
                  <div className="fs-12-600 mb-2">Confirm Password</div>
                  <input
                    type="password"
                    name="confirm_password"
                    className="form-control"
                    placeholder={
                      error.confirm_password
                        ? error.confirm_password[0]
                        : "confirm_password"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-lg-6  ">
                <div className={`form-group  ${error.dob ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Date of Birth</div>
                  <input
                    type="date"
                    name="dob"
                    className="form-control"
                    placeholder={error.dob ? error.dob[0] : "dob"}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.gender ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Gender</div>
                  <Form.Select as="select" name="gender">
                    <option value={0}>Male</option>
                    <option value={1}>Female</option>
                    <option value={2}>Other</option>
                  </Form.Select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={`form-group ${error.country ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Country</div>
                  <Form.Select as="select" name="country">
                    {countryData?.data?.results.map((item) => (
                      <option key={item.id} value={parseInt(item.id)}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.role ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Role</div>
                  <Form.Select as="select" name="role">
                    <option value={0}>Admin</option>
                    <option value={1}>Customer</option>
                  </Form.Select>
                </div>
              </div>
            </div>

            <div className="form-group  d-md-flex  mt-3">
              <button type="submit" className={"Submit_button px-3 "}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
