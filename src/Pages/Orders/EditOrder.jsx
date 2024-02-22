import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const EditOrder = () => {
  const { viewOrder } = useContext(AuthContext);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams(); // Destructure id directly
  const navigate = useNavigate();

  useEffect(() => {
    // Check if id exists before fetching data
    if (!id) {
      return;
    }
    // Fetch order data
    viewOrder(id)
      .then((response) => {
        setOrderData(response.data.data);
        // Handle the response or do something with the data
      })
      .catch((error) => {
        setError("Error getting data"); // Set error state
        console.error("Error getting data:", error);
        // Handle the error (e.g., show a message to the user)
      });
  }, [id, viewOrder]); // Include viewOrder in dependency array

  if (!orderData) {
    return;
  }

  console.log("edit order data ", orderData);

  const cancelOrderSubmit = (id) => {
    alert("cancel order api missing");
  };

  const statusChangeSubmit = (id) => {
    alert(id);
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
      <div className="row mt-4">
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
            <div className="p-3 d-flex align-items-center justify-content-between">
              <div className="fs-18-600">Product List</div>
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
        <div className="col-lg-3">
          <div className="card p-4 border-0 shadow">
            <div className="fs-18-600 "> Customer Information</div>
            <div className="fs-16-600 mt-2 mb-1">{orderData.customer_name}</div>
            <div className="fs-16">{orderData.customer_mobile}</div>
            <div className="fs-16">{orderData.customer_email}</div>
          </div>
          <div className="card p-4 border-0 shadow mt-3">
            <div className="fs-18-600 "> Shipping Address</div>
            <div className="fs-16-600 mt-2 mb-1">{orderData.customer_name}</div>
            <div className="fs-16">{orderData.customer_mobile}</div>
            <div className="fs-16">{orderData.customer_email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
