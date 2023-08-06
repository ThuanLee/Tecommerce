import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../contexts/cartContext'
import { toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CartItems = () => {
  const context = useContext(CartContext)

  const shipFee = 10000

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
      transition: Flip,
      theme: "light",
    });
  }

  const total = () => {
    let t = 0
    for (let cartItem of context.cart) {
      t += cartItem.quantity * cartItem.price
    }
    return t
  }

  const moneyFormat = (money) => {
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

  const removeCartItem = (cartItem) => {
    let cart = JSON.parse(localStorage.getItem('cart') || "[]")

    let index = -1
    for (let i in cart) {
      if (cart[i].id === cartItem.id) {
        index = i
        break
      }
    }
    cart.splice(index, 1)

    context.setCart(cart)
    localStorage.setItem('cart', JSON.stringify(cart))

    successToast(cartItem.name)
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

      {context.cart.map((cartItem, index) => (

        <div className="product">
          <div className="product-image">
            <img src="https://s.cdpn.io/3/dingo-dog-bones.jpg"/>
          </div>
          <div className="product-details">
            <div className="product-title">{cartItem.name}</div>
            <p className="product-description">{cartItem.description}</p>
          </div>
          <div className="product-price">{moneyFormat(cartItem.price)}</div>
          <div className="product-quantity">{cartItem.quantity}</div>
          <div className="product-removal">
            <button className="remove-product" onClick={() => removeCartItem(cartItem)}>
              Xóa
            </button>
          </div>
          <div className="product-line-price">{moneyFormat(cartItem.price * cartItem.quantity)}</div>
        </div>

      ))}

      <div className="totals">
        <div className="totals-item">
          <label>Tạm tính</label>
          <div className="totals-value" id="cart-subtotal">{moneyFormat(total())}</div>
        </div>
        <div className="totals-item">
          <label>Phí vận chuyển</label>
          <div className="totals-value" id="cart-shipping">{moneyFormat(shipFee)}</div>
        </div>
        <div className="totals-item totals-item-total">
          <label>Tổng cộng</label>
          <div className="totals-value" id="cart-total">{moneyFormat(total() + shipFee)}</div>
        </div>
      </div>

      <button className="checkout">Đặt hàng</button>

    </div>
  )
}

export default CartItems