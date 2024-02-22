import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../Contexts/UserContext";

const EditVariantGroup = () => {
  const { viewVariantGroup, editVariantGroup } = useContext(AuthContext);
  const [groupData, setCategoryData] = useState(null);
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
    viewVariantGroup(parseInt(id))
      .then((response) => {
        setCategoryData(response.data.data);
        // Handle the response or do something with the data
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        // Handle the error (e.g., show a message to the user)
      });
  }, []);

  //wait for upload data
  if (!groupData) {
    return;
  }

  console.log(groupData);

  // form submit   function
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const group_name = form.group_name.value;

    const data = {
      group_name,
    };

    console.log(data);

    editVariantGroup(id, data)
      .then((rsp) => {
        toast.success("Update successful.");
        navigate("/admin/variant-group");
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
          <Link to={"/admin/variant-group"} className="path-text ">
            Group list /
          </Link>
          <span className="path-text-span">Group Details </span>
          <div className="page-title">Group Details</div>
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
                  className={`form-group  ${error.group_name ? "error" : ""}`}
                >
                  <div className="fs-16-600 mb-2">Group Name</div>
                  <input
                    type="text"
                    name="group_name"
                    className="form-control"
                    placeholder={
                      error.group_name ? error.group_name[0] : "code"
                    }
                    defaultValue={groupData.group_name}
                  />
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

export default EditVariantGroup;
