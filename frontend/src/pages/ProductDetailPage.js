import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/productService'
import '../styles/ProductDetailPage.css'
import { CartContext } from '../contexts/cartContext'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addCartItem } from '../services/cartSevice'
import jwt_decode from 'jwt-decode'


const ProductDetailPage = () => {
  // Get id from URL
  let params = useParams()
  let productId = params.id

  // Toast message
  const successToast= (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "light",
    });
  }

  const loginFirst = () => {
    toast.error("Hãy đăng nhập trước", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "light",
    });
  }

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
      const token = JSON.parse(localStorage.getItem('token'))
      const userId = jwt_decode(token.access).user_id

      let response = await addCartItem(userId, productId, quantity)
      cartContext.setCart(response)
      successToast('🦄 Thêm "' + product.name + '" vào giỏ hàng!!')

    } catch (error) {
      cartContext.setCart([])
      loginFirst()
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
      <ToastContainer newestOnTop={true}/>
    </div>
  )
}

export default ProductDetailPage