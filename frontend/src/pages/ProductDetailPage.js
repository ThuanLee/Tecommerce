import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/productService'
import '../styles/ProductDetailPage.css'
import { CartContext } from '../contexts/cartContext'
import { addCartItem } from '../services/cartSevice'
import jwt_decode from 'jwt-decode'
import { addCartItemToast, loginFirstToast } from '../utils/toast'


const ProductDetailPage = () => {
  // Get id from URL
  let params = useParams()
  let productId = params.id

  // Use to sync data with header
  const cartContext = useContext(CartContext)

  const [product, setProduct] = useState([])

  // Load product data when enter detail page
  useEffect(() => {
    const callAPI = async () => {
      let data = await getProduct(productId)
      setProduct(data)
    }
    callAPI()
  }, [productId])

  const addToCart = async () => {
    try {
      let quantity = parseInt(document.getElementById('buy-quantity').value)
      let response = await addCartItem(productId, quantity)
      cartContext.setCart(response)
      addCartItemToast(product.name)
    } catch (error) {
      cartContext.setCart([])
      loginFirstToast()
    }
  }

  return (
    <div className="product-detail">
      <div className="detail">
        <p>Tên sản phẩm: {product.name}</p>
        <p>Mô tả: {product.description}</p>
        <p>Giá: {product.price}</p>
        <p>Tồn kho: {product.quantity_in_stock}</p>
      </div>
      <div className="add-btn">
        <h4>Thêm vào giỏ hàng</h4>
        <input id='buy-quantity' type='number' defaultValue={1}></input>
        <i className="fa-solid fa-2x fa-plus" onClick={addToCart}></i>
      </div>
    </div>
  )
}

export default ProductDetailPage