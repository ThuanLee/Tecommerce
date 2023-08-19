import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../contexts/cartContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { deleteCartItem, getCartItems } from '../services/cartSevice'
import jwt_decode from 'jwt-decode'

const CartItems = () => {

  const cartContext = useContext(CartContext)
  const navigate = useNavigate()

  const successToast= (productName) => {
    let message = '🦄 Xóa "' + productName + '" khỏi giỏ hàng!!'
    toast(message, {
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

  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        const userId = jwt_decode(token.access).user_id
        const data = await getCartItems(userId)
        setCartItems(data)
      } catch (error) {
        cartContext.setCart([])
        navigate('/')
      }
    }
    callAPI()
  }, [])

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
      successToast(cartItem.product.name)
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