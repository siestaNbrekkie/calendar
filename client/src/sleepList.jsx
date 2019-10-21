import React from 'react';
import cx from 'classnames';
import SleepInfo from './SleepInfo.jsx';
import styles from '../styles/sleepInfo.css';

function SleepList(props) {
  // if less than 3 bedrooms, creates empty divs for spacing purposes
  const emptyDivs = [];
  if (props.rooms.length < 3) {
    for (let i = 0; i < 3 - props.rooms.length; i++) {
      emptyDivs.push(<div key={'emptyDiv'.concat(String(i))} className={styles.lessThanThree} />);
    }
  }

  // only render 3 rooms
  const bedRooms = props.rooms.map((room, i) => {
    return <SleepInfo key={i} room={room} index={i} sleepView={props.sleepView} />;
  });

  return (
    <div className={styles.slider}>
      <div className={styles.overflowControl}>
        <div
          className={styles.cardWrapper}
          style={{
            transform: `translateX(-${props.sleepView * (100 / 3)}%)`
          }}
        >
          {bedRooms}
          {emptyDivs}
        </div>
      </div>
      {props.sleepView > 0 ? (
        <button
          className={cx(styles.scroll, styles.left)}
          onClick={() => props.handleSleepClick(-1)}
        >
          {'<'}
        </button>
      ) : null}

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

/* style={{
          transform: `translateX(-${props.sleepView * (100 / 3)}%)`
        }} */
export default SleepList;
