import React, { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/UserContext";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";

const VariantGroupList = () => {
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
    navigate(`edit-variant-group/${id}`);
  };

  // search filter
  const filteredCategories = groupData.data.results.filter((data) =>
    data.group_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // Pagination Logic
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentCategories = filteredCategories.slice(
    firstPostIndex,
    lastPostIndex
  );

  console.log(filteredCategories);

  return (
    <div className=" container-fluid px-lg-3 ">
      {/* Header div */}
      <div className="mb-2  d-lg-flex justify-content-between align-items-center">
        <div className="">
          <Link to={"/admin"} className="path-text ">
            Dashboard /
          </Link>{" "}
          <span className="path-text-span">Variant-Group</span>
          <div className="page-title">Variant Group List</div>
        </div>
      </div>
      {/* Table div */}
      <div className="main-div w-100">
        <div className=" d-md-flex  justify-content-between px-2">
          <div className="table-search ">
            <input
              type="text"
              className="form-control"
              placeholder="Start typing to search "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center pb-2">
            <Link
              to={"add-variant-group"}
              type="submit"
              className="Submit_button  w-100 text-center mt-1 mt-lg-2 mt-lg-0 fs-16-600 px-3 pt-2"
            >
              Add New Group
            </Link>
          </div>
        </div>

        <div className="overflow-table">
          <table className="custom-table ">
            <tbody>
              {/* table header */}
              <tr className="blank_row  fs-16-600">
                <td>Id</td>
                <td>Group Name</td>
                <td>Is Active</td>
                <td>Action</td>
              </tr>

              {/* table data show  */}
              {currentCategories.map((data, index) => (
                <tr key={index} className="blank_row  ">
                  <td>{data.id}</td>

                  <td>{data.group_name}</td>
                  <td>
                    <button
                      onClick={() =>
                        changeActiveStatus(data.id, data.is_active)
                      }
                      className={data.is_active ? "active" : "inActive"}
                    >
                      {data.is_active ? "Yes" : "No"}
                    </button>
                  </td>
                  <td className="acton-btn">
                    <button onClick={() => submitdataId(data.id)}>
                      <AiFillEye />
                    </button>
                    <button onClick={() => submitdataId(data.id)}>
                      <MdOutlineModeEditOutline></MdOutlineModeEditOutline>
                    </button>
                    <button onClick={() => submitClientID(data.id)}>
                      <MdDeleteOutline></MdDeleteOutline>
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
          totalPosts={filteredCategories.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default VariantGroupList;
