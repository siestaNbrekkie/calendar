import React from 'react';
import cx from 'classnames';
import styles from '../styles/calendar.css';

const moment = require('moment');

function Day(props) {
  let minDays;
  if (props.selectedFirstDate) {
    minDays =
      props.dateRestrictions[
        moment(props.selectedFirstDate)
          .format('dddd')
          .toLowerCase()
          .concat('_min')
      ];
  }
  return (
    <td
      key={props.day}
      className={determineClassName(
        props.day,
        props.bookedDates,
        props.selectedFirstDate,
        props.selectedSecDate,
        props.hoveredDate,
        props.dateRestrictions
      )}
      onClick={
        hasClick(
          props.day,
          props.bookedDates,
          props.selectedFirstDate,
          props.selectedSecDate,
          props.hoveredDate,
          props.dateRestrictions,
          minDays
        )
          ? () => props.handleDateClick(props.day)
          : null
      }
      onMouseEnter={
        hasMouseEnter(
          props.day,
          props.selectedFirstDate,
          props.selectedSecDate,
          props.hoveredDate,
          props.dateRestrictions,
          minDays
        )
          ? () => props.handleHover(props.day)
          : null
      }
    >
      {displayValue(props.day)}
      {displayMinDays(props.day, props.selectedFirstDate, props.selectedSecDate, minDays) ? (
        <div className={cx(styles.td, styles.minNight)}>{`${minDays} night minimum stay`}</div>
      ) : null}
    </td>
  );
}

function determineClassName(day, bookedDates, checkIn, checkOut, hoveredDate, dateRestrictions) {
  // not a valid day
  if (!day) {
    return cx(styles.td, styles.invalidDate);
  }
  // day before current date
  if (moment(day).isBefore(moment(), 'day')) {
    return cx(styles.td, styles.unavailable);
  }

  // day is a Booked Date
  if (bookedDates.has(day)) {
    return cx(styles.td, styles.unavailable);
  }

  // checkIn is selected and is current day
  if (moment(day).isSame(checkIn)) {
    return cx(styles.td, styles.selected);
  }

  // checkIn and checkOut is selected
  if (checkIn && checkOut) {
    if (moment(day).isBetween(checkIn, checkOut, null, [])) {
      return cx(styles.td, styles.selected);
    }
    return cx(styles.td, styles.available);
  }

  // checkIn is selected, and hover is active
  if (checkIn && hoveredDate) {
    var totalDays = moment(checkIn).diff(day, 'days');
    if (moment(day).isBetween(checkIn, hoveredDate, null, [])) {
      return cx(styles.td, styles.hoverMinDays);
    }
    if (totalDays < dateRestrictions.max_days * -1) {
      return cx(styles.td, styles.unavailable);
    }
    if (totalDays > 0) {
      return cx(styles.td, styles.unavailable);
    }
    return cx(styles.td, styles.available);
  }

  // checkIn is selected, no hover
  if (checkIn && !checkOut) {
    var totalDays = moment(checkIn).diff(day, 'days');
    const minDays =
      dateRestrictions[
        moment(checkIn)
          .format('dddd')
          .toLowerCase()
          .concat('_min')
      ];
    if (totalDays > 0) {
      return cx(styles.td, styles.unavailable);
    }
    if (totalDays < dateRestrictions.max_days * -1) {
      return cx(styles.td, styles.unavailable);
    }
    if (totalDays <= 0 && totalDays >= minDays * -1) {
      return cx(styles.td, styles.hoverMinDays);
    }
    return cx(styles.td, styles.selectedAvailable);
  }

  // default to available style

  return cx(styles.td, styles.available);
}

function hasClick(day, bookedDates, checkIn, checkOut, hoveredDate, dateRestrictions, minDays) {
  let maxDate;
  let minDay;
  if (dateRestrictions.max_days) {
    maxDate = moment(checkIn).add(dateRestrictions.max_days, 'days');
  }
  if (checkIn) {
    minDay = moment(checkIn).add(minDays, 'd');
  }

  // all dates between checkIn and maximum stay have clicks
  if ((checkIn && !checkOut) || (checkIn && hoveredDate)) {
    if (
      moment(day).isBetween(checkIn, maxDate, null, []) &&
      !moment(day).isBetween(checkIn, minDay)
    ) {
      return true;
    }
    // in in a checkIn or hover state, but not between dates, no click
    return false;
  }

  // no selection state - days with no booked conflicts are have click
  if (day || !bookedDates.has(day) || !moment(day).isSame(checkIn)) {
    return true;
  }

  return false;
}

function hasMouseEnter(day, checkIn, checkOut, hoveredDate, dateRestrictions, minDays) {
  let maxDate;
  let minDay;

  if (dateRestrictions.max_days) {
    maxDate = moment(checkIn).add(dateRestrictions.max_days, 'days');
  }

  if (checkIn) {
    minDay = moment(checkIn).add(minDays, 'd');
  }

  // all dates between checkIn and maximum stay have hover
  if ((checkIn && !checkOut) || (checkIn && hoveredDate)) {
    if (
      moment(day).isBetween(checkIn, maxDate, null, []) &&
      !moment(day).isBetween(checkIn, minDay)
    ) {
      return true;
    }
    // in in a checkIn or hover state, but not between dates, no hover
    return false;
  }
  return false;
}

function displayValue(day) {
  if (!day) {
    return '';
  }
  return moment(day).date();
}

function displayMinDays(day, checkIn, checkOut, minDays) {
  // checkIn is selected and is current day
  if (moment(day).isSame(checkIn) && checkIn && !checkOut && minDays > 0) {
    return true;
  }

  return false;
}

export default Day;
