import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../contexts/cartContext'
import '../styles/CartPage.css'

const CartPage = () => {
  const context = useContext(CartContext)

  const shipFee = 15000

  const total = () => {
    let t = 0
    for (let cartItem of context.cart) {
      t += cartItem.quantity * cartItem.price
    }
    return t
  }

  return (
    <div className='cart-page'>
      <h1>Shopping Cart</h1>
      <div className="shopping-cart">

        <div className="column-labels">
          <label className="product-image">Image</label>
          <label className="product-details">Product</label>
          <label className="product-price">Price</label>
          <label className="product-quantity">Quantity</label>
          <label className="product-removal">Remove</label>
          <label className="product-line-price">Total</label>
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
            <div className="product-price">{cartItem.price}</div>
            <div className="product-quantity">
              <input type="number" min="1" value={cartItem.quantity}/>
            </div>
            <div className="product-removal">
              <button className="remove-product">
                Remove
              </button>
            </div>
            <div className="product-line-price">{cartItem.price * cartItem.quantity}</div>
          </div>

        ))}

        <div className="totals">
          <div className="totals-item">
            <label>Subtotal</label>
            <div className="totals-value" id="cart-subtotal">{total()}</div>
          </div>
          <div className="totals-item">
            <label>Shipping</label>
            <div className="totals-value" id="cart-shipping">{shipFee}</div>
          </div>
          <div className="totals-item totals-item-total">
            <label>Grand Total</label>
            <div className="totals-value" id="cart-total">{total() + shipFee}</div>
          </div>
        </div>

        <button className="checkout">Checkout</button>

      </div>
    </div>
  )
}

export default CartPage