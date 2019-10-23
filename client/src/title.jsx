import React from 'react';
import cx from 'classnames';
import SleepInfo from './SleepInfo.jsx';
import styles from '../styles/title.css';

function Title(props) {
  let totalBeds = 0;
  for (let i = 0; i < props.rooms.length; i++) {
    totalBeds += props.rooms[i].numBeds;
  }

  return (
    <div>
      <div className={styles.name}>
        {props.name
          .charAt(0)
          .toUpperCase()
          .concat(props.name.slice(1))}
      </div>
      <div className={styles.city}>{props.city}</div>
      <div className={styles.listingDetail}>
        <div className={styles.bedInfo}>{`${props.bedroomCount} Bedrooms`}</div>
        <div className={styles.bedInfo}>{`${totalBeds} Beds`}</div>
      </div>
    </div>
  );
}

export default Title;
