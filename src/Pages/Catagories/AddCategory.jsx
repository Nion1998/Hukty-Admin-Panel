import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/UserContext";

const AddCategory = () => {
  const { userProfile, addCategory, uploadImage } = useContext(AuthContext);
  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const categoriesData = useLoaderData();
  const [isActive, setIsActive] = useState(false);
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(selectedParent);

  const handleCheckboxChange = () => {
    setIsActive(!isActive);
  };

  const handleFileSelect = (files) => {
    setSelectedFile(files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let imageId;

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("document", selectedFile);
        formData.append("doc_type", 0);
        const response = await uploadImage(formData);
        imageId = response.data.data.id;
        toast.success("Upload Photo");
      } catch (error) {
        console.log(error);
        toast.error("Photo Upload Unsuccessful");
      }
    }

    const form = event.target;
    const name = form.name.value;
    const parents = form.parents.value;

    addCategory(name, isActive, parseInt(parents), imageId)
      .then((rsp) => {
        toast.success("Update successful.");
        console.log("category update", rsp);
        navigate("/admin/categories");
      })
      .catch((er) => {
        setError(er.response.data.errors);
        console.log(er.response.data.errors);
        toast.error("Category create unsuccessful");
      });
  };

  return (
    <div className="container-fluid">
      <div className="mb-2 pb-2 d-flex justify-content-between align-items-center">
        <div className="">
          <Link to={"/admin"} className="path-text ">
            Dashboard /
          </Link>{" "}
          <Link to={"/admin/categories"} className="path-text ">
            Category /
          </Link>{" "}
          <span className="path-text-span">Add New Category</span>
          <div className="page-title">Add New Category</div>
        </div>
      </div>

      <div className="main-div p-2 p-md-3 p-lg-4 w-100">
        <div className="form-section">
          <form onSubmit={handleFormSubmit} action="" className="simple-input2">
            <div className="row gy-4 gx-5">
              <div className="col-12">
                <div className={`form-group ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Parents</div>
                  <Form.Select as="select" name="parents">
                    {categoriesData?.data?.results.map((item) => (
                      <option key={item.id} value={parseInt(item.id)}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>

              <div className="col-12">
                <div className={`form-group ${error.name ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Name</div>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder={error.name ? error.name[0] : " name"}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="d-flex">
                  <div className="fs-12-600 mb-2">Upload Image</div>
                  <div className="fs-11-400 text-danger ms-2">
                    {error.image ? error.image[0] : ""}
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
                              Drag and drop image here or{" "}
                              <span className="btn text-color-263238 border p-1">
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

              <div className="col-12 d-flex align-items-center">
                <div className="fs-16">Is Active ?</div>
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
                    htmlFor="is_active_checkbox"
                  >
                    Yes
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group d-md-flex mt-3">
              <button type="submit" className={"Submit_button px-3"}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
