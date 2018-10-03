import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Form from './components/Form.jsx';
import FriendsMapContainer from './FriendsMapContainer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      friends: [
        {
          name: 'kento',
          location: {
            lat: 41.3781152,
            lng: -72.9173237
          }
        }
      ]
    }
    this.search = this.search.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.search();
  }

  search(method, data) {
    console.log('data', data);
    $.ajax({
      url: '/find', 
      method: method,
      data: {
        name: data.name,
        address: data.address
      },
      success: (data) => {
        console.log(data);
        // this.setState({
        //   items: data
        // });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleSearch() {
    console.log('inside handleSearch');
    this.search();
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <Form search={this.search}/>
      <FriendsMapContainer friends={this.state.friends} /> 
      {/* <List items={this.state.items}/> */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));