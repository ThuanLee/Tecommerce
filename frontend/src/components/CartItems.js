import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../contexts/cartContext'
import { deleteCartItem, getCartItems } from '../services/cartSevice'
import { removeCartItemToast } from '../utils/toast'
import { moneyFormat } from '../utils/money'
import { useEndSession } from '../utils/userAuth'

const CartItems = () => {

  const cartContext = useContext(CartContext)
  const endSession = useEndSession()

  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      try {
        const data = await getCartItems()
        setCartItems(data)
      } catch (error) {
        if (error.response.status === 401) {
          endSession()
        }
      }
    }
    callAPI()
  }, [])

  const removeCartItem = async (cartItem) => {
    try {
      const response = await deleteCartItem(cartItem.id)
      cartContext.setCart(response.cart)
      setCartItems(response.cartItems)
      removeCartItemToast(cartItem.product.name)
    } catch (error) {
      endSession()
    }
  }

  return (
    <div className="shopping-cart">

      <div className="column-labels">
        <label className="product-image">Sản phẩm</label>
        <label className="product-title">Chi tiết</label>
        <label className="product-price">Đơn giá</label>
        <label className="product-quantity">Số lượng</label>
        <label className="product-removal">Xóa</label>
        <label className="product-line-price">Tổng</label>
      </div>

      {cartItems.map((cartItem) => (

        <div className="product">
          <div className="product-image">
            <img src={cartItem.product.image_url} alt='cart item img'/>
          </div>
          <div className="product-title"><p><b>{cartItem.product.name}</b></p></div>
          <div className="product-price">{moneyFormat(cartItem.product.price)}</div>
          <div className="product-quantity">{cartItem.quantity}</div>
          <div className="product-removal">
            <button className="remove-product" onClick={() => removeCartItem(cartItem)}>
              Xóa
            </button>
          </div>
          <div className="product-line-price">{moneyFormat(cartItem.total)}</div>
        </div>

      ))}

      <div className="totals">
        <div className="totals-item totals-item-total">
          <label>Tổng cộng</label>
          <div className="totals-value" id="cart-total">{moneyFormat(cartContext.cart.grand_total)}</div>
        </div>
      </div>

      <button className="checkout"><Link to="/order/">Đặt hàng</Link></button>

    </div>
  )
}

export default CartItems