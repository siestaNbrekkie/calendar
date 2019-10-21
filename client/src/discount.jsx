import React from 'react';
import styles from '../styles/discount.css';

function discount(props) {
  const rate = Math.floor(props.rate * 100);
  const { measure } = props;
  const discountOffer = `This host offers ${rate}% off if you stay for ${measure} days.`;
  return (
    <div>
      <p className={styles.discount}>{discountOffer}</p>
    </div>
  );
}

export default discount;
