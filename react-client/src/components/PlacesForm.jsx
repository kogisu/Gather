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
    this.props.search('/find?friends', 'GET', null);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Places: <input type="text" name="places" value={this.state.places} onChange={this.handleChange}/>
          <input type="submit" value="Search Places" />
        </form>
      </div>
    );
  }
}