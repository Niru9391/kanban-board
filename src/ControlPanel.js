///ControlPanel.js

import React from 'react';

const ControlPanel = ({ onGroupingChange, onSortingChange }) => (
  <div className="control-panel">
    <label htmlFor="grouping-select">Group by:</label>
    <select id="grouping-select" onChange={(e) => onGroupingChange(e.target.value)}>
      <option value="status">Status</option>
      <option value="user">User</option>
      <option value="priority">Priority</option>
    </select>
    
    <label htmlFor="sorting-select">Sort by:</label>
    <select id="sorting-select" onChange={(e) => onSortingChange(e.target.value)}>
      <option value="priority">Priority</option>
      <option value="title">Title</option>
    </select>
  </div>
);

export default ControlPanel;
