import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductList } from '../services/productService'
import '../styles/HomePage.css'


const HomePage = () => {
  const [productList, setProductList] = useState([])

  // Get product list from db and set to productList
  useEffect(() => {
    const callAPI = async () => {
      let data = await getProductList()
      setProductList(data)
    }
    callAPI()
  }, [])

  return (
    <div className="product-list">
      {productList.map((product, index) => (
        <Link to={`/product/${product.id}/`}>
          <div className="card">
            <div className="imgBox">
              <image/>
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
  )
}

export default HomePage