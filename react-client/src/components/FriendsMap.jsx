import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import FriendMarker from './FriendMarker.jsx';
import PropTypes from 'prop-types';

const FriendsMap = withScriptjs(withGoogleMap((props) => {

  const markers = props.friends.map(friend => {
    // console.log(friend);
    return <FriendMarker key={friend._id} location={{lat: friend.coordinates.lat, lng: friend.coordinates.lng}} />
  });
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
  friends: PropTypes.array.isRequired
}

export default FriendsMap;