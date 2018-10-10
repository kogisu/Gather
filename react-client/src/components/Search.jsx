import React from 'react';

const Search = (props) => (
  <div style={{display: 'inline-block', width: '100px', height: '50px', 'text-align': 'left', border: 'solid', 'border-color': 'grey', 'border-radius': '3px'}}>
    {props.search}
  </div>
)
export default Search;