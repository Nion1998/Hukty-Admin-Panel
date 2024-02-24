import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/UserContext";

const EditBlog = () => {
  const { viewBlog, uploadImage, editBlog } = useContext(AuthContext);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    //wait for category id
    if (!id) {
      return;
    }

    //get Category data
    viewBlog(parseInt(id))
      .then((response) => {
        setBlogData(response.data.data);
        // Handle the response or do something with the data
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        // Handle the error (e.g., show a message to the user)
      });
  }, [viewBlog]);

  if (!blogData) {
    return;
  }

  console.log("blogDataxxxxxx", blogData.image);

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
      imageId = blogData.image;
    }

    const form = event.target;
    const title = form.title.value;
    const content = form.content.value;
    const seo_title = form.seo_title.value;
    const seo_keyword = form.seo_keyword.value;
    const view_count = form.view_count.value;
    const seo_description = form.seo_description.value;
    const image = imageId;
    editBlog(
      id,
      title,
      content,
      seo_title,
      seo_keyword,
      view_count,
      seo_description,
      image
    )
      .then(() => {
        navigate("/admin/blog");
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
          <Link to={"/admin/blog"} className="path-text">
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
              <div className="col-12 ">
                <div className={`form-group  ${error.content ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Content</div>
                  <textarea
                    type="text"
                    name="content"
                    className="form-control"
                    placeholder={error.content ? error.content[0] : "Content"}
                    defaultValue={blogData.content}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={`form-group  ${error.title ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Blog Title</div>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder={error.title ? error.title[0] : "Blog title"}
                    defaultValue={blogData.title}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div
                  className={`form-group  ${error.seo_title ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">SEO Title</div>
                  <input
                    type="text"
                    name="seo_title"
                    className="form-control"
                    placeholder={
                      error.seo_title ? error.seo_title[0] : "Seo title"
                    }
                    defaultValue={blogData.seo_title}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div
                  className={`form-group  ${error.seo_keyword ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">SEO Keyword</div>
                  <input
                    type="text"
                    name="seo_keyword"
                    className="form-control"
                    placeholder={
                      error.seo_keyword ? error.seo_keyword[0] : "Seo keyword"
                    }
                    defaultValue={blogData.seo_keyword}
                  />
                </div>
              </div>

              <div className="col-12  col-md-6">
                <div
                  className={`form-group  ${error.view_count ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">View Count</div>
                  <input
                    type="text"
                    name="view_count"
                    className="form-control"
                    placeholder={
                      error.view_count ? error.view_count[0] : "Number"
                    }
                    defaultValue={blogData.view_count}
                  />
                </div>
              </div>

              <div className="col-12  col-md-6">
                <div
                  className={`form-group  ${
                    error.seo_description ? "error" : ""
                  }`}
                >
                  <div className="fs-12-600 mb-2">SEO Description</div>
                  <textarea
                    type="text"
                    name="seo_description"
                    className="form-control"
                    placeholder={
                      error.seo_description
                        ? error.seo_description[0]
                        : "seo description"
                    }
                    defaultValue={blogData.seo_description}
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
                              <img src={blogData.image_url} alt="" />
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

export default EditBlog;
