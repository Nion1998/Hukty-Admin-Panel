import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/UserContext";

const BannerEdit = () => {
  const { viewBanner, uploadImage, editBanner } = useContext(AuthContext);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [bannerData, setBannerData] = useState(null);
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    //wait for category id
    if (!id) {
      return;
    }

    //get Category data
    viewBanner(parseInt(id))
      .then((response) => {
        setBannerData(response.data.data);
        // Handle the response or do something with the data
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        // Handle the error (e.g., show a message to the user)
      });
  }, [viewBanner]);

  if (!bannerData) {
    return;
  }

  console.log("bannerData", bannerData);

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
        console.log("img up ", response);
      } catch (error) {
        console.error("Image Upload Error:", error);
        toast.error("Upload Photo error");
      }
    }

    if (!imageId) {
      imageId = bannerData.image;
    }

    const form = event.target;
    const title = form.title.value;
    const url = form.url.value;
    const description = form.description.value;
    const image = imageId;
    editBanner(id, title, url, description, image)
      .then(() => {
        navigate("/admin/banners");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setError(error.response.data.errors);
          console.error("Error:", error.response.data);
          toast.error("Blog creation unsuccessful.");
        } else {
          console.error("Error:", error);
          toast.error("An error occurred while creating the blog.");
        }
      });
  };

  return (
    <div className="container-fluid">
      <div className="py-3 d-flex justify-content-between align-items-center">
        <div className="">
          <Link to={"/admin"} className="path-text">
            Dashboard /
          </Link>{" "}
          <Link to={"/admin/banners"} className="path-text">
            Blog List /
          </Link>{" "}
          <span className="path-text-span">Edit Blog</span>
          <div className="page-title">Edit Blog</div>
        </div>
      </div>

      <div className="main-div p-2 p-md-3 p-lg-4 w-100">
        <div className="form-section">
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
                    defaultValue={bannerData.title}
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
                    defaultValue={bannerData.url}
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
                    defaultValue={bannerData.description}
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
                      <div {...getRootProps()} className="dropzone ">
                        <input {...getInputProps()} />
                        {selectedFile ? (
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected"
                          />
                        ) : (
                          <div className="imageInput">
                            <p className="m-auto fs-6">
                              <img src={bannerData.image_url} alt="" />
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

export default BannerEdit;
