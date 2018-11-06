import React from 'react';
import styles from '../styles/styles.css';

const Place = (props) => {
  return (
    <a href={props.place.website ? props.place.website : props.place.url} style={{'text-decoration': 'none', color: 'black'}}>
    <div>
      <span>{props.place.name}</span><br/>
      <span>{props.place.types.length <= 2 ? props.place.types.join(', ') : props.place.types.slice(0,2).join(', ') + '..'}</span><br/>
      <span>Rating: {props.place.rating}</span><br/>
      <span>Reviews: {props.place.reviews}</span><br/>
      <hr />
    </div>
    </a>
  )
}

export default Place;