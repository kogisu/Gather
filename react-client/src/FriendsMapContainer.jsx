import React from "react";
import FriendsMap from "./components/FriendsMap.jsx";
import PropTypes from 'prop-types';
const config = require('../../config');

export default class FriendsMapContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<FriendsMap
					friends={this.props.friends}
					avgPoint={this.props.avgPoint}
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `500px`, width: `100%` }} />}
					mapElement={<div style={{ height: `100%` }} />}
				/>
			</div>
		);
	}
}

FriendsMapContainer.propTypes = {
	friends: PropTypes.array.isRequired
}
