import axios from "../utils/axious";

const getProductList = async () => {
    try {
        return await axios.get('/api/products/')
    } catch (err) {
        console.log(err.message)
    }
}

const getProduct = async(id) => {
    try {
        return await axios.get(`/api/product/${id}/`)
    } catch (err) {
        console.log(err.message)
    }
}

export {getProductList, getProduct}