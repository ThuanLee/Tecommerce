import React from 'react'
import '../styles/SearchBar.css'

const SearchBar = () => {
  return (
    <form className="item search" action='/search/'>
      <div className="search-group">
          <input type="search" placeholder='Search here...' name='query' />
          <button type='submit'>
            <i className="fa-solid fa-magnifying-glass fa-lg search-icon"/>
          </button>
      </div>
    </form>
  )
}

export default SearchBar