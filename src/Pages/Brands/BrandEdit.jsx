import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/UserContext";

const BrandEdit = () => {
  const { viewBrand, editBrand, uploadImage } = useContext(AuthContext);
  const [brandsData, setBrandsData] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  // for image uplode
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    //wait for Brand id
    if (!id) {
      return;
    }

    //get Category data
    viewBrand(parseInt(id))
      .then((response) => {
        setBrandsData(response.data.data);
        // Handle the response or do something with the data
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        // Handle the error (e.g., show a message to the user)
      });
  }, []);

  //wait for catagory data
  if (!brandsData) {
    return;
  }
  console.log("brandsData", brandsData);

  // image uplode fuction
  const handleFileSelect = (files) => {
    setSelectedFile(files[0]);
  };

  // form submit   fuction
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
      } catch (error) {
        console.log(error);
        toast.error("Upload photo error");
      }
    }

    if (!logo) {
      logo = brandsData.image;
    }

    const form = event.target;
    const name = form.name.value;
    const position = form.position.value;
    const data = {
      name,
      position,
      logo,
    };

    console.log(data);

    editBrand(id, data)
      .then((rsp) => {
        toast.success("Update successful.");
        console.log("category update", rsp);
        navigate("/admin/brands");
      })
      .catch((er) => {
        setError(er.response.data);
        console.log("err", er);
        toast.error("Update unsuccessful.");
      });
  };
  return (
    <div className="container-fluid   pt-2  ">
      <div className="mb-2 pb-2 d-flex justify-content-between align-items-center">
        <div className="">
          <Link to={"/admin"} className="path-text ">
            Dashboard /
          </Link>
          <Link to={"/admin/brands"} className="path-text ">
            Brands /
          </Link>
          <span className="path-text-span">Edit Brands </span>
          <div className="page-title">Edit Brands</div>
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
                        {brandsData && brandsData.logo_url ? (
                          <img
                            src={brandsData.logo_url}
                            alt=""
                            className="img-fluid"
                          />
                        ) : (
                          //   <img src={product} className="img-fluid" alt="" />
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
              <div className="col-12 ">
                <div className={`form-group  ${error.name ? "error" : ""}`}>
                  <div className="fs-16-600 mb-2">Brand name</div>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder={error.name ? error.name[0] : "Brand name "}
                    defaultValue={brandsData.name}
                  />
                </div>
              </div>

              <div className="col-12 ">
                <div className={`form-group  ${error.position ? "error" : ""}`}>
                  <div className="fs-16-600 mb-2">Brand position</div>
                  <input
                    type="text"
                    name="position"
                    className="form-control"
                    placeholder={
                      error.position ? error.position[0] : "Brand position"
                    }
                    defaultValue={brandsData.position}
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

export default BrandEdit;
