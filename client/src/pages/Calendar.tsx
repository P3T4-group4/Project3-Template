// client/src/pages/Calendar.tsx

import React, { useState } from 'react';
import '../styles/Calendar.css';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar: React.FC = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = firstDay.getDay();

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(prev => prev - 1);
    } else {
      setMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(prev => prev + 1);
    } else {
      setMonth(prev => prev + 1);
    }
  };

  const cells = [];

  for (let i = 0; i < startDay; i++) {
    cells.push(<div key={`empty-${i}`} className="cell empty" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(
      <div key={day} className={`cell${day === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? ' today' : ''}`}>
        {day}
      </div>
    );
  }

  return (
    <main className="page-wrapper">
      <div className="calendar-container">
        <h1 className="calendar-title">Release Calendar</h1>

        <div className="navigation">
          <button className="nav-button" onClick={handlePrevMonth}>
            ← Previous
          </button>
          <h2 className="calendar-subtitle">
            {firstDay.toLocaleString('default', { month: 'long' })} {year}
          </h2>
          <button className="nav-button" onClick={handleNextMonth}>
            Next →
          </button>
        </div>

        <div className="weekdays">
          {weekdays.map(day => (
            <div key={day} className="header weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="grid">{cells}</div>
      </div>
    </main>
  );
};

export default Calendar;
