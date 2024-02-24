import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../Contexts/UserContext";

const EditReason = () => {
  const { viewReason, editReason } = useContext(AuthContext);
  const [reasonData, setReasonData] = useState(null);
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
    viewReason(parseInt(id))
      .then((response) => {
        setReasonData(response.data.data);
        // Handle the response or do something with the data
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        // Handle the error (e.g., show a message to the user)
      });
  }, []);

  //wait for upload data
  if (!reasonData) {
    return;
  }

  console.log(reasonData);

  // form submit   function
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const reason_name = form.reason_name.value;
    const reason_type = form.reason_type.value;
    const is_active = form.is_active.value;
    editReason(id, reason_name, reason_type, is_active)
      .then((rsp) => {
        toast.success("Update successful.");
        navigate("/admin/reason");
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
          <Link to={"/admin/reason"} className="path-text ">
            Reason list /
          </Link>
          <span className="path-text-span">Reason Details </span>
          <div className="page-title">Reason Details</div>
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
              <div className="col-12 ">
                <div
                  className={`form-group  ${error.reason_name ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">Reason Name </div>
                  <textarea
                    type="text"
                    name="reason_name"
                    className="form-control"
                    placeholder={
                      error.reason_name ? error.reason_name[0] : "reason_name"
                    }
                    defaultValue={reasonData.reason_name}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Reason Type</div>
                  <Form.Select
                    as="select"
                    defaultValue={reasonData.reason_type}
                    name="reason_type"
                  >
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
                  <Form.Select
                    as="select"
                    defaultValue={reasonData.is_active}
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

export default EditReason;
