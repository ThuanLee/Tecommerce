import React from 'react'
import CartItems from '../components/CartItems'
import { useContext } from 'react'
import { CartContext } from '../contexts/cartContext'
import '../styles/CartPage.css'

const CartPage = () => {
  const context = useContext(CartContext)

  return (
    <div className='cart-page'>
      <p className='my-cart'>Giỏ hàng của bạn</p>
      {
        context.cart.quantity_in_cart ? <CartItems /> : <p className='empty-cart'>Bạn chưa chọn sản phẩm nào</p>
      }   
    </div>
  )
}

export default CartPage