import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { getCartItems } from '../services/cartSevice'
import '../styles/OrderPage.css'
import { CartContext } from '../contexts/cartContext'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../services/orderService'

const OrderPage = () => {

  const navigate = useNavigate()

  const cartContext = useContext(CartContext)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      try {
        const data = await getCartItems()
        setCartItems(data)
      } catch (error) {
        if (error.status === 401) {
          navigate('/login/')
        }
      }
    }
    callAPI()
  }, [navigate])

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

  const shippingFeeCaculate = () => {
    const shippingFee = cartContext.cart.grand_total * 0.05
    if (shippingFee > 100000) {
      return 100000 
    }
    return shippingFee
  }

  const orderHandle = async (e) => {
    e.preventDefault()

    const receiver_name = e.target.receiver_name.value
    const phone_number = e.target.phone_number.value
    const address = e.target.address.value
    const note = e.target.note.value
    const payment_method = document.querySelector('input[name="payment-method"]:checked').value;

    const data = {
      "shipping_fee": shippingFeeCaculate(),
      "receiver_name": receiver_name,
      "phone_number": phone_number,
      "address": address,
      "note": note,
      "payment_method": payment_method
    }

    try {
      const response = await createOrder(data)
      cartContext.setCart([])
      navigate(`/order/${response.id}/`)
    } catch (error) {
      if (error.status === 401) {
        navigate('/login/')
      }
    }
  }

  return (
    <div className="order-page container">
      <div className="order-title">
          <h2>Hoàn tất đơn hàng</h2>
      </div>

      <div className='order-content'>

        <form id='order-form' className="order-form" spellCheck={false} autoComplete='off' onSubmit={orderHandle}>
          <div className="receive-info">
            <label>
              <span>Tên người nhận <span className="required">*</span></span>
              <input type="text" name="receiver_name" required />
            </label>
            
            <label>
              <span>Số điện thoại <span className="required">*</span></span>
              <input type="tel" name="phone_number" required /> 
            </label>

            <label>
              <span>Địa chỉ <span className="required">*</span></span>
              <input type="text" name="address" required /> 
            </label>

            <label>
              <span>Ghi chú cho người gửi </span>
              <input type="text" name="note"/>
            </label>
          </div>


          <div className='payment-methods'>
            <div>
              <h4>Phương thức thanh toán</h4>
            </div>
            <div>
              <input type="radio" name="payment-method" value="COD" checked/> Thanh toán khi nhận hàng (COD)
            </div>
            <div>
              <input type="radio" name="payment-method" value="BANKING" /> Thanh toán bằng tài khoản ngân hàng
            </div>
            <p>
              Dùng tài khoản ngân hàng của bạn để thanh toán
            </p>
          </div>

        </form>

        <div className="your-order">
          <table>
            <tr>
              <th colspan="2"><h4>Đơn hàng của bạn</h4></th>
            </tr>
            <tr>
              <td>Số sản phẩm</td>
              <td>{cartContext.cart.quantity_in_cart}</td>
            </tr>
            <tr>
              <td>Tổng tiền</td>
              <td>{moneyFormat(cartContext.cart.grand_total)} VND</td>
            </tr>
            <tr>
              <td>Phí vận chuyển</td>
              <td>{moneyFormat(shippingFeeCaculate())} VND</td>
            </tr>
            <tr>
              <td>Thanh toán</td>
              <td>{moneyFormat(cartContext.cart.grand_total + shippingFeeCaculate())} VND</td>
            </tr>
          </table><br/>

          <div className='place-order'>
            <button form='order-form' type="submit">Đặt hàng</button>
          </div>
        </div>

      </div>


      <div className="order-items">
        <div className="column-labels">
          <label className="product-image">Image</label>
          <label className="product-details">Sản phẩm</label>
          <label className="product-price">Đơn giá</label>
          <label className="product-quantity">Số lượng</label>
          <label className="product-line-price">Tổng</label>
        </div>

        {cartItems.map((cartItem) => (
          <div className="product">
            <div className="product-image">
              <img src="https://s.cdpn.io/3/dingo-dog-bones.jpg" alt='sample'/>
            </div>
            <div className="product-details">
              <div className="product-title"><h5>{cartItem.product.name}</h5></div>
            </div>
            <div className="product-price">{moneyFormat(cartItem.product.price)}</div>
            <div className="product-quantity">{cartItem.quantity}</div>
            <div className="product-line-price">{moneyFormat(cartItem.total)}</div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default OrderPage