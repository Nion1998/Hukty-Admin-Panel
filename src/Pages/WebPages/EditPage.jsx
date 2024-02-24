import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/UserContext";

const EditPage = () => {
  const { viewPage, editPage, uploadImage } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileDocs, setSelectedFileDocs] = useState(null);
  const [pageData, setPageData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    //wait for category id
    if (!id) {
      return;
    }
    //get Category data
    viewPage(parseInt(id))
      .then((response) => {
        setPageData(response.data.data);
        // Handle the response or do something with the data
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        // Handle the error (e.g., show a message to the user)
      });
  }, []);

  //wait for upload data
  if (!pageData) {
    return;
  }

  console.log("pageData", pageData);

  const handleFileSelect = (files) => {
    setSelectedFile(files[0]);
  };

  const handleFileSelectDocs = (files) => {
    setSelectedFileDocs(files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let thumbnailId;
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("document", selectedFile);
        formData.append("doc_type", 0);
        const response = await uploadImage(formData);
        thumbnailId = response.data.data.id;
        toast.success("Thumbnail Uploaded");
      } catch (error) {
        console.log("Thumbnail Upload Error:", error);
        toast.error("Thumbnail Upload Error");
      }
    }

    let attachmentId;
    if (selectedFileDocs) {
      try {
        const formData = new FormData();
        formData.append("document", selectedFileDocs);
        formData.append("doc_type", 0);
        const response = await uploadImage(formData);
        attachmentId = response.data.data.id;
        toast.success("Attachment Uploaded");
      } catch (error) {
        console.log("Attachment Upload Error:", error);
        toast.error("Attachment Upload Error");
      }
    }

    const form = event.target;
    const title = form.title.value;
    const video_url = form.video_url.value;
    const desc = form.desc.value;
    const page_type = form.page_type.value;
    const is_active = form.is_active.value;
    const thumbnail = thumbnailId;
    const attachment = attachmentId;
    editPage(
      id,
      title,
      video_url,
      desc,
      page_type,
      is_active,
      thumbnail,
      attachment
    )
      .then(() => {
        navigate("/admin/pages");
      })
      .catch((error) => {
        setError(error.response.data.errors);
        console.error("Error:", error.response.data);
        toast.error("Page creation unsuccessful.");
      });
  };

  return (
    <div className="container-fluid">
      <div className="py-3 d-flex justify-content-between align-items-center">
        <div>
          <Link to={"/admin"} className="path-text">
            Dashboard /
          </Link>{" "}
          <Link to={"/admin/pages"} className="path-text">
            Page List /
          </Link>{" "}
          <span className="path-text-span">Edit Page</span>
          <div className="page-title">Edit Page</div>
        </div>
      </div>

      <div className="main-div p-2 p-md-3 p-lg-4 w-100">
        <div className="form-section">
          <form onSubmit={handleFormSubmit} className="simple-input2">
            <div className="row gy-4 gx-5">
              <div className="col-12 col-md-6">
                <div className={`form-group ${error.title ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Page Title</div>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder={error.title ? error.title[0] : "title"}
                    defaultValue={pageData.title}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={`form-group ${error.video_url ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Video URL</div>
                  <input
                    type="text"
                    name="video_url"
                    className="form-control"
                    placeholder={
                      error.video_url ? error.video_url[0] : "video_url"
                    }
                    defaultValue={pageData.video_url}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className={`form-group ${error.desc ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Description</div>
                  <textarea
                    type="text"
                    name="desc"
                    className="form-control"
                    placeholder={error.desc ? error.desc[0] : "Description"}
                    defaultValue={pageData.desc}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Page Type</div>
                  <Form.Select
                    as="select"
                    defaultValue={pageData.page_type}
                    name="page_type"
                  >
                    <option value={0}>Privacy Policy</option>
                    <option value={1}>Terms and Condition</option>
                    <option value={2}>About Us</option>
                    <option value={3}>General</option>
                  </Form.Select>
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Is Active</div>
                  <Form.Select
                    as="select"
                    defaultValue={pageData.is_active}
                    name="is_active"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Form.Select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="d-flex">
                  <div className="fs-12-600 mb-2">Upload Thumbnail</div>
                  <div className="fs-11-400 text-danger ms-2">
                    {error.thumbnail ? error.thumbnail[0] : ""}
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

              <div className="col-12 col-md-6">
                <div className="d-flex">
                  <div className="fs-12-600 mb-2">Upload Attachment</div>
                  <div className="fs-11-400 text-danger ms-2">
                    {error.attachment ? error.attachment[0] : ""}
                  </div>
                </div>
                <div className="imageUpload">
                  <Dropzone onDrop={handleFileSelectDocs}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {selectedFileDocs ? (
                          <img
                            src={URL.createObjectURL(selectedFileDocs)}
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

              <div className="form-group d-md-flex mt-3">
                <button type="submit" className="Submit_button px-3">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
