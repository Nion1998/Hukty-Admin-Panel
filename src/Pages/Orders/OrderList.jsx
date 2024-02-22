import React, { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/UserContext";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";

const OrderList = () => {
  const { deleteVariantGroup, changeActionStatusVariantGroup } =
    useContext(AuthContext);
  const groupData = useLoaderData();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  console.log(groupData.data.results);
  // Function to delete a client
  const submitClientID = (id) => {
    deleteVariantGroup(id)
      .then((response) => {
        navigate("/admin/variant-group");
        // toast.success("Brand delete successful");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        // toast.error("Brand delete unsuccessful");
        // Handle the error
      });
  };

  // change Active Status
  const changeActiveStatus = (id, is_active) => {
    if (is_active === true) {
      is_active = false;
    } else {
      is_active = true;
    }

    console.log(is_active);

    changeActionStatusVariantGroup(id, is_active)
      .then((response) => {
        // toast.success("Change status");
        navigate("/admin/variant-group");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        // toast.error("Change status error");
      });
  };

  const submitdataId = (id) => {
    navigate(`edit-order/${id}`);
  };

  // search filter
  const filteredOrders = groupData.data.results.filter((data) =>
    data.invoice_no.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // Pagination Logic
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentCategories = filteredOrders.slice(firstPostIndex, lastPostIndex);

  console.log(filteredOrders);

  return (
    <div className=" container-fluid px-lg-3 ">
      {/* Header div */}
      <div className="mb-2  d-lg-flex justify-content-between align-items-center">
        <div className="">
          <Link to={"/admin"} className="path-text ">
            Dashboard /
          </Link>{" "}
          <span className="path-text-span">Order List</span>
          <div className="page-title">Order List</div>
        </div>
      </div>
      {/* Table div */}
      <div className="main-div w-100">
        <div className=" d-md-flex  justify-content-between px-2">
          <div className="table-search ">
            <input
              type="text"
              className="form-control"
              placeholder="Start typing to search for categories"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-table">
          <table className="custom-table ">
            <tbody>
              {/* table header */}
              <tr className="blank_row  fs-16-600">
                <td>Id</td>
                <td>Invoice</td>
                <td>Customer Name</td>
                <td>Customer Mobile</td>
                <td>Order Total</td>
                <td>Order stage</td>
                <td>Action</td>
              </tr>

              {/* table data show  */}
              {currentCategories.map((data, index) => (
                <tr key={index} className="blank_row  ">
                  <td>{data.id}</td>
                  <td>{data.invoice_no}</td>
                  <td>{data.customer_name}</td>
                  <td>{data.customer_mobile}</td>
                  <td>{data.total} tk</td>
                  <td>
                    {data.order_stage === 0 ? (
                      <span style={{ color: "blue" }}>Order Placed</span>
                    ) : data.order_stage === 1 ? (
                      <span style={{ color: "green" }}>Request Sent</span>
                    ) : data.order_stage === 2 ? (
                      <span style={{ color: "orange" }}>
                        Deliveryman Assigned
                      </span>
                    ) : data.order_stage === 3 ? (
                      <span style={{ color: "red" }}>Delivered</span>
                    ) : null}
                  </td>

                  <td className="acton-btn">
                    <button onClick={() => submitdataId(data.id)}>
                      <MdOutlineModeEditOutline></MdOutlineModeEditOutline>
                    </button>
                  </td>
                </tr>
              ))}

              {/* blank row print */}

              {[...Array(10 - currentCategories.length)].map((_, index) => (
                <tr key={index} className="blank_row">
                  <td colSpan="3"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4">
        {/* Pagination Component */}
        <Pagination
          totalPosts={filteredOrders.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default OrderList;
