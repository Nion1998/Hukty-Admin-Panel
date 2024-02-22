import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/UserContext";

const AddBrand = () => {
  const { addBrand, uploadImage } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  // for image uplode
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCheckboxChange = () => {
    setIsActive(!isActive);
  };

  const handleFileSelect = (files) => {
    setSelectedFile(files[0]);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let logo; // Declare logo variable outside the try block
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("document", selectedFile);
        formData.append("doc_type", 0);
        const response = await uploadImage(formData);
        logo = response.data.data.id;
        toast.success("Upload Photo");
        console.log("img  up ", response);
      } catch (error) {
        console.log("logo", error);
        toast.error("Upload Photo error");
      }
    }
    console.log("logo", logo);
    const form = event.target;
    const name = form.name.value;
    const position = form.position.value;
    addBrand(name, position, isActive, logo)
      .then((rsp) => {
        toast.success("Brand create successful.");
        console.log("Brands update", rsp);
        navigate("/admin/brands");
      })
      .catch((er) => {
        setError(er.response.data);
        console.log("add band err", er.response.data);
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
          <Link to={"/admin/brands"} className="path-text ">
            Brands /
          </Link>{" "}
          <span className="path-text-span">Add New Brands</span>
          <div className="page-title">Add New Brands</div>
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
                  <div className="fs-12-600 mb-2">Name</div>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder={error.name ? error.name[0] : "Product name"}
                  />
                </div>
              </div>

              <div className="col-12  ">
                <div className={`form-group  ${error.position ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Position</div>
                  <input
                    type="text"
                    name="position"
                    className="form-control"
                    placeholder={
                      error.position ? error.position[0] : "Product position"
                    }
                  />
                </div>
              </div>

              <div className="col-12  ">
                <div className="d-flex ">
                  <div className="fs-12-600 mb-2">Upload Image</div>
                  <div className="fs-11-400  text-danger ms-2 ">
                    {error.logo ? error.logo[0] : ""}
                  </div>
                </div>
                <div className="imageUpload">
                  <Dropzone onDrop={handleFileSelect}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {selectedFile ? (
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected"
                          />
                        ) : (
                          <div className="imageInput">
                            <p className="m-auto fs-6">
                              {/* <img src={props.image} alt="" /> */}
                              Drag and drop image here or{" "}
                              <span className="btn  text-color-263238 border p-1 ">
                                Browse
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>

              <div className="col-12 d-flex align-items-center ">
                <div className="fs-16 ">Is Active ?</div>
                <div className="form-check d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="is_active"
                    id="is_active_checkbox"
                    checked={isActive}
                    onChange={handleCheckboxChange}
                  />

                  <label
                    className="form-check-label ms-2"
                    for="flexCheckDefault"
                  >
                    Yes
                  </label>
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

export default AddBrand;
