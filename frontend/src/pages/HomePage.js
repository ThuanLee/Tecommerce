import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HomePage = () => {
  const getProducts = async () => {
    let response = await axios.get('/api/products/')
    let data = await response.json()
    setProducts(data)
  }

  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <p>Home Page</p>
      {products.map((product, index) => (
        <div>{product.name}</div>
      ))}
    </div>
  )
}

export default HomePage