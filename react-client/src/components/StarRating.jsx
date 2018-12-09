import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  onStarClick(value, props) {
    props.handleState('rating', value, () => {
      props.searchPlaces(`/find?places=all&distance=${this.props.distance}&rating=${this.props.rating}`, 'GET', null);
    });
    
  }
 
  render() {
    const rating = this.props.rating;
    
    return (                
      <div className={StyleSheet.ratings}>
        <StarRatingComponent 
          name="rate1" 
          starColor={'lightblue'}
          emptyStarColor={'grey'}
          starCount={5}
          value={rating}
          onStarClick={(value) => this.onStarClick(value, this.props)}
        />
      </div>
    );
  }
}
export default Rating;