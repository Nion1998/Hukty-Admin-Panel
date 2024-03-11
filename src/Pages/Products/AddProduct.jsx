import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/UserContext";
import VariantInput from "../../Components/VariantInput/VariantInput";
import Dropzone from "react-dropzone";
import { type } from "@testing-library/user-event/dist/type";

const AddProduct = () => {
  const { userProfile, addProduct, uploadImage, getBrand, getCategory } =
    useContext(AuthContext);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]); // Updated state for multiple files
  const [selectedFilesth, setSelectedFilesth] = useState([]); // Updated state for multiple files
  const [formDataArray, setFormDataArray] = useState([]);
  const vGroupData = useLoaderData();
  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    additional_price: "",
    variant_option: "",
  });

  useEffect(() => {
    getBrand()
      .then((response) => {
        setBrand(response.data);
      })
      .catch((error) => {
        console.error("Error getting data:", error);
      });

    getCategory()
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error("Error getting data:", error);
      });
  }, []);

  if (!category) {
    return;
  }

  if (!brand) {
    return;
  }

  console.log("brand", brand);

  const handleFileSelect = (files) => {
    setSelectedFiles(files);
  };
  const handleFileSelectth = (files) => {
    setSelectedFilesth(files);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let imageIds = [];
    if (selectedFiles.length > 0) {
      try {
        for (const selectedFile of selectedFiles) {
          const formData = new FormData();
          formData.append("document", selectedFile);
          formData.append("doc_type", 0);
          const response = await uploadImage(formData);
          imageIds.push(response.data.data.id);
          toast.success("Upload Photo");
        }
      } catch (error) {
        console.log(error);
        toast.error("Upload photo error");
      }
    }

    console.log(imageIds);

    // for thumbnail
    let thumbnailID;
    if (selectedFilesth.length > 0) {
      try {
        for (const selectedFile of selectedFilesth) {
          const formData = new FormData();
          formData.append("document", selectedFile);
          formData.append("doc_type", 0);
          const response = await uploadImage(formData);
          thumbnailID = response.data.data.id;
          toast.success("Upload thumbnail Photo");
        }
      } catch (error) {
        console.log(error);
        toast.error("Upload thumbnail error");
      }
    }

    const form = event.target;
    const product_variants = formDataArray;
    const name = form.name.value;
    const quantity = form.quantity.value;
    const cost = form.cost.value;
    const price = form.price.value;
    const images = imageIds;
    const thumbnail = thumbnailID;
    const unit_name = form.unit_name.value;
    const unit_value = form.unit_value.value;
    const brand = form.brand.value;
    const category = form.category.value;
    const is_featured = form.is_featured.value;
    const has_variant = form.has_variant.value;
    const has_promotion = form.has_promotion.value;
    const has_offer = form.has_offer.value;
    const offer_percent = form.offer_percent.value;
    const promotional_price = form.promotional_price.value;
    const promotions_start_date = form.promotions_start_date.value;
    const promotions_expiry_date = form.promotions_expiry_date.value;
    const product_specification = form.product_specification.value;
    const description = form.description.value;
    const stock_status = form.stock_status.value;
    const is_active = form.is_active.value;
    const sku = form.sku.value;
    addProduct(
      product_variants,
      name,
      quantity,
      cost,
      price,
      images,
      thumbnail,
      unit_name,
      unit_value,
      brand,
      category,
      is_featured,
      has_variant,
      has_promotion,
      has_offer,
      offer_percent,
      promotional_price,
      promotions_start_date,
      promotions_expiry_date,
      product_specification,
      description,
      stock_status,
      is_active,
      sku
    )
      .then((rsp) => {
        // toast.success("Coupon created successfully.");
        console.log("Coupon creation response:", rsp);
        navigate("/admin/products");
      })
      .catch((error) => {
        setError(error.response.data.errors);
        console.error("Error creating coupon:", error.response.data);
        toast.error("Coupon creation unsuccessful.");
      });
  };

  return (
    <div className="container-fluid">
      <div className="mb-2 pb-2 d-flex justify-content-between align-items-center">
        <div className="">
          <Link to={"/admin"} className="path-text ">
            Dashboard /
          </Link>{" "}
          <Link to={"/admin/products"} className="path-text ">
            Products /
          </Link>{" "}
          <span className="path-text-span">Add New Product</span>
          <div className="page-title">Add New Product</div>
        </div>
      </div>

      <div className="main-div p-2 p-md-3 p-lg-4 w-100">
        <div className="pb-4">
          <VariantInput
            formDataArray={formDataArray}
            setFormDataArray={setFormDataArray}
            formData={formData}
            setFormData={setFormData}
            vGroupData={vGroupData}
          ></VariantInput>
        </div>
        <h4 className="fs-18-600">Product Info</h4>
        <div className="form-section">
          <form onSubmit={handleFormSubmit} action="" className="simple-input2">
            <div className="row gy-4 gx-5">
              <div className="col-12 col-md-6">
                <div className={`form-group ${error.name ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Name</div>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder={error.name ? error.name[0] : "Product name"}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={`form-group ${error.quantity ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Quantity</div>
                  <input
                    type="text"
                    name="quantity"
                    className="form-control"
                    placeholder={
                      error.quantity ? error.quantity[0] : "Product quantity"
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className={`form-group ${error.cost ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Product cost</div>
                  <input
                    type="number"
                    name="cost"
                    className="form-control"
                    placeholder={error.cost ? error.cost[0] : "Product cost"}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={`form-group ${error.price ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Product price</div>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder={error.price ? error.price[0] : "Product price"}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
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
                        <div className="imageInput">
                          {selectedFiles.length > 0 ? (
                            selectedFiles.map((file, index) => (
                              <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                alt={`Selected ${index}`}
                              />
                            ))
                          ) : (
                            <p className="m-auto fs-6">
                              Drag and drop images here or{" "}
                              <span className="btn text-color-263238 border p-1">
                                Browse
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>

              {/* thumbnail */}
              <div className="col-12  col-md-6 ">
                <div className="d-flex ">
                  <div className="fs-12-600 mb-2">Upload thumbnail</div>
                  <div className="fs-11-400  text-danger ms-2 ">
                    {error.image ? error.image[0] : ""}
                  </div>
                </div>
                <div className="imageUpload">
                  <Dropzone onDrop={handleFileSelectth}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <div className="imageInput">
                          {selectedFilesth.length > 0 ? (
                            selectedFilesth.map((file, index) => (
                              <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                alt={`Selected ${index}`}
                              />
                            ))
                          ) : (
                            <p className="m-auto fs-6">
                              Drag and drop images here or{" "}
                              <span className="btn text-color-263238 border p-1">
                                Browse
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={`form-group ${error.unit_name ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Product Unit Name</div>
                  <input
                    type="text"
                    name="unit_name"
                    className="form-control"
                    placeholder={
                      error.unit_name ? error.unit_name[0] : "Product unit_name"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div
                  className={`form-group ${error.unit_value ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">Product Unit Value</div>
                  <input
                    type="number"
                    name="unit_value"
                    className="form-control"
                    placeholder={
                      error.unit_value
                        ? error.unit_value[0]
                        : "Product unit_value"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={`form-group ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Brand</div>
                  <Form.Select as="select" name="brand">
                    {brand.data.results.map((item) => (
                      <option key={item.id} value={parseInt(item.id)}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={`form-group ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Category</div>
                  <Form.Select as="select" name="category">
                    {category?.data?.results.map((item) => (
                      <option key={item.id} value={parseInt(item.id)}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Is Featured</div>
                  <Form.Select as="select" name="is_featured">
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </Form.Select>
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Had Variant</div>
                  <Form.Select as="select" name="has_variant">
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </Form.Select>
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Has Promotion</div>
                  <Form.Select as="select" name="has_promotion">
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </Form.Select>
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Has Offer</div>
                  <Form.Select as="select" name="has_offer">
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </Form.Select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div
                  className={`form-group ${
                    error.promotional_price ? "error" : ""
                  }`}
                >
                  <div className="fs-12-600 mb-2">Promotional Price</div>
                  <input
                    type="number"
                    name="promotional_price"
                    className="form-control"
                    placeholder={
                      error.promotional_price
                        ? error.promotional_price[0]
                        : "Product promotional price"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div
                  className={`form-group ${error.offer_percent ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">Offer Percent</div>
                  <input
                    type="number"
                    name="offer_percent"
                    className="form-control"
                    placeholder={
                      error.offer_percent
                        ? error.offer_percent[0]
                        : "Product offer_percent"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div
                  className={`form-group ${
                    error.promotions_start_date ? "error" : ""
                  }`}
                >
                  <div className="fs-12-600 mb-2">Promotions Start Date</div>
                  <input
                    type="date"
                    name="promotions_start_date"
                    className="form-control"
                    placeholder={
                      error.promotions_start_date
                        ? error.promotions_start_date[0]
                        : "promotions_start_date"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div
                  className={`form-group ${
                    error.promotions_expiry_date ? "error" : ""
                  }`}
                >
                  <div className="fs-12-600 mb-2">Promotions Expiry Date</div>
                  <input
                    type="date"
                    name="promotions_expiry_date"
                    className="form-control"
                    placeholder={
                      error.promotions_expiry_date
                        ? error.promotions_expiry_date[0]
                        : "promotions_expiry_date"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div
                  className={`form-group ${
                    error.product_specification ? "error" : ""
                  }`}
                >
                  <div className="fs-12-600 mb-2">Product Specification</div>
                  <textarea
                    type="text"
                    name="product_specification"
                    className="form-control"
                    placeholder={
                      error.product_specification
                        ? error.product_specification[0]
                        : "Product Specification"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div
                  className={`form-group ${error.description ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">Product description</div>
                  <textarea
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder={
                      error.description
                        ? error.description[0]
                        : "Product Specification"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Stock Status</div>
                  <Form.Select as="select" name="stock_status">
                    <option value={0}>In Stock</option>
                    <option value={1}>Out of Stock</option>
                    <option value={2}>Coming Soon</option>
                  </Form.Select>
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Is Active</div>
                  <Form.Select as="select" name="is_active">
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </Form.Select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={`form-group ${error.sku ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">SKU</div>
                  <input
                    type="text"
                    name="sku"
                    className="form-control"
                    placeholder={error.sku ? error.sku[0] : "Product sku"}
                  />
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

export default AddProduct;
