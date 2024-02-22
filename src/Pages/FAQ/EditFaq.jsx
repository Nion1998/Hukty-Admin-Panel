import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../Contexts/UserContext";

const EditVariantGroup = () => {
  const { viewFaq, editFaq } = useContext(AuthContext);
  const [faqData, setFaqData] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  // for image upload

  useEffect(() => {
    //wait for category id
    if (!id) {
      return;
    }

    //get Category data
    viewFaq(parseInt(id))
      .then((response) => {
        setFaqData(response.data.data);
        // Handle the response or do something with the data
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        // Handle the error (e.g., show a message to the user)
      });
  }, []);

  //wait for upload data
  if (!faqData) {
    return;
  }

  console.log(faqData);

  // form submit   function
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const question = form.question.value;
    const answer = form.answer.value;
    const position = form.position.value;
    const is_active = form.is_active.value;

    editFaq(id, question, answer, position, is_active)
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
            Faq list /
          </Link>
          <span className="path-text-span">Faq Details </span>
          <div className="page-title">Faq Details</div>
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
                <div className={`form-group  ${error.question ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Question</div>
                  <textarea
                    type="text"
                    name="question"
                    className="form-control"
                    placeholder={
                      error.question ? error.question[0] : "question"
                    }
                    defaultValue={faqData.question}
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
                    defaultValue={faqData.answer}
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
                    defaultValue={faqData.position}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className={`form-group  ${error.id ? "error" : ""}`}>
                  <div className="fs-12-600 mb-2">Is Active</div>
                  <Form.Select
                    as="select"
                    defaultValue={faqData.is_active}
                    name="is_active"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Form.Select>
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

export default EditVariantGroup;
