import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Places from './components/Places.jsx';
import FriendForm from './components/FriendForm.jsx';
import PlacesForm from './components/PlacesForm.jsx';
import PlacesSorter from './components/PlacesSorter.jsx';
import FriendsMapContainer from './FriendsMapContainer.jsx';
import AvgPoint from './components/AvgPoint.jsx';
import {calculateAvgPt} from '../../helpers/utils';
import SearchesList from './components/SearchesList.jsx';
import DistanceSlider from './components/DistanceSlider.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      places: [],
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
      avgPoint: {},
      searches: {},
      distance: 5000
    }
    this.searchFriends = this.searchFriends.bind(this);
    this.searchPlaces = this.searchPlaces.bind(this);
    this.geoFindMe = this.geoFindMe.bind(this);
    this.handleState = this.handleState.bind(this);
  }
  
  componentWillMount() {
    this.searchPlaces('/find?deletePlaces=all', 'DELETE', null);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      console.log('inside geolocation');
      this.geoFindMe();
    } else {
      console.log('inside get request');
      this.searchFriends('/find?friends=1', 'GET', null);
      this.searchPlaces('/find?places=1', 'GET', null);
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
      this.searchPlaces('/find?places=1', 'GET', null);
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

  handleState(prop, newState) {
    this.setState({[prop]: newState});
  }

  searchPlaces(url, method, data) {
    url = url || '/find';
    // console.log('data', data);
    if (method === 'POST' && this.state.searches[data.places]) {
      alert('You already searched this! Search something else');
      return;
    }
    $.ajax({
      url: url, 
      method: method,
      data: data,
      success: (results) => {
        console.log(results);
        if (method === 'POST') {
          let newSearches = this.state.searches;
          newSearches[data.places] = 1;
          this.setState({places: results, searches: newSearches});
        }
        if (method === 'GET') {
          this.setState({places: results});
        }
        if (method === 'DELETE') {
          this.setState({places: results});
        }
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (
      <div>
        <div className={'header'} style={{'backgroundColor': '#007eff'}}>
          <h1 style={{color: 'white'}}>Gather</h1>
          <FriendForm search={this.searchFriends}/><br/>
        </div>
        <div className={'googleMap'}>
          <FriendsMapContainer friends={this.state.friends} avgPoint={this.state.avgPoint}/><br/>
          <AvgPoint avgPoint={this.state.avgPoint}/>
          <hr/>
        </div>
        <div className={'placesHeader'} style={{position: 'relative', height: '80px', 'textAlign': 'center'}}>
          <span style={{'fontSize': '22px'}}>What's near the center?</span><br/>
          <span style={{'lineHeight': '30px'}}>Enter type of place below</span><br/>
          <PlacesForm searchPlaces={this.searchPlaces} searches={this.state.searches} avgPoint={this.state.avgPoint} handleState={this.handleState}/>
        </div>
        {/* <hr/>       */}
        <div className={'Forms'} style={{height: '60px'}}>
          <SearchesList searches={this.state.searches} searchPlaces={this.searchPlaces} handleState={this.handleState}/>
          <div className={'sorter'} style={{width: '250px', float: 'right', 'marginRight': '20px'}}>
            <PlacesSorter searchPlaces={this.searchPlaces}/>
          </div>
        </div>
        <hr/>
        <div>
          <div className={'filterBar'} style={{width: '200px', height: '100%', 'text-align': 'center', float: 'left'}}>
            <span style={{'lineHeight': '25px'}}><strong>Filters</strong></span><br/>
            <span>Set Distance</span>
              <DistanceSlider searchPlaces={this.searchPlaces}/>
          </div>
          <div className={'places'} style={{'marginLeft': '300px', width: '100%'}}>
            <Places places={this.state.places}/>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));