import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
const debounce = require('lodash.debounce');

export default class DistanceSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 1
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchDebounced = debounce(this.handleSearch, 500);
  }

  handleSearch() {
      this.props.searchPlaces(`/find?places=all&distance=${this.state.distance}`, 'GET', null);
  }
  handleChange(value) {
    // console.log('value: ', value);
    this.setState({
      distance: value
    }, (value) => {
      this.handleSearchDebounced(value);
    });
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