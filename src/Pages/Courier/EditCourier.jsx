import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../Contexts/UserContext";

const EditCourier = () => {
  const { viewCourier, editCourier } = useContext(AuthContext);
  const [courierData, setCourierData] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  // for image upload

  useEffect(() => {
    //wait for category id
    if (!id) {
      return;
    }

    //get Category data
    viewCourier(parseInt(id))
      .then((response) => {
        setCourierData(response.data.data);
        // Handle the response or do something with the data
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        // Handle the error (e.g., show a message to the user)
      });
  }, []);

  //wait for upload data
  if (!courierData) {
    return;
  }

  console.log("courierData", courierData);

  // form submit   function
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

    editCourier(
      id,
      name,
      website,
      email,
      contact_number,
      address,
      parcel_quantity,
      is_active
    )
      .then((rsp) => {
        toast.success("Update successful.");
        navigate("/admin/couriers");
      })
      .catch((er) => {
        setError(er.response.data.errors);
        console.log("err", er);
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
          <Link to={"/admin/couriers"} className="path-text ">
            Courier list /
          </Link>
          <span className="path-text-span">Courier Details </span>
          <div className="page-title">Courier Details</div>
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
              <div className="col-12 col-md-6">
                <div className={`form-group  ${error.name ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Name</div>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder={error.name ? error.name[0] : "name name"}
                    defaultValue={courierData.name}
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
                    defaultValue={courierData.website}
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
                    defaultValue={courierData.email}
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
                    defaultValue={courierData.contact_number}
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
                    placeholder={error.address ? error.address[0] : "address"}
                    defaultValue={courierData.address}
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
                    defaultValue={courierData.parcel_quantity}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Is Active</div>
                  <Form.Select
                    as="select"
                    defaultValue={courierData.is_active}
                    name="is_active"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
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

export default EditCourier;
