import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/UserContext";

const BannerAdd = () => {
  const { addBanner, uploadImage } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // for image uplode
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (files) => {
    setSelectedFile(files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let imageId; // Declare image variable outside the try block
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("document", selectedFile);
        formData.append("doc_type", 0);
        const response = await uploadImage(formData);
        imageId = response.data.data.id;
        toast.success("Upload Photo");
        console.log("img  up ", response);
      } catch (error) {
        console.log("imageId", error);
        toast.error("Upload Photo error");
      }
    }
    const form = event.target;
    const title = form.title.value;
    const url = form.url.value;
    const description = form.description.value;
    const image = imageId;
    addBanner(title, url, description, image)
      .then((rsp) => {
        // toast.success("Coupon created successfully.");
        navigate("/admin/banners");
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
          <Link to={"/admin/banners"} className="path-text ">
            Banner List /
          </Link>{" "}
          <span className="path-text-span">Add Banner</span>
          <div className="page-title">Add Banner</div>
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
                <div className={`form-group  ${error.title ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Banner Title</div>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder={error.title ? error.title[0] : "banner title"}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={`form-group  ${error.url ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">URL</div>
                  <input
                    type="text"
                    name="url"
                    className="form-control"
                    placeholder={error.url ? error.url[0] : "url"}
                  />
                </div>
              </div>

              <div className="col-12  col-md-6">
                <div
                  className={`form-group  ${error.description ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">Description</div>
                  <textarea
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder={
                      error.description
                        ? error.description[0]
                        : "seo description"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6  ">
                <div className="d-flex ">
                  <div className="fs-12-600 mb-2">Upload Image</div>
                  <div className="fs-11-400  text-danger ms-2 ">
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

export default BannerAdd;
