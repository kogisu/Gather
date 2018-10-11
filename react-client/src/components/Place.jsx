import React from 'react';

const Place = (props) => {
  return (
    <div>
      <span>{props.place.name}</span><br/>
      <span>{props.place.types.length <= 2 ? props.place.types.join(', ') : props.place.types.slice(0,2).join(', ') + '..'}</span><br/>
      <span>Rating: {props.place.rating}</span><br/>
      <span>Reviews: {props.place.reviews}</span><br/>
      <hr />
    </div>
  )
}

export default Place;