import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../Contexts/UserContext";

const EditCoupon = () => {
  const { viewCoupon, editCoupon } = useContext(AuthContext);
  const [couponData, setCouponData] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const userData = useLoaderData();

  // for image upload

  useEffect(() => {
    //wait for category id
    if (!id) {
      return;
    }

    //get Category data
    viewCoupon(parseInt(id))
      .then((response) => {
        setCouponData(response.data.data);
        // Handle the response or do something with the data
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        // Handle the error (e.g., show a message to the user)
      });
  }, []);

  //wait for upload data
  if (!couponData && !userData) {
    return;
  }

  console.log(couponData);

  // form submit   function
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const coupon_title = form.coupon_title.value;
    const coupon_type = form.coupon_type.value;
    const start_date = form.start_date.value;
    const expire_date = form.expire_date.value;
    const discount_type = form.discount_type.value;
    const discount_amount = form.discount_amount.value;
    const minimum_purchase = form.minimum_purchase.value;
    const maximum_discount = form.maximum_discount.value;
    const max_usage = form.max_usage.value;
    const customers = selectedUsers;
    const is_active = form.is_active.value;

    editCoupon(
      id,
      coupon_title,
      coupon_type,
      start_date,
      expire_date,
      discount_type,
      discount_amount,
      minimum_purchase,
      maximum_discount,
      max_usage,
      customers,
      is_active
    )
      .then((rsp) => {
        toast.success("Update successful.");
        navigate("/admin/faq");
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
          <Link to={"/admin/faq"} className="path-text ">
            Coupon list /
          </Link>
          <span className="path-text-span">Coupon Details </span>
          <div className="page-title">Coupon Details</div>
        </div>
      </div>

      <div className="main-div p-3  p-md-4 p-lg-5  w-100">
        <div className="form-section mt-5">
          <form
            onSubmit={handleFormSubmit}
            action=""
            className="simple-input2 "
          >
            <div className="row gy-4 gx-5">
              <div className="col-12 col-md-6">
                <div
                  className={`form-group  ${error.coupon_title ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">Coupon title </div>
                  <input
                    type="text"
                    name="coupon_title"
                    className="form-control"
                    placeholder={
                      error.coupon_title ? error.coupon_title[0] : "Coupon name"
                    }
                    defaultValue={couponData.coupon_title}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Coupon Type</div>
                  <Form.Select
                    as="select"
                    defaultValue={couponData.coupon_type}
                    name="coupon_type"
                  >
                    <option value={0}>Free Delivery</option>
                    <option value={1}>First Order</option>
                    <option value={2}>Discount On Purchase</option>
                  </Form.Select>
                </div>
              </div>

              <div className="col-12 col-md-6  ">
                <div
                  className={`form-group  ${error.start_date ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">Start Date</div>
                  <input
                    type="date"
                    name="start_date"
                    className="form-control"
                    placeholder={
                      error.start_date
                        ? error.start_date[0]
                        : "Coupon group name"
                    }
                    defaultValue={couponData.start_date}
                  />
                </div>
              </div>

              <div className="col-12 col-12 col-md-6 ">
                <div
                  className={`form-group  ${error.expire_date ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">Expire Date</div>
                  <input
                    type="date"
                    name="expire_date"
                    className="form-control"
                    placeholder={
                      error.expire_date
                        ? error.expire_date[0]
                        : "Coupon group name"
                    }
                    defaultValue={couponData.expire_date}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Discount Type</div>
                  <Form.Select
                    as="select"
                    defaultValue={couponData.discount_type}
                    name="discount_type"
                  >
                    <option value={0}>Amount</option>
                    <option value={1}>Percentage</option>
                  </Form.Select>
                </div>
              </div>

              <div className="col-12  col-md-6">
                <div
                  className={`form-group  ${
                    error.discount_amount ? "error" : ""
                  }`}
                >
                  <div className="fs-12-600 mb-2">Discount Amount</div>
                  <input
                    type="number"
                    name="discount_amount"
                    className="form-control"
                    placeholder={
                      error.discount_amount
                        ? error.discount_amount[0]
                        : "Discount Amount"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div
                  className={`form-group  ${
                    error.minimum_purchase ? "error" : ""
                  }`}
                >
                  <div className="fs-12-600 mb-2">Minimum Purchase</div>
                  <input
                    type="number"
                    name="minimum_purchase"
                    className="form-control"
                    placeholder={
                      error.minimum_purchase
                        ? error.minimum_purchase[0]
                        : "Minimum Purchase"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div
                  className={`form-group  ${
                    error.maximum_discount ? "error" : ""
                  }`}
                >
                  <div className="fs-12-600 mb-2">Maximum Discount</div>
                  <input
                    type="number"
                    name="maximum_discount"
                    className="form-control"
                    placeholder={
                      error.maximum_discount
                        ? error.maximum_discount[0]
                        : "Maximum Discount"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div
                  className={`form-group  ${error.max_usage ? "error" : ""}`}
                >
                  <div className="fs-12-600 mb-2">Max Usage</div>
                  <input
                    type="number"
                    name="max_usage"
                    className="form-control"
                    placeholder={
                      error.max_usage ? error.max_usage[0] : "Max Uses"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Is Active</div>
                  <Form.Select as="select" name="is_active">
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Form.Select>
                </div>
              </div>

              {/* <div className="col-12 col-md-6">
                <div className="form-group multi">
                  <label htmlFor="userIds" className="fs-12-600 mb-2">
                    Select User IDs:
                  </label>
                  <select
                    id="userIds"
                    name="userIds"
                    className="form-select"
                    multiple
                    onChange={handleUserSelect}
                    value={selectedUsers}
                  >
                    {userData.data.results.map((user) => (
                      <option className="p-1 m-1" key={user.id} value={user.id}>
                        {user.id} {user.first_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}
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

export default EditCoupon;
