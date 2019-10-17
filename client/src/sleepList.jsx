import React from 'react';
import SleepInfo from './SleepInfo.jsx';
import styles from '../styles/sleepInfo.css';

function SleepList(props) {
  //if less than 3 bedrooms, creates empty divs for spacing purposes
  if (props.rooms.length < 3) {
    var emptyDivs = [];
    for (var i = 0; i < 3 - props.rooms.length; i++) {
      emptyDivs.push(<div className={styles.lessThanThree}></div>);
    }
  }

  //only render 3 rooms
  var bedRooms = props.rooms.map((room, i) => {
    return <SleepInfo room={room} index={i} sleepView={props.sleepView} />;
  });

  return (
    <div className={styles.sleepInfo}>
      {props.sleepView > 0 ? (
        <button className={styles.scrollLeft} onClick={() => props.handleSleepClick(-1)}>
          {'<'}
        </button>
      ) : null}
      {bedRooms}
      {emptyDivs}
      {props.sleepView + 2 < props.rooms.length - 1 ? (
        <button className={styles.scrollRight} onClick={() => props.handleSleepClick(1)}>
          {'>'}
        </button>
      ) : null}
    </div>
  );
}

export default SleepList;
