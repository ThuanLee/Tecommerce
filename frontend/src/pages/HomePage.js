import React, { useEffect, useState } from 'react'
import ProductList from '../components/ProductList'
import SideBar from '../components/SideBar'
import { getCategoryList, getProductByCategory, getProductList } from '../services/productService'
import '../styles/HomePage.css'

const HomePage = () => {
  const [productList, setProductList] = useState([])

  // Get product list from db and set to productList
  useEffect(() => {
    const callAPI = async () => {
      const productListData = await getProductList()
      setProductList(productListData)
      const categoryListData = await getCategoryList()
      localStorage.setItem('categories', JSON.stringify(categoryListData))
    }
    callAPI()
  }, [])

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
    <div className='homepage'>
      <SideBar filter={filter} />
      <ProductList productList={productList} />
    </div>
  )
}

export default HomePage