import React from "react";
import { Marker } from "react-google-maps";
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