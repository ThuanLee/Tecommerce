import React, { useEffect, useState } from 'react'
import ProductList from '../components/ProductList'
import { searchProduct } from '../services/productService'
import '../styles/SearchPage.css'

export const SearchPage = () => {
  // Get query string from url
  let params = new URLSearchParams(window.location.search)
  let query = params.get('query')

  let categoryList = JSON.parse(localStorage.getItem('categories') || "[]")

  const [searchResult, setSearchResult] = useState([])
  const [productList, setProductList] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      let data = await searchProduct(query)
      setSearchResult(data)
      setProductList(data)
    }
    callAPI()
  }, [query])

  const filter = (e) => {
    let categoryId = e.target.value
    if (categoryId === "all") { 
      setProductList(searchResult)
      return
    }

    // Filter in search result
    let productListFiltered = []
    for (let product of searchResult) {
      if (product.category.toString() === categoryId) {
        productListFiltered.push(product)
      }
    }
    setProductList(productListFiltered)
  }

  return (
    <div className='search-page'>

      <div className='filter'>
        <h2>Bộ lọc</h2>
        <div className='category-element'>
          <input type="radio" id="0" name="category_list" value="all" onChange={filter}/>
          <label for="0"><h3>All</h3></label>
        </div>
          {categoryList.map((category, index) => (
            <div className='category-element'>
              <input type="radio" id={category.id} name="category_list" value={category.id} onChange={filter}/>
              <label for={category.id}><h3>{category.name}</h3></label>
            </div>
          ))}
      </div>

      <div>
        {query !== '' &&
          <h3>Search term: <small>{query}</small></h3>
        }
        <ProductList productList={productList} />
      </div>

    </div>
  )
}

export default SearchPage
