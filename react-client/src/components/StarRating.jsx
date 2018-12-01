import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5
    }
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }
 
  render() {
    const { rating } = this.state;
    
    return (                
      <div className={StyleSheet.ratings}>
        <StarRatingComponent 
          name="rate1" 
          starColor={'lightblue'}
          emptyStarColor={'grey'}
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}
export default Rating;