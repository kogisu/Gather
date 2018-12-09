import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Places from './components/Places.jsx';
import FriendForm from './components/FriendForm.jsx';
import PlacesForm from './components/PlacesForm.jsx';
import PlacesSorter from './components/PlacesSorter.jsx';
import FriendsMapContainer from './FriendsMapContainer.jsx';
import AvgPoint from './components/AvgPoint.jsx';
import {calculateCenterPt} from '../../helpers/utils';
import SearchesList from './components/SearchesList.jsx';
import DistanceSlider from './components/DistanceSlider.jsx';
import StarRating from './components/StarRating.jsx';
import styles from './styles/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      places: [],
      friends: [

      ],
      avgPoint: {},
      searches: {},
      distance: 1,
      rating: 5
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
          let avgPoint = calculateCenterPt(data);
          this.setState({friends: data, avgPoint: avgPoint});
        }
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleState(prop, newState, callback) {
    this.setState({[prop]: newState}, callback);
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
      <div className={styles.container}>
        <div className={styles.headerBar}>
          <div className={styles.title}>Gather</div>
          <FriendForm 
            search={this.searchFriends}/>
        </div>
        <div className={styles.googleMap}>
          <FriendsMapContainer 
            friends={this.state.friends} 
            avgPoint={this.state.avgPoint}
          />
        </div>
        <div className={styles.avgPoint}>
          <AvgPoint 
            avgPoint={this.state.avgPoint} 
            friends={this.state.friends}
          />
          <hr/>
        </div>
        <div className={styles.placesHeader}>
          <div className={styles.findStatementOne}>What's near the center?</div>
          <div className={styles.findStatementTwo}>Enter type of place below</div>
          <PlacesForm 
            searchPlaces={this.searchPlaces} 
            searches={this.state.searches} 
            avgPoint={this.state.avgPoint} 
            handleState={this.handleState}
          />
          <hr/>
        </div>
        <div className={styles.searchList}>
          <SearchesList 
            searches={this.state.searches} 
            searchPlaces={this.searchPlaces} 
            handleState={this.handleState}
          />
          <div className={styles.sorter}>
            <PlacesSorter 
              searchPlaces={this.searchPlaces}
              distance={this.state.distance}
              rating={this.state.rating}
            />
          </div>
        </div>
        <div className={styles.placesSection}>
          <div className={styles.filterBar}>
            <span style={{'lineHeight': '25px'}}><strong>Filters</strong></span><br/>
            <span>Set Distance in Miles</span>
            <DistanceSlider searchPlaces={this.searchPlaces} handleState ={this.handleState} distance={this.state.distance} rating={this.state.rating}/>
            <span style={{'lineHeight': '50px'}}>Filter by ratings</span>
            <StarRating searchPlaces={this.searchPlaces} handleState={this.handleState} distance={this.state.distance} rating={this.state.rating}/>
          </div>
          <div className={styles.places}>
            <Places places={this.state.places}/>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));