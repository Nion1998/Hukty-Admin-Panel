import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../Contexts/UserContext";

const WebsiteInfo = () => {
  const { postWebsiteInfo, uploadImage } = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileSL, setSelectedFileSL] = useState(null);
  const websiteData = useLoaderData();

  if (!websiteData) {
    return;
  }

  console.log("websiteData", websiteData);

  // image upload function
  const handleFileSelect = (files) => {
    setSelectedFile(files[0]);
  };

  const handleFileSelectSLogo = (files) => {
    setSelectedFileSL(files[0]);
  };

  // form submit   function
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let logoLargeID; // Declare logoLargeID variable outside the try block
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("document", selectedFile);
        formData.append("doc_type", 0);
        const response = await uploadImage(formData);
        logoLargeID = response.data.data.id;
        toast.success("Upload Photo");
      } catch (error) {
        console.log(error);
        toast.error("Upload photo error");
      }
    }
    if (!logoLargeID) {
      logoLargeID = websiteData.data.logo_large;
    }

    let SmLogoID; // Declare logoLargeID variable outside the try block
    if (selectedFileSL) {
      try {
        const formData = new FormData();
        formData.append("document", selectedFileSL);
        formData.append("doc_type", 0);
        const response = await uploadImage(formData);
        SmLogoID = response.data.data.id;
        toast.success("Upload Photo");
      } catch (error) {
        console.log(error);
        toast.error("Upload photo error");
      }
    }
    if (!SmLogoID) {
      SmLogoID = websiteData.data.logo_small;
    }

    if (!SmLogoID && !logoLargeID) {
      return;
    }

    const form = event.target;
    const site_name = form.site_name.value;
    const website_url = form.website_url.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const short_desc = form.short_desc.value;
    const facebook = form.facebook.value;
    const twitter = form.twitter.value;
    const linkedin = form.linkedin.value;
    const instagram = form.instagram.value;
    const logo_small = SmLogoID;
    const logo_large = logoLargeID;
    const youtube = form.youtube.value;
    postWebsiteInfo(
      site_name,
      website_url,
      email,
      phone,
      address,
      short_desc,
      facebook,
      twitter,
      linkedin,
      instagram,
      youtube,
      logo_small,
      logo_large
    )
      .then((rsp) => {
        toast.success("Update successful.");
        console.log("category update", rsp);
        navigate("/admin/websiteinfo");
      })
      .catch((er) => {
        setError(er.response.data.errors);
        console.error("err", er.response.data.errors);
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
          <Link to={"/admin/websiteinfo"} className="path-text ">
            Catagories /
          </Link>
          <span className="path-text-span">Website Details </span>
          <div className="page-title">Website Details</div>
        </div>
      </div>

      <div className="main-div p-3  p-md-4 p-lg-5  w-100">
        <div className="d-flex">
          <div>
            <div className="fs-16-600 mb-2">Large Logo</div>
            <div className="div-profile-image">
              <Dropzone onDrop={handleFileSelect}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="imageUpload">
                    <input {...getInputProps()} />
                    {selectedFile ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        className=""
                        alt="Selected"
                      />
                    ) : (
                      <div className="imageInput ">
                        <p className="m-auto fs-6">
                          <img
                            src={websiteData.data.large_logo_url}
                            className=""
                            alt=""
                          />
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
          <div className="ms-3">
            <div className="fs-16-600 mb-2">Small Logo</div>
            <div className="div-profile-image">
              {/* Image drag and drop div  */}
              <div className="imageUpload">
                <Dropzone onDrop={handleFileSelectSLogo}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="imageUpload">
                      <input {...getInputProps()} />
                      {selectedFileSL ? (
                        <img
                          src={URL.createObjectURL(selectedFileSL)}
                          alt="Selected"
                        />
                      ) : (
                        <div className="imageInput">
                          <p className="m-auto fs-6">
                            <img
                              src={websiteData.data.small_logo_url}
                              className=""
                              alt=""
                            />
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section mt-5">
          <form
            onSubmit={handleFormSubmit}
            action=""
            className="simple-input2 "
          >
            <div className="row gy-4 gx-5">
              {/* site_name */}
              <div className="col-12 col-md-6 ">
                <div
                  className={`form-group  ${error.site_name ? "error" : ""}`}
                >
                  <div className="fs-16-600 mb-2">Website Name</div>
                  <input
                    type="text"
                    name="site_name"
                    className="form-control"
                    placeholder={error.site_name ? error.site_name[0] : "code"}
                    defaultValue={websiteData.data.site_name}
                  />
                </div>
              </div>

              {/* website_url */}
              <div className="col-12 col-md-6 ">
                <div
                  className={`form-group  ${error.website_url ? "error" : ""}`}
                >
                  <div className="fs-16-600 mb-2">Website Url</div>
                  <input
                    type="text"
                    name="website_url"
                    className="form-control"
                    placeholder={
                      error.website_url ? error.website_url[0] : "code"
                    }
                    defaultValue={websiteData.data.website_url}
                  />
                </div>
              </div>

              {/* email */}
              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.email ? "error" : ""}`}>
                  <div className="fs-16-600 mb-2">Website Email</div>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder={error.email ? error.email[0] : "code"}
                    defaultValue={websiteData.data.email}
                  />
                </div>
              </div>

              {/* phone */}
              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.phone ? "error" : ""}`}>
                  <div className="fs-16-600 mb-2">Phone</div>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder={error.phone ? error.phone[0] : "code"}
                    defaultValue={websiteData.data.phone}
                  />
                </div>
              </div>

              {/* address */}
              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.address ? "error" : ""}`}>
                  <div className="fs-16-600 mb-2">Address</div>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder={error.address ? error.address[0] : "code"}
                    defaultValue={websiteData.data.address}
                  />
                </div>
              </div>

              {/* short_desc */}
              <div className="col-12 col-md-6 ">
                <div
                  className={`form-group  ${error.short_desc ? "error" : ""}`}
                >
                  <div className="fs-16-600 mb-2">Short Description</div>
                  <input
                    type="text"
                    name="short_desc"
                    className="form-control"
                    placeholder={
                      error.short_desc ? error.short_desc[0] : "code"
                    }
                    defaultValue={websiteData.data.short_desc}
                  />
                </div>
              </div>

              {/* facebook */}
              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.facebook ? "error" : ""}`}>
                  <div className="fs-16-600 mb-2">Facebook</div>
                  <input
                    type="text"
                    name="facebook"
                    className="form-control"
                    placeholder={error.facebook ? error.facebook[0] : "code"}
                    defaultValue={websiteData.data.facebook}
                  />
                </div>
              </div>

              {/* twitter */}
              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.twitter ? "error" : ""}`}>
                  <div className="fs-16-600 mb-2">Twitter</div>
                  <input
                    type="text"
                    name="twitter"
                    className="form-control"
                    placeholder={error.twitter ? error.twitter[0] : "code"}
                    defaultValue={websiteData.data.twitter}
                  />
                </div>
              </div>

              {/* linkedin */}
              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.linkedin ? "error" : ""}`}>
                  <div className="fs-16-600 mb-2">Linkedin</div>
                  <input
                    type="text"
                    name="linkedin"
                    className="form-control"
                    placeholder={error.linkedin ? error.linkedin[0] : "code"}
                    defaultValue={websiteData.data.linkedin}
                  />
                </div>
              </div>

              {/* instagram */}
              <div className="col-12 col-md-6 ">
                <div
                  className={`form-group  ${error.instagram ? "error" : ""}`}
                >
                  <div className="fs-16-600 mb-2">Instagram</div>
                  <input
                    type="text"
                    name="instagram"
                    className="form-control"
                    placeholder={error.instagram ? error.instagram[0] : "code"}
                    defaultValue={websiteData.data.instagram}
                  />
                </div>
              </div>

              {/* Youtube */}
              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.youtube ? "error" : ""}`}>
                  <div className="fs-16-600 mb-2">youtube</div>
                  <input
                    type="text"
                    name="youtube"
                    className="form-control"
                    placeholder={error.youtube ? error.youtube[0] : "code"}
                    defaultValue={websiteData.data.youtube}
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

export default WebsiteInfo;
