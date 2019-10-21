import React from 'react';
import cx from 'classnames';
import styles from '../styles/sleepInfo.css';

function SleepInfo(props) {
  const slideClass = cx(styles.info);

  const bedRoomNum = (props.index + 1).toString();
  const puralBed = props.room.numBeds === 1 ? 'bed' : 'beds';

  return (
    <div className={slideClass} key={props.index}>
      {generateBedImage(props.room.bedType, props.room.numBeds)}
      <p className={styles.roomNum}>{`Bedroom ${bedRoomNum}`}</p>
      <p className={styles.bedInfo}>
        {`${String(props.room.numBeds)} ${props.room.bedType} ${puralBed}`}
      </p>
    </div>
  );
}

function generateBedImage(bedType, numBeds, index) {
  const bedSVG =
    bedType === 'single' ? (
      <svg className={styles.bedImage} viewBox="0 0 24 24" height="24px" width="24px">
        <path d="m 20.99 15.39 l -1.99 -8.45 v -5.44 c 0 -0.83 -0.68 -1.5 -1.5 -1.5 h -10 a 1.5 1.5 0 0 0 -1.5 1.5 v 5.44 l -1.99 8.44 l -0.01 0.12 v 5.01 c 0 0.66 0.43 1.2 1.02 1.4 c -0.01 0.03 -0.02 0.06 -0.02 0.09 v 1.5 a 0.5 0.5 0 0 0 1 0 v -1.5 h 13 v 1.5 a 0.5 0.5 0 0 0 1 0 v -1.5 c 0 -0.03 -0.01 -0.06 -0.02 -0.09 a 1.49 1.49 0 0 0 1.02 -1.4 v -5.01 l -0.01 -0.12 Z m -13.99 -13.89 a 0.5 0.5 0 0 1 0.5 -0.5 h 9.99 c 0.27 0 0.5 0.23 0.5 0.5 v 4.5 h -2 v -2.51 c 0.01 -0.82 -0.66 -1.49 -1.48 -1.49 h -4.02 c -0.82 0 -1.49 0.67 -1.49 1.49 v 2.51 h -2 Z m 8 1.99 v 4.02 a 0.5 0.5 0 0 1 -0.49 0.49 h -4.02 a 0.5 0.5 0 0 1 -0.49 -0.49 v -4.02 c 0 -0.27 0.22 -0.49 0.49 -0.49 h 4.02 c 0.27 0 0.49 0.22 0.49 0.49 Z m -8.01 3.63 l 0.01 -0.12 h 2 v 0.51 c 0 0.82 0.67 1.49 1.49 1.49 h 4.02 c 0.82 0 1.49 -0.67 1.49 -1.49 v -0.51 h 2 l 0.01 0.12 l 1.86 7.88 h -14.74 l 1.86 -7.89 Z m 13.01 13.39 a 0.5 0.5 0 0 1 -0.5 0.49 h -14 c -0.28 0 -0.5 -0.22 -0.5 -0.49 v -4.51 h 15 Z" />
      </svg>
    ) : (
      <svg className={styles.bedImage} viewBox="0 0 24 24" height="24px" width="24px">
        <path d="m23.96 14.81-2.96-7.41v-5.02a1.39 1.39 0 0 0 -1.39-1.38h-15.22c-.77 0-1.39.62-1.39 1.38v5.02l-2.96 7.41-.04.19v5.61c0 .64.43 1.17 1.01 1.33 0 .02-.01.04-.01.06v1.5a.5.5 0 0 0 1 0v-1.5h20v1.5a.5.5 0 0 0 1 0v-1.5c0-.02-.01-.04-.01-.06a1.39 1.39 0 0 0 1.01-1.33v-5.61zm-19.96-12.43c0-.21.17-.38.39-.38h15.22a.39.39 0 0 1 .39.39v4.61h-1v-1.61c0-.77-.62-1.39-1.39-1.39h-3.21c-.78 0-1.4.62-1.4 1.39v1.61h-2v-1.61c0-.77-.62-1.39-1.39-1.39h-3.22c-.77 0-1.39.62-1.39 1.39v1.61h-1zm14 3.01v3.21a.39.39 0 0 1 -.39.39h-3.21a.39.39 0 0 1 -.4-.38v-3.22a.39.39 0 0 1 .39-.39h3.21a.39.39 0 0 1 .39.39zm-8 0v3.21a.39.39 0 0 1 -.39.4h-3.22a.39.39 0 0 1 -.39-.39v-3.22a.39.39 0 0 1 .39-.39h3.21a.39.39 0 0 1 .39.39zm-6.16 2.61h1.16v.61c0 .77.62 1.39 1.39 1.39h3.21c.78 0 1.4-.62 1.4-1.39v-.61h2v .61c0 .78.62 1.39 1.39 1.39h3.21c.78 0 1.4-.62 1.4-1.39v-.61h1.16l2.8 7h-21.92zm19.16 12.61c0 .21-.18.39-.39.39h-21.22a.39.39 0 0 1 -.39-.39v-4.61h22z" />
      </svg>
    );

  const svgImages = [];
  for (let i = 0; i < numBeds; i++) {
    svgImages.push(bedSVG);
  }

  return svgImages;
}

export default SleepInfo;
