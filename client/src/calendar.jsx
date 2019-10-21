import React from 'react';
import Week from './week.jsx';
import styles from '../styles/calendar.css';
import monthData from '../helpers/calendarCreater.js';

const path = require('path');
const moment = require('moment');

function Calendar(props) {
  const datesInMonth = monthData(props.month);

  const weeks = datesInMonth.map((days, index) => (
    <Week
      key={index}
      days={days}
      weekNum={index}
      bookedDates={props.bookedDates}
      handleDateClick={props.handleDateClick}
      dateRestrictions={props.dateRestrictions}
      selectedFirstDate={props.selectedFirstDate}
      selectedSecDate={props.selectedSecDate}
      handleHover={props.handleHover}
      hoveredDate={props.hoveredDate}
    />
  ));

  return (
    <div>
      <div className={styles.month}>
        {props.backButton ? (
          <button className={styles.button} onClick={props.handleBackClick}>
            <svg width="19" height="19" viewBox="0 0 1000 1000">
              <path
                d="M 336 275 L 126 485 h 806 c 13 0 23 10 23 23 s -10 23 -23 23 H 126 l 210 210 c 11 11 11 21 0 32 c -5 5 -10 7 -16 7 s -11 -2 -16 -7 L 55 524 c -11 -11 -11 -21 0 -32 l 249 -249 c 21 -22 53 10 32 32 Z"
                fill="#8C8C8C"
              />
            </svg>
          </button>
        ) : (
          <div className={(styles.month, styles.invisible)} />
        )}
        <div className={(styles.month, styles.center)}>
          {props.month
            .format('MMMM')
            .concat(' ')
            .concat(props.month.format('YYYY'))}
        </div>
        {props.fwdButton ? (
          <button className={styles.button} onClick={props.handleFwdClick}>
            <svg width="19" height="19" viewBox="0 0 1000 1000">
              <path
                d="M694 242l249 250c12 11 12 21 1 32L694 773c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210-210H68c-13 0-23-10-23-23s10-23 23-23h806L662 275c-21-22 11-54 32-33z"
                fill="#8C8C8C"
              />
            </svg>
          </button>
        ) : (
          <div className={(styles.month, styles.invisible)} />
        )}
      </div>
      <table key="calendar" className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Su</th>
            <th className={styles.th}>Mo</th>
            <th className={styles.th}>Tu</th>
            <th className={styles.th}>We</th>
            <th className={styles.th}>Th</th>
            <th className={styles.th}>Fr</th>
            <th className={styles.th}>Sa</th>
          </tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
    </div>
  );
}

export default Calendar;
