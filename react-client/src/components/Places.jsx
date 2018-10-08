import React from 'react';
import Place from './Place.jsx';

const Places = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.places.length } places.
    { 
      props.places.map((place, index) => {
        return <Place key={index} place={place}/>
      })
    }
  </div>
)

export default Places;