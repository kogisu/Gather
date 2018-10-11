import React from 'react';
import Search from './Search.jsx';

const SearchesList = (props) => {
  return (
    <div className={'searchesList'} style={{height: '60px'}}>
      {
        Object.keys(props.searches).length > 0 ? (
          Object.keys(props.searches).map(search => {
            return <Search key={search} search={search} searchPlaces={props.searchPlaces} handleState={props.handleState} searches={props.searches}/>
          }) 
        ) : (
          null
        ) 
      }
    </div>
  )
}

export default SearchesList;