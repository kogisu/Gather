import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

export default class DistanceSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 1
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      distance: value
    });
    // this.props.searchPlaces(`/find?places=all&distance=${this.state.distance}`, 'GET', null);
  }

  render() {
    let { distance } = this.state
    return (
      <Slider
        value={distance}
        min={0}
        max={31}
        step={1}
        orientation="horizontal"
        onChange={this.handleChange}
      />
    )
  }
}