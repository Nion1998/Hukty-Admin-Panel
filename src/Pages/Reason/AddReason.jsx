import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/UserContext";

const AddReason = () => {
  const { addReason } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const reason_name = form.reason_name.value;
    const reason_type = form.reason_type.value;
    const is_active = form.is_active.value;
    addReason(reason_name, reason_type, is_active)
      .then((rsp) => {
        // toast.success("Coupon created successfully.");
        navigate("/admin/reason");
      })
      .catch((error) => {
        setError(error.response.data.errors);
        console.error("Error:", error.response.data);
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
          <Link to={"/admin/reason"} className="path-text ">
            Reason List /
          </Link>{" "}
          <span className="path-text-span">Add Reason</span>
          <div className="page-title">Add Reason</div>
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
                <div
                  className={`form-group  ${error.reason_name ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">Reason Name</div>
                  <input
                    type="text"
                    name="reason_name"
                    className="form-control"
                    placeholder={
                      error.reason_name ? error.reason_name[0] : "name name"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Reason Type</div>
                  <Form.Select as="select" name="reason_type">
                    <option value={0}>Change Of Mind</option>
                    <option value={1}>Item Out of Stock</option>
                    <option value={2}>Customer Request'</option>
                    <option value={3}>By Admin</option>
                  </Form.Select>
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

export default AddReason;
