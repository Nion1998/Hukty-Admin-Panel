import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../Contexts/UserContext";

const EditCategory = () => {
  const { userProfile, viewCategory, editCategory, uploadImage } =
    useContext(AuthContext);
  const [categoryData, setCategoryData] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  // for image upload
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    //wait for category id
    if (!id) {
      return;
    }

    //get Category data
    viewCategory(parseInt(id))
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
  if (!categoryData) {
    return;
  }

  console.log(categoryData);

  // image upload function
  const handleFileSelect = (files) => {
    setSelectedFile(files[0]);
  };

  // form submit   function
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let imageId; // Declare imageId variable outside the try block

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
        toast.error("Upload photo error");
      }
    }

    if (!imageId) {
      imageId = categoryData.image;
    }

    const form = event.target;
    const name = form.name.value;
    const parents = form.parents.value;
    const image = imageId;
    const data = {
      name,
      parents,
      image,
    };

    console.log(data);

    editCategory(id, data)
      .then((rsp) => {
        toast.success("Update successful.");
        console.log("category update", rsp);
        navigate("/admin/categories");
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
          <Link to={"/admin/categories"} className="path-text ">
            Catagories /
          </Link>
          <span className="path-text-span">Category Details </span>
          <div className="page-title">Category Details</div>
        </div>
      </div>

      <div className="main-div p-3  p-md-4 p-lg-5  w-100">
        <div className="fs-16-600 mb-2">Image</div>
        <div className="div-profile-image">
          {/* Image drag and drop div  */}
          <div className="imageUpload">
            <Dropzone onDrop={handleFileSelect}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="">
                  <input {...getInputProps()} />
                  {selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected"
                    />
                  ) : (
                    <div className="imageInput">
                      <p className="m-auto fs-6">
                        {categoryData && categoryData.logo_url ? (
                          <img
                            src={categoryData.logo_url}
                            alt=""
                            className="img-fluid"
                          />
                        ) : (
                          // <img src={product} className="img-fluid" alt="" />
                          ""
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
        </div>

        <div className="form-section mt-5">
          <form
            onSubmit={handleFormSubmit}
            action=""
            className="simple-input2 "
          >
            <div className="row gy-4 gx-5">
              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.name ? "error" : ""}`}>
                  <div className="fs-16-600 mb-2">Name</div>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder={error.name ? error.name[0] : "code"}
                    defaultValue={categoryData.name}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-16-600 mb-2">Parents</div>
                  <Form.Select as="select" name="parents">
                    <option value={0}>Tools</option>
                    <option value={1}>High</option>
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

export default EditCategory;
