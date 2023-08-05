import React, { useEffect, useState } from 'react'
import ProductList from '../components/ProductList'
import SideBar from '../components/SideBar'
import { searchProduct } from '../services/productService'
import { getProductList, getProductByCategory } from '../services/productService'
import '../styles/SearchPage.css'

export const SearchPage = () => {
  // Get query string from url
  let params = new URLSearchParams(window.location.search)
  let query = params.get('query')

  const [productList, setProductList] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      let data = await searchProduct(query)
      setProductList(data)
    }
    callAPI()
  }, [query])

  const filter = (e) => {
    const callAPI = async () => {
      let categoryId = e.target.value;
      if (categoryId === "all") {
        const productListData = await getProductList()
        setProductList(productListData)
      } else {
        const productListFiltered = await getProductByCategory(categoryId)
        setProductList(productListFiltered) 
      }
    }
    callAPI()
  }

  return (
    <div className='search-page'>
      <SideBar filter={filter} />
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
