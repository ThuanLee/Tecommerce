import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CartContext } from '../contexts/cartContext'
import { createOrder } from '../services/orderService'
import { savePaymentResult } from '../services/paymentService'
import { endSessionToast } from '../utils/toast'

const PaymentResultPage = () => {
  
  const cartContext = useContext(CartContext)
  const navigate = useNavigate()

  const [orderId, setOrderId] = useState([])

  const [params] = useSearchParams()

  useEffect(() => {
    if (params.get('vnp_ResponseCode') === '00') {
      const order = JSON.parse(localStorage.getItem('waitForPayment'))
      localStorage.removeItem('waitForPayment')

      const callAPI = async () => {
        try {

          const orderResponse = await createOrder(order)
          cartContext.setCart([])

          setOrderId(orderResponse.id)

          const payment ={
            'order': orderResponse.id,
            'amount': params.get('vnp_Amount'),
            'bank_code': params.get('vnp_BankCode'),
            'bank_trans': params.get('vnp_BankTranNo'),
            'pay_date': params.get('vnp_PayDate'),
            'order_info': params.get('vnp_OrderInfo'),
            'vnp_trans': params.get('vnp_TransactionNo'),
            'vnp_TxnRef': params.get('vnp_TxnRef')
          }

          await savePaymentResult(payment)

        } catch (error) {
          if (error.status === 401) {
            endSessionToast()
            navigate('/login/')
          }
        }
      }

      callAPI()
    }
  }, [])

  return (
    <div>
      <Link to={`/order/${orderId}/`}>Chi tiết đơn hàng</Link>
    </div>
  )
}

export default PaymentResultPage