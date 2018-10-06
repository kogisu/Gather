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
    // const value = e.target.value;
    // this.setState({[name]: value});
    // this.props.search('POST', {name: this.state.name, address: this.state.address});
    // console.log('name: ', this.state.name);
    // console.log('address: ', this.state.address);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} action="http://127.0.0.1:3000?places" method="GET">
          Places: <input type="text" name="places" value={this.state.places} onChange={this.handleChange}/>
          <input type="submit" value="Search Places" />
        </form>
      </div>
    );
  }
}