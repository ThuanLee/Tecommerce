import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategoryList, getProductByCategory, getProductList } from '../services/productService'
import '../styles/HomePage.css'

const HomePage = () => {
  const [categoryList, setCategoryList] = useState([])
  const [productList, setProductList] = useState([])

  // Get product list from db and set to productList
  useEffect(() => {
    const callAPI = async () => {
      const productListData = await getProductList()
      setProductList(productListData)
      const categoryListData = await getCategoryList()
      setCategoryList(categoryListData)
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
      <div className='filter'>
        <h2>Danh mục sản phẩm</h2>
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

      <div className="product-list">
        {productList.map((product, index) => (
          <Link to={`/product/${product.id}/`}>
            <div className="card">
              <div className="imgBox">
              </div>

              <div className="contentBox">
                <h3>{product.name}</h3>
                <h2 className="price">{product.price / 1000}<small>.000</small> VND</h2>
              </div>
              <p className="buy">Buy Now</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage