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
          <svg width="10px" height="10px" viewBox="0 0 18 18">
            <path
              d="m 13.7 16.29 a 1 1 0 1 1 -1.42 1.41 l -8 -8 a 1 1 0 0 1 0 -1.41 l 8 -8 a 1 1 0 1 1 1.42 1.41 l -7.29 7.29 Z"
              fill="#484848"
            />
          </svg>
        </button>
      ) : null}

      {props.sleepView + 2 < props.rooms.length - 1 ? (
        <button
          className={cx(styles.scroll, styles.right)}
          onClick={() => props.handleSleepClick(1)}
        >
          <svg width="10px" height="10px" viewBox="0 0 18 18">
            <path
              d="m 4.29 1.71 a 1 1 0 1 1 1.42 -1.41 l 8 8 a 1 1 0 0 1 0 1.41 l -8 8 a 1 1 0 1 1 -1.42 -1.41 l 7.29 -7.29 Z"
              fill="#484848"
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
}

export default SleepList;
