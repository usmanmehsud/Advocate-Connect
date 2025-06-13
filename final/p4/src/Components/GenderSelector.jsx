import React from "react";

const GenderSelector = ({ value, onChange }) => (
  <div>
    <label>Gender:</label>
    <select value={value} onChange={onChange}>
      <option value="">Select</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="custom">Custom</option>
    </select>
  </div>
);

export default GenderSelector;
