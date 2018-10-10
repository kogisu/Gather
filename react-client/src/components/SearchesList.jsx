import React from 'react';
import Search from './Search.jsx';

const SearchesList = (props) => {
  return (
    <div>
      {
        Object.keys(props.searches).length > 0 ? (
          Object.keys(props.searches).map(search => {
            return <Search search={search} />
          }) 
        ) : (
          null
        ) 
      }
    </div>
  )
}

export default SearchesList;