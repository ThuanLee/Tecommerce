import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/productService'
import '../styles/ProductDetailPage.css'

const ProductDetailPage = () => {
  // Get id from URL
  let params = useParams()
  let productId = params.id

  let cart = []
  cart = JSON.parse(localStorage.getItem('cart') || "[]")

  const [product, setProduct] = useState([])

  // Load product data when enter detail page
  useEffect(() => {
    const callAPI = async () => {
      let data = await getProduct(productId)
      setProduct(data)
    }
    callAPI()
  }, [productId])

  const addToCart = () => {
    const existsItem = cart.filter((cart_item) => cart_item.id === product.id)
    
    if (existsItem.length) {
      existsItem[0].quantity = existsItem[0].quantity + 1
    } else {
      cart.push({id: product.id, quantity: 1})
    }

    localStorage.setItem('cart', JSON.stringify(cart))
  }

  return (
    <div className="container">
      <div className="detail">
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
      <div className="add-btn" onClick={addToCart}>
        <p>Thêm vào giỏ hàng</p>
        <i className="fa-solid fa-lg fa-plus"></i>
      </div>
    </div>
  )
}

export default ProductDetailPage