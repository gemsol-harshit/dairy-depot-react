// src/components/TopBar.jsx

import React from "react";
import PropTypes from "prop-types";

const TopBar = ({ onSearch, onAddAgent, radioValue, onRadioChange }) => {
  return (
    <div className="top-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <button onClick={onAddAgent}>Add Agent</button>
      {/* Radio buttons here */}
    </div>
  );
};

TopBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onAddAgent: PropTypes.func.isRequired,
  radioValue: PropTypes.string.isRequired,
  onRadioChange: PropTypes.func.isRequired,
};

export default TopBar;
