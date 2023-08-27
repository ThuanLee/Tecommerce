import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOrderList } from '../services/orderService'
import { useEndSession } from '../utils/userAuth'


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
    <div>
      <h3>Đơn hàng của bạn</h3>
      {
        orderList.map((order) => (
          <div>
            <Link to={`/order/${order.id}/`}>
              {order.order_code}
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default OrderList