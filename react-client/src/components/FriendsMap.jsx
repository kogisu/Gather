import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Rectangle } from "react-google-maps";
import FriendMarker from './FriendMarker.jsx';
import PropTypes from 'prop-types';

const FriendsMap = withScriptjs(withGoogleMap((props) => {

  const markers = props.friends.map(friend => {
    return <FriendMarker key={friend._id} location={{lat: friend.coordinates.lat, lng: friend.coordinates.lng}} />
  });
  console.log(props.avgPoint);
  markers.push(<FriendMarker key={'avgPoint'} location={props.avgPoint.lat ? {lat: props.avgPoint.lat, lng: props.avgPoint.lng} : {lat: 0, lng: 0}}/>);
  // markers.push(<FriendMarker key={'centerPoint'} location={Rectangle.getBounds().getCenter()} />)
  return (
    <div>
      <GoogleMap 
        defaultZoom={4} 
        defaultCenter={props.avgPoint.lat ? {lat: props.avgPoint.lat, lng: props.avgPoint.lng} : {lat: 0, lng: 0}}
        center={new google.maps.LatLng(props.avgPoint.lat, props.avgPoint.lng)}>
        {markers}
      </GoogleMap>
    </div>
  );
}));

FriendsMap.propTypes = {
  friends: PropTypes.array.isRequired,
  avgPoint: PropTypes.object.isRequired
}

export default FriendsMap;