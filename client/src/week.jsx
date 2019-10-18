import React from 'react';
import Day from './day';

function week(props) {
  const {
    days,
    index,
    bookedDates,
    dateRestrictions,
    selectedFirstDate,
    handleHover,
    selectedSecDate,
    handleDateClick,
    hoveredDate
  } = props;

  const dayComponents = days.map(day => (
    <Day
      day={day}
      bookedDates={bookedDates}
      handleDateClick={handleDateClick}
      dateRestrictions={dateRestrictions}
      selectedFirstDate={selectedFirstDate}
      selectedSecDate={selectedSecDate}
      handleHover={handleHover}
      hoveredDate={hoveredDate}
    />
  ));

  return (
    <tr key={index} className="week">
      {dayComponents}
    </tr>
  );
}

export default week;
