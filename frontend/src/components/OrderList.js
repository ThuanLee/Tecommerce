import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getOrderList } from '../services/orderService'
import { endSessionToast } from '../utils/toast'

const OrderList = () => {

  const navigate = useNavigate()

  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      try {
        const data = await getOrderList()
        setOrderList(data)
      } catch (error) {
        if (error.status === 401) {
          endSessionToast()
          navigate('/login/')
        }
      }
    }
    callAPI()
  }, [navigate])

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