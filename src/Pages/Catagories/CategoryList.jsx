import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import Pagination from "../../Components/Pagination/Pagination";
import { AuthContext } from "../../Contexts/UserContext";

const CategoryList = () => {
  const { categoryDelete, changeActionStatusCategory, changeIs_menuStatus } =
    useContext(AuthContext);
  const categoriesData = useLoaderData();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  if (!categoriesData) {
    return;
  }
  // Function to delete a client
  const submitClientID = (id) => {
    categoryDelete(id)
      .then((response) => {
        navigate("/admin/categories");
        toast.success("Delete success ");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Delete unsuccess");
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

    changeActionStatusCategory(id, is_active)
      .then((response) => {
        navigate("/admin/categories");
        toast.success("Change Active Status ");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Change Active Status Error ");
        // Handle the error
      });
  };

  const changeMenuStatus = (id, is_menu) => {
    if (is_menu === true) {
      is_menu = false;
    } else {
      is_menu = true;
    }

    changeIs_menuStatus(id, is_menu)
      .then((response) => {
        navigate("/admin/categories");
        toast.success("Change Active Status ");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Change Active Status Error ");
        // Handle the error
      });
  };

  const submitCategoryId = (id) => {
    navigate(`view-categories/${id}`);
  };

  // search filter
  const filteredCategories = categoriesData.data.results.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination filter

  // Pagination Logic
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentCategories = filteredCategories.slice(
    firstPostIndex,
    lastPostIndex
  );

  return (
    <div className=" container-fluid py-2">
      {/* Header div */}
      <div className="mb-2 pb-2 d-lg-flex justify-content-between align-items-center">
        <div className="">
          <Link to={"/admin"} className="path-text ">
            Dashboard /
          </Link>{" "}
          <span className="path-text-span">Categories</span>
          <div className="page-title">Categories</div>
        </div>
      </div>
      {/* Table div */}
      <div className="main-div   w-100">
        <div className=" d-lg-flex  justify-content-between px-2">
          <div className="table-search ">
            <input
              type="text"
              className="form-control"
              placeholder="Start typing to search for categories"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center pb-2">
            <Link
              to={"add-category"}
              type="submit"
              className="Submit_button  w-100 text-center mt-1 mt-lg-2 mt-lg-0 fs-16-600 px-3 pt-2"
            >
              Add New Category
            </Link>
          </div>
        </div>
        <div className="overflow-table">
          <table className="custom-table">
            <tbody>
              {/* table header */}
              <tr className="blank_row  fs-16-600">
                <td>ID</td>
                <td>Image</td>
                <td>Name</td>
                <td>Is Active</td>
                <td>Action</td>
              </tr>

              {/* table data show  */}
              {currentCategories.map((category, index) => (
                <tr key={index} className="blank_row  ">
                  <td>{category.id}</td>
                  <td className="">
                    <div className="table-img m-auto">
                      <img
                        src={category.logo_url}
                        alt=""
                        className="img-fluid p-1 rounded"
                      />
                    </div>
                  </td>

                  <td>{category.name}</td>

                  <td>
                    <button
                      onClick={() =>
                        changeActiveStatus(category.id, category.is_active)
                      }
                      className={category.is_active ? "active" : "inActive"}
                    >
                      {category.is_active ? "Yes" : "No"}
                    </button>
                  </td>

                  <td className="acton-btn">
                    <button onClick={() => submitCategoryId(category.id)}>
                      <AiFillEye />
                    </button>
                    <button onClick={() => submitCategoryId(category.id)}>
                      <MdOutlineModeEditOutline></MdOutlineModeEditOutline>
                    </button>
                    <button onClick={() => submitClientID(category.id)}>
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

export default CategoryList;
