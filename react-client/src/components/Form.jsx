import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.search('POST', {name: this.state.name, address: this.state.address});
    // console.log('name: ', this.state.name);
    // console.log('address: ', this.state.address);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          Name: <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
          Address: <input type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
          <input type="submit" value="Gather Friend" />
        </form>
      </div>
    );
  }
}

export default Form;