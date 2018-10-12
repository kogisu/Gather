import React from 'react';

export default class FriendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({[name]: value});
  }

  handleSubmit(e) {
    // alert('An address was submitted: ', this.state.valueName);
    console.log('submitted');
    console.log('props: ', this.props);
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    // this.setState({[name]: value});
    this.props.search('/find?friends=1', 'POST', {name: this.state.name, address: this.state.address});
  }

  handleClear(e) {
    e.preventDefault();
    this.props.search('/find?deleteFriends=all', 'DELETE', null);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          Name: <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
          Address: <input type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
          <input name="gatherFriend" type="submit" value="Gather Friend" />
        </form>
        <form onSubmit={this.handleClear} >
          <input name="clearFriends" type="submit" value="Clear Friends" />
        </form>
      </div>
    );
  }
}