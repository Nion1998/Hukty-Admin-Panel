import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/UserContext";

const AddFaq = () => {
  const { addFaq } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const question = form.question.value;
    const answer = form.answer.value;
    const position = form.position.value;
    const is_active = form.is_active.value;
    addFaq(question, answer, position, is_active)
      .then((rsp) => {
        // toast.success("Coupon created successfully.");
        navigate("/admin/Faq");
      })
      .catch((error) => {
        setError(error.response.data.errors);
        console.error("Error:", error.response.data);
        toast.error("Coupon creation unsuccessful.");
      });
  };

  return (
    <div className="container-fluid ">
      <div className=" py-3 d-flex justify-content-between align-items-center">
        <div className="">
          <Link to={"/admin"} className="path-text ">
            Dashboard /
          </Link>{" "}
          <Link to={"/admin/faq"} className="path-text ">
            Faq List /
          </Link>{" "}
          <span className="path-text-span">Add Faq</span>
          <div className="page-title">Add Faq</div>
        </div>
      </div>

      <div className="main-div p-2  p-md-3 p-lg-4  w-100">
        <div className="form-section ">
          <form
            onSubmit={handleFormSubmit}
            action=""
            className="simple-input2  "
          >
            <div className="row gy-4 gx-5">
              <div className="col-12 col-md-6">
                <div className={`form-group  ${error.question ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Question</div>
                  <textarea
                    type="text"
                    name="question"
                    className="form-control"
                    placeholder={
                      error.question ? error.question[0] : "name name"
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-md-6  ">
                <div className={`form-group  ${error.answer ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Answer</div>
                  <textarea
                    type="text"
                    name="answer"
                    className="form-control"
                    placeholder={error.answer ? error.answer[0] : "answer"}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6  ">
                <div className={`form-group  ${error.position ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Position</div>
                  <input
                    type="number"
                    name="position"
                    className="form-control"
                    placeholder={
                      error.position ? error.position[0] : "position"
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
            </div>

            <div className="form-group  d-md-flex  mt-3">
              <button type="submit" className={"Submit_button px-3 "}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFaq;
