import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/UserContext";

const AddNewOption = () => {
  const { addVariantOption } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const vGroupData = useLoaderData();
  const [isActive, setIsActive] = useState(false);
  // for image uplode

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const group = form.group.value;
    addVariantOption(name, group, true)
      .then((rsp) => {
        toast.success("Brand create successful.");
        console.log("Brands update", rsp);
        navigate("/admin/variant-option");
      })
      .catch((er) => {
        setError(er.response.data.errors);
        console.log(er.response.data);
        toast.error("Brand create  unsuccessful.");
        // setError(er.response.data.errors);
      });

    console.log(error);
  };

  return (
    <div className="container-fluid ">
      <div className=" py-3 d-flex justify-content-between align-items-center">
        <div className="">
          <Link to={"/admin"} className="path-text ">
            Dashboard /
          </Link>{" "}
          <Link to={"/admin/variant-group"} className="path-text ">
            Variant Option /
          </Link>{" "}
          <span className="path-text-span">Add New Option</span>
          <div className="page-title">Add New Option</div>
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
              <div className="col-12  ">
                <div className={`form-group  ${error.name ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Option name </div>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder={error.name ? error.name[0] : "option name"}
                  />
                </div>
              </div>

              <div className={`form-group ${error.group ? "error" : ""}`}>
                <div className="fs-12-600 mb-2">Parents</div>
                <Form.Select as="select" name="group">
                  {vGroupData?.data?.results.map((item) => (
                    <option key={item.id} value={parseInt(item.id)}>
                      {item.group_name}
                    </option>
                  ))}
                </Form.Select>
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

export default AddNewOption;
