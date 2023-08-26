import axios from '../utils/axious'

const getPaymentURL = async (amount) => {
    const data = {"amount": amount}
    return await axios.post('api/payment/create/', data)
}

const savePaymentResult = async (data) => {
    return await axios.post('api/payment/save/', data)
}

export { getPaymentURL, savePaymentResult }