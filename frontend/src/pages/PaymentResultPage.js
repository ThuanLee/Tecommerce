import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CartContext } from '../contexts/cartContext'
import { createOrder } from '../services/orderService'
import { savePaymentResult } from '../services/paymentService'
import { useEndSession } from '../utils/userAuth'

const PaymentResultPage = () => {
  
  const cartContext = useContext(CartContext)
  const endSession = useEndSession()
  const navigate = useNavigate()

  const [params] = useSearchParams()

  useEffect(() => {
    if (params.get('vnp_ResponseCode') === '00') {
      const order = JSON.parse(localStorage.getItem('waitForPayment'))
      localStorage.removeItem('waitForPayment')

      const callAPI = async () => {
        try {

          const orderResponse = await createOrder(order)
          cartContext.setCart([])

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

          const paymentResponse = await savePaymentResult(payment)

          if (paymentResponse) {
            navigate(`/order/${orderResponse.id}/`, {replace: true})
          }

        } catch (error) {
          if (error.status === 401) {
            endSession()
          }
        }
      }
      callAPI()
    }
  }, [])

  return (
    <div>
    </div>
  )
}

export default PaymentResultPage