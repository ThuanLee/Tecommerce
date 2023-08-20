import React from 'react'
import CartItems from '../components/CartItems'
import { useContext } from 'react'
import { CartContext } from '../contexts/cartContext'
import '../styles/CartPage.css'

const CartPage = () => {
  const context = useContext(CartContext)

  return (
    <div className='cart-page'>
      <h1>Giỏ hàng của bạn</h1>
      {
        context.cart.quantity_in_cart === 0 ? <p>Bạn chưa chọn sản phẩm nào</p> : <CartItems />
      }   
    </div>
  )
}

export default CartPage