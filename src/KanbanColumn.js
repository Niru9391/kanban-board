// src/KanbanColumn.js

import React from 'react';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ title, tickets }) => (
  <div className="kanban-column">
    <h3>{title}</h3>
    <div className="kanban-cards">
      {tickets.map(ticket => (
        <KanbanCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  </div>
);

export default KanbanColumn;
