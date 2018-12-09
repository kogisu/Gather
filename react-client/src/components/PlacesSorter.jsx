import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const options = [
  {value: 'default', label: 'Default'},
  {value: 'rating', label: 'Rating'},
  {value: 'reviews', label: 'Reviews'},
  {value: 'price', label: 'Price'}
];

export default class PlacesSorter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(selectedOption, props) {
    console.log('props: ', props);
    this.setState({selectedOption});
    console.log('Option selected: ', selectedOption);
    this.props.searchPlaces(`/find?places=1&distance=${props.distance}&rating=${this.props.rating}&sortby=${selectedOption.value}`, 'GET', null);
  }

  render() {
    const {selectedOption} = this.state;
    let props = this.props;
    return (
      <Select
        value={selectedOption}
        onChange={(e) => this.handleChange(e, props)}
        options={options}
      />
    );
  }
}
