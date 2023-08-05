import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/productService'
import '../styles/ProductDetailPage.css'
import { CartContext } from '../contexts/cartContext'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductDetailPage = () => {
  // Get id from URL
  let params = useParams()
  let productId = params.id

  // Toast message
  const successToast= () => {
    toast('🦄 Add product to cart successful!!', {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      transition: Flip,
      theme: "light",
    });
  }

  // Use to sync data with header
  const context = useContext(CartContext)

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
    // Get cart items from local storage
    let cart = JSON.parse(localStorage.getItem('cart') || "[]")

    const existsItem = cart.filter((cart_item) => cart_item.id === product.id)
    
    if (existsItem.length) {
      existsItem[0].quantity = existsItem[0].quantity + 1
    } else {
      cart.push({...product, quantity: 1})
    }

    context.setCart(cart)
    localStorage.setItem('cart', JSON.stringify(cart))

    //Toast
    successToast()
  }

  return (
    <div className="product-detail">
      <div className="detail">
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
      <div className="add-btn" onClick={addToCart}>
        <p>Thêm vào giỏ hàng</p>
        <i className="fa-solid fa-lg fa-plus"></i>
      </div>
      <ToastContainer newestOnTop={true}/>
    </div>
  )
}

export default ProductDetailPage