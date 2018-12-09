import React from 'react';
import styles from '../styles/styles.css';

class Place extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
    this.handleHoverOn = this.handleHoverOn.bind(this);
    this.handleHoverOff = this.handleHoverOff.bind(this);
  }
  handleHoverOn() {
    this.setState({hover: true});
  }
  handleHoverOff() {
    this.setState({hover: false});
  }
  render() {
    let hover = this.state.hover ? styles.hoverOn: styles.hoverOff; 
    return (
      <a 
        href={this.props.place.website ? this.props.place.website : this.props.place.url} 
        style={{'textDecoration': 'none', color: 'black'}}
        onMouseEnter={this.handleHoverOn}
        onMouseLeave={this.handleHoverOff}
        className={hover}
      >
      <div>
        <div className={styles.place}>
        <div>
          <span>{this.props.place.name}</span><br/>
          <span>{this.props.place.types.length <= 2 ? this.props.place.types.join(', ') : this.props.place.types.slice(0,2).join(', ') + '..'}</span>
        </div>
        <div>
          <span>Rating: {this.props.place.rating}</span><br/>
          <span>Reviews: {this.props.place.reviews}</span>
        </div>
        <div></div>
        </div>
        <div className={styles.line}>
        <hr className={styles.placeLine}/>
        <div />
        </div>
      </div>
      </a>
    )
  }
}

export default Place;