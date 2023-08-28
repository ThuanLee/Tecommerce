import React from 'react'
import '../styles/SearchBar.css'

const SearchBar = () => {
  return (
    <form className="item search" action='/search/' autoComplete='off' spellCheck={false}>
      <div className="search-group">
          <input type="text" placeholder='Tìm kiếm...' name='query' />
          <button type='submit'>
            <i className="fa-solid fa-magnifying-glass fa-lg search-icon"/>
          </button>
      </div>
    </form>
  )
}

export default SearchBar