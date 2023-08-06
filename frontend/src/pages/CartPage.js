import React from 'react'
import CartItems from '../components/CartItems'
import { useContext } from 'react'
import { CartContext } from '../contexts/cartContext'
import '../styles/CartPage.css'
import { ToastContainer } from 'react-toastify'

const CartPage = () => {
  const context = useContext(CartContext)

  return (
    <div className='cart-page'>
      <h1>Giỏ hàng của bạn</h1>
      {
        context.cart.length === 0 ? <p>Bạn chưa chọn sản phẩm nào</p> : <CartItems />
      }   
      <ToastContainer newestOnTop={true}/>
    </div>
  )
}

export default CartPage