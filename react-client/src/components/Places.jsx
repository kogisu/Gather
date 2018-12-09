import React from 'react';
import Place from './Place.jsx';

const Places = (props) => (
  <div>
    <h3> Places </h3>
    <div><b>There are { props.places.length } places</b></div><br/>
    { 
      props.places.map((place, index) => {
        return <Place key={index} place={place}/>
      })
    }
  </div>
)

export default Places;