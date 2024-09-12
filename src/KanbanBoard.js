// src/KanbanBoard.js

import React, { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';
import './Style.css'; // Ensure CSS is imported

const KanbanBoard = ({ grouping, sorting }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const groupTickets = (tickets, grouping) => {
    if (grouping === 'user') {
      return tickets.reduce((acc, ticket) => {
        const user = users.find(user => user.id === ticket.userId);
        const userName = user ? user.name : 'Unassigned';
        if (!acc[userName]) acc[userName] = [];
        acc[userName].push(ticket);
        return acc;
      }, {});
    } else {
      return tickets.reduce((acc, ticket) => {
        const key = ticket[grouping] || 'Uncategorized';
        if (!acc[key]) acc[key] = [];
        acc[key].push(ticket);
        return acc;
      }, {});
    }
  };

  const sortTickets = (groupedTickets, sorting) => {
    for (const group in groupedTickets) {
      groupedTickets[group].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        } else if (sorting === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }
    return groupedTickets;
  };

  const groupedTickets = groupTickets(tickets, grouping);
  const sortedTickets = sortTickets(groupedTickets, sorting);

  return (
    <div className={`kanban-board ${grouping === 'user' ? 'group-by-user' : ''}`}>
      {Object.keys(sortedTickets).map(group => (
        <KanbanColumn key={group} title={group} tickets={sortedTickets[group]} />
      ))}
    </div>
  );
};

export default KanbanBoard;
