import axios from "../utils/axious";

const getProductList = async () => {
    return await axios.get('/api/products/')
}

const getProduct = async(id) => {
    return await axios.get(`/api/product/${id}/`)
}

export {getProductList, getProduct}