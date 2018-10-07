import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import FriendForm from './components/FriendForm.jsx';
import PlacesForm from './components/PlacesForm.jsx';
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
    this.searchFriends = this.searchFriends.bind(this);
    this.searchPlaces = this.searchPlaces.bind(this);
    this.geoFindMe = this.geoFindMe.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      console.log('inside geolocation');
      this.geoFindMe();
    } else {
      console.log('inside get request');
      this.searchFriends('/find?friends=1', 'GET', null);
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
      this.searchFriends('/find?findme=1', 'POST', geoData);
      // this.setState({friends: newState});
      // console.log(this.state.friends[0].location);
    });
  }

  searchFriends(url, method, data) {
    url = url || '/find';
    console.log('data', data);

    $.ajax({
      url: url, 
      method: method,
      data: data,
      success: (data) => {
        console.log(data);
        if (data.fail === 0) {
          alert('Entered Address does not exist.  Please try again');
        } else if (data.fail === 1) {
          alert('Entered Address Produces more than one result.  Please try again');
        } else {
          let avgPoint = calculateAvgPt(data);
          this.setState({friends: data, avgPoint: avgPoint});
        }
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  searchPlaces(url, method, data) {
    url = url || '/find';
    console.log('data', data);

    $.ajax({
      url: url, 
      method: method,
      data: data,
      success: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <FriendForm search={this.searchFriends}/><br/>
      <FriendsMapContainer friends={this.state.friends} avgPoint={this.state.avgPoint}/><br/>
      <AvgPoint avgPoint={this.state.avgPoint}/><br/>
      <PlacesForm searchPlaces={this.searchPlaces} avgPoint={this.state.avgPoint}/>
      {/* <List items={this.state.items}/> */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));