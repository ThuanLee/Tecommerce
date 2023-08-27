import axios from "../utils/axios"

const createOrder = async (data) => {
    return await axios.post('api/order/create/', data)
}

const getOrderList = async () => {
    return await axios.get('api/order/all/')
}

const getOrderDetail = async (orderId) => {
    return await axios.get(`api/order/${orderId}/`)
}

const getOrderItems = async (orderId) => {
    return await axios.get(`api/order/items/${orderId}/`)
}

export {createOrder, getOrderList, getOrderDetail, getOrderItems}