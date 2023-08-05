import axios from "../utils/axious";

const getProductList = async () => {
    return await axios.get('/api/products/all/')
}

const getProduct = async(productId) => {
    return await axios.get(`/api/product/${productId}/`)
}

const getProductByCategory = async(categoryId) => {
    return await axios.get(`/api/products/${categoryId}/`)
}

const getCategoryList = async () => {
    return await axios.get('/api/categories/')
}

const searchProduct = async(query) => {
    return await axios.post('/api/search/', {'query': query})
}

export {getProductList, getProduct, getCategoryList, getProductByCategory, searchProduct}