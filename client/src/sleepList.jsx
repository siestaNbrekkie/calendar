import React from 'react';
import cx from 'classnames';
import SleepInfo from './SleepInfo.jsx';
import styles from '../styles/sleepInfo.css';

function SleepList(props) {
  // if less than 3 bedrooms, creates empty divs for spacing purposes
  if (props.rooms.length < 3) {
    var emptyDivs = [];
    for (let i = 0; i < 3 - props.rooms.length; i++) {
      emptyDivs.push(<div className={styles.lessThanThree} />);
    }
  }

  // only render 3 rooms
  const bedRooms = props.rooms.map((room, i) => {
    return <SleepInfo key={i} room={room} index={i} sleepView={props.sleepView} />;
  });

  return (
    <div className={styles.sleepInfo}>
      {props.sleepView > 0 ? (
        <button
          className={cx(styles.scroll, styles.left)}
          onClick={() => props.handleSleepClick(-1)}
        >
          {'<'}
        </button>
      ) : null}
      <div
        className={styles.sleepInfoWrapper}
        style={{
          transform: `translateX(-${props.sleepView * (100 / 3)}%)`
        }}
      >
        {bedRooms}
        {emptyDivs}
      </div>
      {props.sleepView + 2 < props.rooms.length - 1 ? (
        <button
          className={cx(styles.scroll, styles.right)}
          onClick={() => props.handleSleepClick(1)}
        >
          {'>'}
        </button>
      ) : null}
    </div>
  );
}

export default SleepList;
