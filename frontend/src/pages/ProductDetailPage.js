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
  const successToast= (productName) => {
    let message = '🦄 Thêm "' + productName + '" vào giỏ hàng!!'
    toast(message, {
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
    let cart = JSON.parse(localStorage.getItem('cart') || "[]")

    let buyQuantity = parseInt(document.getElementById('buy-quantity').value)
    const existsItem = cart.filter((cart_item) => cart_item.id === product.id)


    if (existsItem.length) {
      existsItem[0].quantity = existsItem[0].quantity + buyQuantity
    } else {
      cart.push({...product, quantity: buyQuantity})
    }

    context.setCart(cart)
    localStorage.setItem('cart', JSON.stringify(cart))

    //Toast
    successToast(product.name)
  }

  return (
    <div className="product-detail">
      <div className="detail">
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
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