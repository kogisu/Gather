import React from 'react';

const Search = (props) => {
  
  const handleDelete = props => {
    console.log('deleting!!');
    let newSearches = props.searches;

    props.searchPlaces(`/find?deletePlaces=${props.search}`, 'DELETE', null);
    delete newSearches[props.search];
    props.handleState('searches', newSearches);
  }

  return (
    <div 
      style={{display: 'inline-block', float: 'left', 'margin': '10px 10px 0px 0px', width: '100px', height: '36px', 'background': 'rgba(0,0,0,.05)', 'borderRadius': '2px', 'padding': '4px 20px 5px 5px'}}
      onClick={() => handleDelete(props)}
    >
      <div style={{float: 'right', color: '#fff'}}>x</div>
      {props.search}
    </div>
  )
}
export default Search;