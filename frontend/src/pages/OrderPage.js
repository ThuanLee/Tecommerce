import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { getCartItems } from '../services/cartSevice'
import '../styles/OrderPage.css'
import { CartContext } from '../contexts/cartContext'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../services/orderService'
import { getPaymentURL } from '../services/paymentService'
import { endSessionToast } from '../utils/toast'
import { moneyFormat } from '../utils/moneyFormat'

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
          endSessionToast()
          navigate('/login/')
        }
      }
    }
    callAPI()
  }, [navigate])

  const shippingFeeCaculate = () => {
    const shippingFee = cartContext.cart.grand_total * 0.05
    if (shippingFee > 100000) {
      return 100000 
    } else if (shippingFee < 10000) {
      return 10000
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

    if (payment_method === "BANKING") {
      const response = await getPaymentURL(cartContext.cart.grand_total + shippingFeeCaculate())
      localStorage.setItem('waitForPayment', JSON.stringify(data))
      window.location.href = response
    } else {
      try {
        const response = await createOrder(data)
        cartContext.setCart([])
        navigate(`/order/${response.id}/`)
      } catch (error) {
        if (error.status === 401) {
          endSessionToast()
          navigate('/login/')
        }
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
              <td>{moneyFormat(cartContext.cart.grand_total)}</td>
            </tr>
            <tr>
              <td>Phí vận chuyển</td>
              <td>{moneyFormat(shippingFeeCaculate())}</td>
            </tr>
            <tr>
              <td>Thanh toán</td>
              <td>{moneyFormat(cartContext.cart.grand_total + shippingFeeCaculate())}</td>
            </tr>
          </table><br/>

          <div className='place-order'>
            <button form='order-form' type="submit">Đặt hàng</button>
          </div>
        </div>

      </div>


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
            <div className="product-title"><p>{cartItem.product.name}</p></div>
            <div className="product-price">{moneyFormat(cartItem.product.price)}</div>
            <div className="product-quantity">{cartItem.quantity}</div>
            <div className='product-removal'>x</div>
            <div className="product-line-price">{moneyFormat(cartItem.total)}</div>
          </div>

        ))}
      </div>

    </div>
  )
}

export default OrderPage