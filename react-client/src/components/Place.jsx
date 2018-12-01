import React from 'react';
import styles from '../styles/styles.css';

const Place = (props) => {
  return (
    <a href={props.place.website ? props.place.website : props.place.url} style={{'textDecoration': 'none', color: 'black'}}>
    <div>
      <div className={styles.place}>
      <div>
        <span>{props.place.name}</span><br/>
        <span>{props.place.types.length <= 2 ? props.place.types.join(', ') : props.place.types.slice(0,2).join(', ') + '..'}</span>
      </div>
      <div>
        <span>Rating: {props.place.rating}</span><br/>
        <span>Reviews: {props.place.reviews}</span>
      </div>
      <div></div>
      </div>
      <div className={styles.line}>
      <hr className={styles.placeLine}/>
      <div />
      </div>
    </div>
    </a>
  )
}

export default Place;