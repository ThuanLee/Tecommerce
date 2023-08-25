import React, { useEffect, useState } from 'react'
import ProductList from '../components/ProductList'
import { getCategoryList, searchProduct } from '../services/productService'
import '../styles/SearchPage.css'

export const SearchPage = () => {
  // Get query string from url
  let params = new URLSearchParams(window.location.search)
  let query = params.get('query')

  const [searchResult, setSearchResult] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [productList, setProductList] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      let searchData = await searchProduct(query)
      let categoryData = await getCategoryList()
      setSearchResult(searchData)
      setProductList(searchData)
      setCategoryList(categoryData)
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
        <h5>Bộ lọc</h5>
        <div className='category-element'>
          <input type="radio" id="0" name="category_list" value="all" onChange={filter}/>
          <label for="0"><p>All</p></label>
        </div>
          {categoryList.map((category) => (
            <div className='category-element'>
              <input type="radio" id={category.id} name="category_list" value={category.id} onChange={filter}/>
              <label for={category.id}><p>{category.name}</p></label>
            </div>
          ))}
      </div>

      <div className='search-result'>
        {query !== '' &&
          <p className='m-0'><b>Search term: </b><i>{query}</i></p>
        }
        <ProductList productList={productList} />
      </div>

    </div>
  )
}

export default SearchPage
