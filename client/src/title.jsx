import React from 'react';
import cx from 'classnames';
import SleepInfo from './SleepInfo.jsx';
import styles from '../styles/title.css';

function Title(props) {
  return (
    <div>
      <div className={styles.name}>
        {props.name
          .charAt(0)
          .toUpperCase()
          .concat(props.name.slice(1))}
      </div>
      <div className={styles.city}>{props.city}</div>
      <div className={styles.bedrooms}>{`${props.bedroomCount} Bedrooms`}</div>
    </div>
  );
}

export default Title;
