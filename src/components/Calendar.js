import React, { useState, useEffect } from 'react';
import { Agenda } from 'modern-react-agenda';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the API
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div>
      <h1>Sports Events Calendar</h1>
      <Agenda events={events} />
    </div>
  );
};

export default Calendar;