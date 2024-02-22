import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/UserContext";

const AddCourier = () => {
  const { addCourier } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userData = useLoaderData();

  if (!userData) {
    return;
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const website = form.website.value;
    const email = form.email.value;
    const contact_number = form.contact_number.value;
    const address = form.address.value;
    const parcel_quantity = form.parcel_quantity.value;
    const is_active = form.is_active.value;
    addCourier(
      name,
      website,
      email,
      contact_number,
      address,
      parcel_quantity,
      is_active
    )
      .then((rsp) => {
        // toast.success("Coupon created successfully.");
        console.log("Coupon creation response:", rsp);
        navigate("/admin/courier");
      })
      .catch((error) => {
        setError(error.response.data.errors);
        console.error("Error creating coupon:", error.response.data);
        toast.error("Coupon creation unsuccessful.");
      });
  };

  return (
    <div className="container-fluid ">
      <div className=" py-3 d-flex justify-content-between align-items-center">
        <div className="">
          <Link to={"/admin"} className="path-text ">
            Dashboard /
          </Link>{" "}
          <Link to={"/admin/coupons"} className="path-text ">
            Coupons /
          </Link>{" "}
          <span className="path-text-span">Add New Coupon</span>
          <div className="page-title">Add New Coupon</div>
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
              <div className="col-12 col-md-6">
                <div className={`form-group  ${error.name ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Name</div>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder={error.name ? error.name[0] : "name name"}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6  ">
                <div className={`form-group  ${error.website ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Website</div>
                  <input
                    type="text"
                    name="website"
                    className="form-control"
                    placeholder={error.website ? error.website[0] : "Website"}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.email ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Email</div>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder={error.email ? error.email[0] : "Email"}
                  />
                </div>
              </div>

              <div className="col-12  col-md-6">
                <div
                  className={`form-group  ${
                    error.contact_number ? "error" : ""
                  }`}
                >
                  <div className="fs-12-600 mb-2">Contact Number </div>
                  <input
                    type="number"
                    name="contact_number"
                    className="form-control"
                    placeholder={
                      error.contact_number
                        ? error.contact_number[0]
                        : "Contact Number"
                    }
                  />
                </div>
              </div>

              <div className="col-12  ">
                <div className={`form-group  ${error.address ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Address</div>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder={error.address ? error.address[0] : "Max Uses"}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6  ">
                <div
                  className={`form-group  ${
                    error.parcel_quantity ? "error" : ""
                  }`}
                >
                  <div className="fs-12-600 mb-2">Parcel Quantity</div>
                  <input
                    type="number"
                    name="parcel_quantity"
                    className="form-control"
                    placeholder={
                      error.parcel_quantity
                        ? error.parcel_quantity[0]
                        : "parcel_quantity"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Is Active</div>
                  <Form.Select as="select" name="is_active">
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
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

export default AddCourier;
