import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrderDetail, getOrderItems } from '../services/orderService'
import { moneyFormat } from '../utils/money'
import '../styles/OrderDetailPage.css'
import { useEndSession } from '../utils/userAuth'

const OrderDetailPage = () => {

  const params = useParams()
  const orderId = params.id

  const endSession = useEndSession()

  const [order, setOrder] = useState([])
  const [orderItems,setOrderItems] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      try {
        const orderData = await getOrderDetail(orderId)
        setOrder(orderData)
        const orderItemsData = await getOrderItems(orderId)
        setOrderItems(orderItemsData)
      } catch (error) {
        if (error.response.status === 401) {
          endSession()
        }
      }
    }
    callAPI()
  }, [])

  return (
    <div className='order-detail'>
      <div className="container-fluid my-5 d-flex justify-content-center">
        <div className="card card-1">
            <div className="card-body">
                <div className="row justify-content-between mb-3">
                    <div className="col-auto"> <h6 className="mb-0 change-color">Mã đơn hàng</h6> </div>
                    <div className="col-auto"> <small>{order.order_code}</small> </div>
                </div>

                {orderItems.map((orderItem) => (
                <Link to={`/product/${orderItem.product.id}/`}>
                  <div className="row">
                    <div className="col">
                      <div className="card card-2">
                        <div className="card-body">
                          <div className= "row media">

                            <div className="col-sm-1 sq align-self-center "> 
                              <img className="my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0" alt='product-img' src="https://s.cdpn.io/3/dingo-dog-bones.jpg" width="35" height="35" /> 
                            </div>

                            <div className="col-sm-11 media-body my-auto">
                              <h6 className="mb-0">{orderItem.product.name}</h6>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                ))}

                <div className="row mt-4">
                  <div className="col">
                    <div className="row justify-content-between">
                      <div className="col-auto"><p className="mb-1 text-dark"><b>Thông tin đơn hàng</b></p></div>
                      <div className="flex-sm-col text-right col"> <p className="mb-1"><b>Số sản phẩm</b></p></div>
                      <div className="flex-sm-col col-auto"> <p className="mb-1">{orderItems.length}</p></div>
                    </div>
                    <div className="row justify-content-between">
                      <div className="flex-sm-col text-right col"><p className="mb-1"> <b>Tổng</b></p> </div>
                      <div className="flex-sm-col col-auto"><p className="mb-1">{moneyFormat(order.grand_total)}</p></div>
                    </div>
                    <div className="row justify-content-between">
                      <div className="flex-sm-col text-right col"><p className="mb-1"><b>Phí vận chuyển</b></p></div>
                      <div className="flex-sm-col col-auto"><p className="mb-1">{moneyFormat(order.shipping_fee)}</p></div>
                    </div>
                    <div className="row justify-content-between">
                      <div className="flex-sm-col text-right col"><p className="mb-1"><b>Thanh toán</b></p></div>
                      <div className="flex-sm-col col-auto"><p className="mb-1">{moneyFormat(order.grand_total + order.shipping_fee)}</p></div>
                    </div>
                  </div>
                </div>
                
                <div className="row invoice ">
                  <div className="col">
                    <p className="mb-1">Ngày đặt hàng: {order.order_date}</p>
                    <p className="mb-1">Trạng thái đơn hàng: {order.status}</p>
                    <p className="mb-1">Phương thức thanh toán: {order.payment_method}</p>
                  </div>
                </div>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default OrderDetailPage