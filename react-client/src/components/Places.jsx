import React from 'react';
import Place from './Place.jsx';

const Places = (props) => (
  <div>
    <h4> Places </h4>
    <span>There are { props.places.length } places</span>
    { 
      props.places.map((place, index) => {
        return <Place key={index} place={place}/>
      })
    }
  </div>
)

export default Places;