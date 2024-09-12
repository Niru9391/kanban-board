// src/KanbanCard.js

import React from 'react';

const KanbanCard = ({ ticket }) => (
  <div className="kanban-card">
    
    <h4>{ticket.id}</h4>
    <h4>{ticket.title}</h4>
    <p>Status: {ticket.status}</p>
    <p>Priority: {['No priority', 'Low', 'Medium', 'High', 'Urgent'][ticket.priority]}</p>
  </div>
);

export default KanbanCard;
