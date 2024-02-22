// VariantInput.js
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Form } from "react-bootstrap";

const VariantInput = ({
  formDataArray,
  setFormDataArray,
  formData,
  setFormData,
  vGroupData,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormDataArray([...formDataArray, formData]);
    setFormData({
      title: "",
      quantity: "",
      additional_price: "",
      variant_option: "",
    });
  };

  if (!vGroupData) {
    return;
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = (index) => {
    const newArray = [...formDataArray];
    newArray.splice(index, 1);
    setFormDataArray(newArray);
  };

  return (
    <div>
      <h4 className="fs-18-600">Input Variant Info</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="form-group">
              <div className="fs-12-600 mb-2">Title</div>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
              />
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="form-group">
              <div className="fs-12-600 mb-2">Quantity</div>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
              />
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="form-group">
              <div className="fs-12-600 mb-2">Additional Price</div>
              <input
                type="text"
                name="additional_price"
                className="form-control"
                value={formData.additional_price}
                onChange={handleInputChange}
                placeholder="Additional Price"
              />
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="form-group">
              <div className="fs-12-600 mb-2">Variant Option</div>
              <Form.Select
                as="select"
                name="variant_option"
                value={formData.variant_option}
                onChange={handleInputChange}
              >
                {" "}
                <option value="">---</option>
                {vGroupData?.data?.results.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
        </div>

        <div className="form-group d-md-flex my-3">
          <button type="submit" className="Submit_button px-3 ms-auto">
            Add Variant
          </button>
        </div>
      </form>

      <div>
        <div className="overflow-table">
          <table className="custom-table">
            <tbody>
              {/* table header */}
              <tr className="blank_row fs-16-600">
                <td>Id</td>
                <td>Title</td>
                <td>Quantity</td>
                <td>Additional Price</td>
                <td>Variant Option</td>
                <td>Action</td>
              </tr>

              {/* table data show  */}
              {formDataArray.map((data, index) => (
                <tr key={index} className="blank_row">
                  <td>{index + 1}</td>
                  <td>{data.title}</td>
                  <td>{data.quantity}</td>
                  <td>{data.additional_price}</td>
                  <td>{data.variant_option}</td>
                  <td className="acton-btn">
                    <button onClick={() => handleCancel(index)}>
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VariantInput;
