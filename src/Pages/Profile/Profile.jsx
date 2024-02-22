import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { AuthContext } from "../../Contexts/UserContext";

const Profile = () => {
  const navigate = useNavigate();
  const { userProfile, profileUp, uploadImage, setUserProfile } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const groupData = useLoaderData();
  console.log("profile", userProfile);

  const handleFileSelect = (files) => {
    setSelectedFile(files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let imageId;
    // Declare imageId variable outside the try block

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("document", selectedFile);
        formData.append("doc_type", 0);
        const response = await uploadImage(formData);
        imageId = response.data.data.id; // Assign the value to imageId
        alert("Upload Photo");
      } catch (error) {
        console.log(error);
      }

      if (!imageId) {
        return (
          <div className=" m-5 p-5">
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        );
      }
    }

    console.log("after if", imageId);
    const form = event.target;
    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const bio = form.bio.value;

    profileUp(first_name, last_name, bio, imageId)
      .then((rsp) => {
        alert("Update profile");
        setUserProfile(rsp.data);
        navigate("/admin");
      })
      .catch((er) => {
        console.log(er.response.data);
      });
  };

  return (
    <div className="container-fluid    ">
      <div className="mb-2 pb-2 d-flex justify-content-between align-items-center">
        <div className="">
          <Link to={"/admin"} className="path-text ">
            Dashboard /
          </Link>{" "}
          <span className="path-text-span">Profile</span>
          <div className="page-title">Profile</div>
        </div>
      </div>

      <div className="main-div p-3  p-md-4 p-lg-5  w-100">
        <div className="fs-16-600 mb-2">Image</div>
        <div className="div-profile-image">
          <Dropzone onDrop={handleFileSelect}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="">
                <input {...getInputProps()} />
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    className="img-fluid"
                    alt="Selected"
                  />
                ) : (
                  <div className="imageInput ">
                    <p className="m-auto fs-6">
                      <img
                        src={userProfile.data.image_url}
                        className="img-fluid "
                        alt=""
                      />
                    </p>
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        </div>

        <div className="form-section mt-5">
          <form
            onSubmit={handleFormSubmit}
            action=""
            className="simple-input gray"
          >
            <div className="row gy-4 gx-5">
              <div className="col-12 col-md-6 ">
                <div
                  className={`form-group  ${error.first_name ? "error" : ""}`}
                >
                  <div className="fs-16-600 mb-2">First name</div>
                  <input
                    type="text"
                    name="first_name"
                    className="form-control"
                    defaultValue={userProfile.data.first_name}
                    placeholder={
                      error.first_name ? error.first_name[0] : "Enter your name"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div
                  className={`form-group  ${error.last_name ? "error" : ""}`}
                >
                  <div className="fs-16-600 mb-2">Last name</div>
                  <input
                    type="text"
                    name="last_name"
                    className="form-control"
                    defaultValue={userProfile.data.last_name}
                    placeholder={
                      error.last_name ? error.last_name[0] : "Enter your name"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.email ? "error" : ""}`}>
                  <div className="fs-16-600 mb-2">Email</div>
                  <input
                    type="email"
                    name="email"
                    readOnly
                    className="form-control"
                    defaultValue={userProfile.data.email}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.mobile ? "error" : ""}`}>
                  <div className="fs-16-600 mb-2">Mobile Number</div>
                  <input
                    type="text"
                    name="mobile"
                    readOnly
                    className="form-control"
                    defaultValue={userProfile.data.mobile}
                    placeholder={
                      error.mobile ? error.mobile[0] : "Your phone number"
                    }
                  />
                </div>
              </div>

              <div className="col-12  ">
                <div className={`form-group  ${error.bio ? "error" : ""}`}>
                  <div className="fs-16-600 mb-2">Bio</div>
                  <textarea
                    type="text"
                    name="bio"
                    className="form-control pb-5"
                    defaultValue={userProfile.data.bio}
                    placeholder={error.bio ? error.bio[0] : "Enter your bio"}
                  />
                </div>
              </div>
            </div>

            <div className="form-group  d-md-flex  mt-5">
              <button type="submit" className={"Submit_button px-3  px-3 "}>
                Update Profile
              </button>
              {/* <button
                className={"Submit_button px-3  px-3 ms-md-3 mt-3 mt-lg-0"}
              >
                <Link to={"/admin/profile/password-change"}>
                  <span>Change password</span>
                </Link>
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
