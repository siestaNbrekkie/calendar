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

  var currentViewRooms = props.rooms.slice(props.sleepView, props.sleepView + 3);
  var bedRooms = currentViewRooms.map((room, i) => {
    return <SleepInfo room={room} index={i} />;
  });

  return (
    <div className={styles.sleepInfo}>
      {bedRooms}
      {emptyDivs}
    </div>
  );
}

export default SleepList;
