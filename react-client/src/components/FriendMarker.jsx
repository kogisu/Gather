import React from "react";
import { Marker } from "react-google-maps";
import PropTypes from 'prop-types';
// import StethoscopeIcon from "../stethoscopeIcon.png";

export default class FriendMarker extends React.Component {
  render(){
    return(
      <div>
        <Marker position={this.props.location} />
      </div>
    );
  }
}

FriendMarker.propTypes = {
  location: PropTypes.object.isRequired
}