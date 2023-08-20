import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../contexts/cartContext'
import { deleteCartItem, getCartItems } from '../services/cartSevice'
import { removeCartItemToast } from '../utils/toast'
import { getUserId } from '../utils/userAuth'

const CartItems = () => {

  const cartContext = useContext(CartContext)
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      try {
        const data = await getCartItems(getUserId())
        setCartItems(data)
      } catch (error) {
        cartContext.setCart([])
        navigate('/')
      }
    }
    callAPI()
  }, [cartContext, navigate])

  const moneyFormat = (money) => {
    money = Math.round(money)
    if (money < 1000) return (<small>{money}</small>)
    money = money.toString()
    let formattedMoney = ""
    for (let i = money.length - 1; i >= 0; i--) {
      formattedMoney = money[i] + formattedMoney
      if ((money.length - i) % 3 === 0 && (i !== 0)) {
        formattedMoney = "." + formattedMoney
      }
    }
    return (
      <span>
        {formattedMoney.slice(0, formattedMoney.length-3)}
        <small>{formattedMoney.slice(formattedMoney.length-3, formattedMoney.length)}</small>
      </span>
    )
  }

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
        <label className="product-image">Image</label>
        <label className="product-details">Product</label>
        <label className="product-price">Đơn giá</label>
        <label className="product-quantity">Số lượng</label>
        <label className="product-removal">Xóa</label>
        <label className="product-line-price">Tổng</label>
      </div>

      {cartItems.map((cartItem, index) => (

        <div className="product">
          <div className="product-image">
            <img src="https://s.cdpn.io/3/dingo-dog-bones.jpg" alt='sample'/>
          </div>
          <div className="product-details">
            <div className="product-title">{cartItem.product.name}</div>
            <p className="product-description">{cartItem.product.description}</p>
          </div>
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
        <div className="totals-item">
          <label>Tạm tính</label>
          <div className="totals-value" id="cart-subtotal">{moneyFormat(cartContext.cart.grand_total)}</div>
        </div>
        <div className="totals-item">
          <label>Phí vận chuyển</label>
          <div className="totals-value" id="cart-shipping">{moneyFormat(cartContext.cart.grand_total * 0.1)}</div>
        </div>
        <div className="totals-item totals-item-total">
          <label>Tổng cộng</label>
          <div className="totals-value" id="cart-total">{moneyFormat(cartContext.cart.grand_total * 1.1)}</div>
        </div>
      </div>

      <button className="checkout">Đặt hàng</button>

    </div>
  )
}

export default CartItems