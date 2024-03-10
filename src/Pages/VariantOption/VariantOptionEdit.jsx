import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../Contexts/UserContext";

const EditVariantGroup = () => {
  const { viewVariantOption, editVariantOption } = useContext(AuthContext);
  const [optionData, setOptionData] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const vGroupData = useLoaderData();
  // for image upload

  useEffect(() => {
    //wait for category id
    if (!id) {
      return;
    }

    //get Category data
    viewVariantOption(parseInt(id))
      .then((response) => {
        setOptionData(response.data.data);
        // Handle the response or do something with the data
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        // Handle the error (e.g., show a message to the user)
      });
  }, []);

  //wait for upload data
  if (!optionData) {
    return;
  }

  if (!vGroupData) {
    return;
  }

  console.log(vGroupData);

  // form submit   function
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const group = form.group.value;

    editVariantOption(id, name, group)
      .then((rsp) => {
        toast.success("Update successful.");
        navigate("/admin/variant-option");
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
          <Link to={"/admin/variant-option"} className="path-text ">
            Variant Option list /
          </Link>
          <span className="path-text-span">Variant Option Details </span>
          <div className="page-title">Variant Option Details</div>
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
              <div className="col-12 col-md-6  ">
                <div className={`form-group  ${error.name ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Option name </div>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder={
                      error.name ? error.name[0] : "Product group name"
                    }
                    defaultValue={optionData.name}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className={`form-group ${error.group ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Parents</div>
                  <Form.Select
                    as="select"
                    defaultValue={optionData.group}
                    name="group"
                  >
                    {vGroupData?.data?.results.map((item) => (
                      <option key={item.id} value={parseInt(item.id)}>
                        {item.group_name}
                      </option>
                    ))}
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

export default EditVariantGroup;
