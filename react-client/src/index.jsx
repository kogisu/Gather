import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Form from './components/Form.jsx';
import FriendsMapContainer from './FriendsMapContainer.jsx';
import AvgPoint from './components/AvgPoint.jsx';
import {calculateAvgPt} from '../../helpers/utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      friends: [
        {
          _id: 0,
          name: 'kento',
          coordinates: {
            lat: 41.3781152,
            lng: -72.9173237
          }
        }
      ],
      avgPoint: {}
    }
    this.search = this.search.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.geoFindMe = this.geoFindMe.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      console.log('inside geolocation');
      this.geoFindMe();
    } else {
      console.log('inside get request');
      this.search('GET', null);
    }
    // this.search();
  }

  getAddresses() {
    $.ajax({
      url: '/find', 
      method: method,
      success: (data) => {
        console.log(data);
        this.setState({friends: data});
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  geoFindMe() {
    navigator.geolocation.getCurrentPosition((geoInfo) => {
      // console.log(geoInfo);
      let geoData = {
          name: 'user',
          address: {
            lat: geoInfo.coords.latitude,
            lng: geoInfo.coords.longitude
          }
        };
      this.search('POST', geoData);
      // this.setState({friends: newState});
      // console.log(this.state.friends[0].location);
    });
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
        let avgPoint = calculateAvgPt(data);
        this.setState({friends: data, avgPoint: avgPoint});
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
      <FriendsMapContainer friends={this.state.friends} avgPoint={this.state.avgPoint}/>
      <AvgPoint avgPoint={this.state.avgPoint}/>
      {/* <List items={this.state.items}/> */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));