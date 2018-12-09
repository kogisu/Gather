import React from 'react';
// import 'rc-slider/assets/index.css';
import '!style-loader!css-loader!rc-slider/assets/index.css'; 
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'react-rangeslider/lib/index.css';
import styles from '../styles/styles.css'
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
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchDebounced = debounce(this.handleSearch, 500);
  }

  handleSearch() {
      this.props.searchPlaces(`/find?places=all&distance=${this.props.distance}&rating=${this.props.rating}`, 'GET', null);
  }
  handleChange(value, self, props) {
    props.handleState('distance', value, () => {
      self.handleSearchDebounced(value);
    });
  }

  render() {
    let { distance } = this.state
    const Handle = Slider.Handle;
    let props = this.props;
    return (
      <div className={styles.slider}>
        <Slider
          min={0}
          max={31}
          step={1}
          vertical={false}
          onChange={(value) => this.handleChange(value, this, props)}
          handle={handle}
        />
      </div>
    )
  }
}