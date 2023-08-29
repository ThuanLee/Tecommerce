import React, { useEffect, useState } from 'react'
import ProductList from '../components/ProductList'
import { getProductList } from '../services/productService'
import '../styles/HomePage.css'

const HomePage = () => {
  const [productList, setProductList] = useState([])

  // Get product list from db and set to productList
  useEffect(() => {
    const callAPI = async () => {
      const productListData = await getProductList()
      setProductList(productListData)
    }
    callAPI()
  }, [])

  return (
    <div className='home-page'>
      <ProductList productList={productList} />
    </div>
  )
}

export default HomePage