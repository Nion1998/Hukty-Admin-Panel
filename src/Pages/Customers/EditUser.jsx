import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../Contexts/UserContext";

const EditUser = () => {
  const { viewUser, editUser } = useContext(AuthContext);
  const [UserData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const countryData = useLoaderData();

  useEffect(() => {
    //wait for category id
    if (!id) {
      return;
    }
    //get Category data
    viewUser(parseInt(id))
      .then((response) => {
        setUserData(response.data.data);
        // Handle the response or do something with the data
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        // Handle the error (e.g., show a message to the user)
      });
  }, []);

  //wait for upload data
  if (!UserData) {
    return;
  }

  if (!countryData) {
    return;
  }

  console.log("UserData", UserData);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const email = form.email.value;
    const mobile = form.mobile.value;
    const role = form.role.value;
    const country = form.country.value;

    editUser(id, first_name, last_name, email, mobile, role, country)
      .then((rsp) => {
        // Update user data after successful submission
        setUserData(rsp.data.data);
        toast.success("Update successful.");
        navigate("/admin/users");
      })
      .catch((er) => {
        setError(er.response.data.errors);
        console.error("Update error:", er);
        toast.error("Update Unsuccessful");
      });
  };

  return (
    <div className="container-fluid    ">
      <div className="mb-2 pb-2 d-flex justify-content-between align-items-center">
        <div className="">
          <Link to={"/admin"} className="path-text ">
            Dashboard /
          </Link>
          <Link to={"/admin/users"} className="path-text ">
            User list /
          </Link>
          <span className="path-text-span">User Details </span>
          <div className="page-title">User Details</div>
        </div>
      </div>

      <div className="main-div p-3  p-md-4 p-lg-5  w-100">
        <div className="form-section mt-5">
          <form
            onSubmit={handleFormSubmit}
            action=""
            className="simple-input2 "
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
                    defaultValue={UserData.first_name}
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
                    defaultValue={UserData.last_name}
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
                    defaultValue={UserData.email}
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
                    defaultValue={UserData.mobile}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={`form-group ${error.country ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Country</div>
                  <Form.Select
                    as="select"
                    defaultValue={UserData.country}
                    name="country"
                  >
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
                  <Form.Select
                    as="select"
                    defaultValue={UserData.role}
                    name="role"
                  >
                    <option value={0}>Admin</option>
                    <option value={1}>Customer</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="form-group  d-md-flex  mt-5">
              <button type="submit" className={"Submit_button px-3 "}>
                {" "}
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
