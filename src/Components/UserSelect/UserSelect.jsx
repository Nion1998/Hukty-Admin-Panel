import React, { useState, useEffect } from "react";
import Select from "react-select";

const UserSelect = ({ userData, onChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (userData) {
      const userOptions = Object.entries(userData).map(([key, user]) => ({
        value: user.id,
        label: `${user.first_name} ${user.last_name}`,
      }));
      setOptions(userOptions);
    }
  }, [userData]);

  const handleUserSelect = (selectedOption) => {
    onChange(selectedOption.map((option) => option.value));
  };

  return (
    <div className="col-12 col-md-6">
      <div className="form-group multi">
        <label htmlFor="userIds" className="fs-12-600 mb-2">
          Select User IDs:
        </label>
        <Select options={options} isMulti onChange={handleUserSelect} />
      </div>
    </div>
  );
};

export default UserSelect;
