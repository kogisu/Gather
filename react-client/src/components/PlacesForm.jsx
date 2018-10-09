import React from 'react';

export default class FriendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    const value = e.target.value;
    this.setState({places: value});
  }

  handleSubmit(e) {
    // alert('An address was submitted: ', this.state.valueName);
    console.log('submitted');
    console.log('props: ', this.props);
    e.preventDefault();
    this.props.searchPlaces('/find?places=1', 'POST', {places: this.state.places, avgPoint: this.props.avgPoint});
  }

  render() {
    return (
      <div style={{align: 'center'}}>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="places" value={this.state.places} onChange={this.handleChange}/>
          <input type="submit" value="Find Places" />
        </form>
      </div>
    );
  }
}