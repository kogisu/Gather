import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import FriendMarker from './FriendMarker.jsx';

const FriendsMap = withScriptjs(withGoogleMap((props) => {

  const markers = props.friends.map(friend => {
    return <FriendMarker key={friend.name} location={{lat: friend.location.lat, lng: friend.location.lng}} />
  });
  return (
    <div>
      <GoogleMap 
        defaultZoom={14} 
        defaultCenter={{lat: 41.3781152, lng: -72.9173237}}>
        {markers}
      </GoogleMap>
    </div>
  );
}));

export default FriendsMap;