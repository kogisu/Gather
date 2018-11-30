import React from 'react';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'react-rangeslider/lib/index.css';
const debounce = require('lodash.debounce');

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

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
    const Handle = Slider.Handle;
    return (
      <div style={{ width: 200, margin: 50 }}>
        <Slider
          min={0}
          max={31}
          step={1}
          vertical={false}
          onChange={this.handleChange}
          handle={handle}
        />
      </div>
    )
  }
}