import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../contexts/cartContext'
import { deleteCartItem, getCartItems } from '../services/cartSevice'
import { removeCartItemToast, endSessionToast } from '../utils/toast'
import { moneyFormat } from '../utils/moneyFormat'

const CartItems = () => {

  const cartContext = useContext(CartContext)
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      try {
        const data = await getCartItems()
        setCartItems(data)
      } catch (error) {
        if (error.status === 401) {
          cartContext.setCart([])
          endSessionToast()
          navigate('/login/')
        }
      }
    }
    callAPI()
  }, [cartContext, navigate])

  const removeCartItem = async (cartItem) => {
    try {
      const response = await deleteCartItem(cartItem.id)
      cartContext.setCart(response.cart)
      setCartItems(response.cartItems)
      removeCartItemToast(cartItem.product.name)
    } catch (error) {
      cartContext.setCart([])
      navigate('/')
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