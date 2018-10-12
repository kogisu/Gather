import React from 'react';
import PropTypes from 'prop-types';

const AvgPoint = (props) => {
  return (
    <div>
      Center Point: {props.avgPoint.lat ? `latitude: ${props.avgPoint.lat.toFixed(3)}, longitude: ${props.avgPoint.lng.toFixed(3)}` : 'latitude: 0, longitude: 0'}
      <br/>
      <span style={{lineHeight: '50px'}}>Number of friends: <strong>{props.friends.length}</strong></span>
    </div>
  );
}

AvgPoint.propTypes = {
  avgPoint: PropTypes.object.isRequired
}
export default AvgPoint;