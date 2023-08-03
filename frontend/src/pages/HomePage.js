import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductList } from '../services/productService'


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
    <div>
      <h2>Home Page</h2>
      <div>
        {productList.map((product, index) => (
          <Link to={`/product/${product.id}/`}>
            <p>{product.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage