// src/App.js

import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import ControlPanel from './ControlPanel';
import './Style.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');
  
  useEffect(() => {
    const savedGrouping = localStorage.getItem('grouping');
    const savedSorting = localStorage.getItem('sorting');
    
    if (savedGrouping) setGrouping(savedGrouping);
    if (savedSorting) setSorting(savedSorting);
    
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        console.log('API Data:', data);
        setTickets(data.tickets || []); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleGroupingChange = (group) => {
    setGrouping(group);
    localStorage.setItem('grouping', group);
  };

  const handleSortingChange = (sort) => {
    setSorting(sort);
    localStorage.setItem('sorting', sort);
  };

  return (
    <div>
      <ControlPanel 
        onGroupingChange={handleGroupingChange} 
        onSortingChange={handleSortingChange} 
      />
      <KanbanBoard tickets={tickets} grouping={grouping} sorting={sorting} />
    </div>
  );
};

export default App;
