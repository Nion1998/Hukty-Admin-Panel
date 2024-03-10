import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/UserContext";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const EditOrder = () => {
  const { viewOrder, viewAddress, AssignCourier } = useContext(AuthContext);
  const [orderData, setOrderData] = useState(null);
  const [addressData, setAddress] = useState(null);
  const [courierAssign, setCourierAssign] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams(); // Destructure id directly
  const navigate = useNavigate();
  const courierData = useLoaderData();

  const orderId = id;

  useEffect(() => {
    // Fetch order data
    if (id) {
      viewOrder(id)
        .then((response) => {
          setOrderData(response.data.data);
          setCourierAssign(response.data.data.order_status);
        })
        .catch((error) => {
          setError("Error getting order data");
          console.error("Error getting order data:", error);
        });
    }
  }, [id, viewOrder]);

  // Fetch address data only when orderData is available
  useEffect(() => {
    if (orderData) {
      viewAddress(orderData.shipping_address)
        .then((response) => {
          setAddress(response.data.data);
        })
        .catch((error) => {
          setError("Error getting address data");
          console.error("Error getting address data:", error);
        });
    }
  }, [orderData, viewAddress]);

  if (!orderData) {
    return;
  }

  if (!addressData) {
    return;
  }
  if (!courierData) {
    return;
  }
  console.log("courierData", courierData);

  console.log("Address", addressData);

  console.log("edit order data ", orderData);

  const cancelOrderSubmit = (id) => {
    alert("cancel order api missing");
  };

  const statusChangeSubmit = (id) => {
    alert(id);
  };
  const AssignCourierSubmit = (courier_id) => {
    AssignCourier(courier_id, orderId)
      .then((rsp) => {
        // toast.success("Update successful.");

        setCourierAssign(3);
      })
      .catch((er) => {
        alert(er.response.data.message);
        console.error("Update error:", er);
        // toast.error("Update Unsuccessful");
      });
  };

  return (
    <div className=" container-fluid py-2">
      {/* Header div */}
      <div className="mb-2 pb-2 d-lg-flex justify-content-between align-items-center">
        <div className="">
          <Link to={"/admin"} className="path-text ">
            Dashboard /
          </Link>{" "}
          <Link to={"/admin/orders"} className="path-text ">
            Orders /
          </Link>{" "}
          <span className="path-text-span">Order </span>
          <div className="page-title">{orderData.invoice_no}</div>
        </div>
        {orderData.has_cancel_request && (
          <div className="d-md-flex align-items-center ">
            <button
              type="submit"
              onClick={() => cancelOrderSubmit(orderData.id)}
              className={"Submit_button px-3  my-2 me-md-3"}
            >
              {" "}
              Accept Cancel Request
            </button>

            <button
              type="submit"
              onClick={() => cancelOrderSubmit(orderData.id)}
              className={"Submit_button px-3  "}
            >
              {" "}
              Reject Cancel Request
            </button>
          </div>
        )}
      </div>
      {/* Order info */}
      <div className="row mt-4 g-3">
        <div className="col-lg-9">
          <div className="card mb-3 shadow border-0 ">
            <div className=" p-3  d-flex  align-items-center justify-content-between">
              <div className="fs-16-600 ">{orderData.invoice_no}</div>
              <div className="fs-14-400 ms-5">
                {new Date(orderData.created_at).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
                {"   |  "}
                Items: {orderData.order_items.length}
                {"   |   "}
                Total: {orderData.total} tk
              </div>
            </div>
          </div>
          <div className="card shadow border-0 ">
            <div className="p-3 d-inline d-md-flex align-items-center justify-content-between">
              <div className="fs-18-600">Product List</div>
              <div className="d-flex">
                <div>
                  {courierAssign === 0 ? (
                    <Dropdown className="me-2">
                      <Dropdown.Toggle
                        className=" bg-light text-dark dark d-flex align-items-center z-10 text-start "
                        variant="success"
                        id="dropdown-basic"
                      >
                        <div className="fs-14-400 me-2">Courier</div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="fs-14-400">
                        {courierData.data.results.map((data, index) => (
                          <Dropdown.Item
                            onClick={() => AssignCourierSubmit(data.id)}
                          >
                            {data.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <h5 className="p-2 fs-16-600 me-2 text-light bg-primary">
                      Courier Assigned
                    </h5>
                  )}
                </div>

                <Dropdown>
                  <Dropdown.Toggle
                    className=" bg-light text-dark dark d-flex align-items-center z-10 text-start "
                    variant="success"
                    id="dropdown-basic"
                  >
                    <div className="fs-14-400 me-2">
                      {" "}
                      {orderData.order_status === 0 ? (
                        <span>Pending</span>
                      ) : orderData.order_status === 1 ? (
                        <span>Processing</span>
                      ) : orderData.order_status === 2 ? (
                        <span>Shipped</span>
                      ) : orderData.order_status === 3 ? (
                        <span>Out of delivery</span>
                      ) : orderData.order_status === 4 ? (
                        <span>Delivered</span>
                      ) : orderData.order_status === 5 ? (
                        <span>Canceled</span>
                      ) : orderData.order_status === 6 ? (
                        <span>Refunded</span>
                      ) : null}
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="fs-14-400">
                    <Dropdown.Item onClick={() => statusChangeSubmit(0)}>
                      Pending
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => statusChangeSubmit(1)}>
                      Processing
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => statusChangeSubmit(2)}>
                      Shipped
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => statusChangeSubmit(3)}>
                      Out of delivery
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => statusChangeSubmit(4)}>
                      Delivered
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => statusChangeSubmit(5)}>
                      Canceled
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => statusChangeSubmit(6)}>
                      Refunded
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {/* table data show  */}
            <div className="overflow-table">
              <table className="custom-table ">
                <tbody>
                  {/* table header */}
                  <tr className="blank_row  fs-16-600">
                    <td>Id</td>
                    <td>Image</td>
                    <td>Product Name </td>
                    <td>Quantity</td>
                    <td>Total </td>
                  </tr>

                  {/* table data show  */}
                  {orderData.order_items.map((data, index) => (
                    <tr key={index} className="blank_row  ">
                      <td>{index + 1}</td>
                      <td>
                        <div className="table-img m-auto">
                          <img
                            src={data.image_url}
                            alt=""
                            className="img-fluid p-1 rounded"
                          />
                        </div>
                      </td>
                      <td>{data.product_name}</td>
                      <td>{data.quantity}</td>
                      <td>{data.price} tk</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card shadow border-0 p-4 mt-3">
            <h4 className="fs-18-600">Customer Note</h4>
            <p className="fs-14-400"> {orderData.customer_note}</p>
          </div>
        </div>
        <div className="col-lg-3 ">
          <div className="card p-4 border-0 shadow">
            <div className="fs-18-600 "> Customer Information</div>
            <div className="fs-16-600 mt-2 mb-1">{orderData.customer_name}</div>
            <div className="fs-16">{orderData.customer_mobile}</div>
            <div className="fs-16">{orderData.customer_email}</div>
          </div>
          <div className="card p-4 border-0 shadow mt-3">
            <div className="fs-18-600 "> Shipping Address</div>
            <div className="fs-16-600 mt-2 mb-1">
              {" "}
              {addressData.address_type === 0
                ? "Home"
                : addressData.address_type === 1
                ? "Office"
                : "Other"}
            </div>
            <div className="fs-14">{addressData.address}</div>
            <div className="fs-14">
              Zip code: {addressData.zip_code} , Road: {addressData.road} ,
              Flat:
              {addressData.flat}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
