import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOrderList } from '../services/orderService'
import { useEndSession } from '../utils/userAuth'
import '../styles/OrderListPage.css'
import { moneyFormat } from '../utils/money'


const OrderList = () => {

  const endSession = useEndSession()

  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      try {
        const data = await getOrderList()
        setOrderList(data)
      } catch (error) {
        if (error.status === 401) {
          endSession()
        }
      }
    }
    callAPI()
  }, [])

  return (
    <div className='container order-list'>
      <h2 className='pb-4 row justify-content-center'>Đơn hàng của tôi</h2>
      <div className='row label'>
        <div className='col-1'>STT</div>
        <div className='col-3'>Mã đơn hàng</div>
        <div className='col-2'>Tổng giá trị</div>
        <div className='col-2'>Ngày đặt hàng</div>
        <div className='col-2'>Hình thức thanh toán</div>
        <div className='col-2'>Tình trạng đơn hàng</div>
      </div>

      {orderList.map((order, index) => (
        <Link className='row order' to={`/order/${order.id}/`}>
          <div className='col-1 order-index'>
            {index + 1}
          </div>

          <div className='col-3 order-code'>
            {order.order_code}
          </div>
          
          <div className='col-2 order-amount'>
            {moneyFormat(order.grand_total + order.shipping_fee)}
          </div>

          <div className='col-2 order-date'>
            {order.order_date.split(" ")[1]}
          </div>

          <div className='col-2 payment-method'>
            {(order.payment_method === "Thanh toán khi nhận hàng") ? "COD"  : "BANKING"}
          </div>

          <div className='col-2 order-status'>
            {order.status}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default OrderList