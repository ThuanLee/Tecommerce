import axios from "../utils/axios";

const getProductList = async (page) => {
    return (await axios.get(`/api/products/all/?page=${page}`))
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

const searchProduct = async(query, page) => {
    return await axios.post(`/api/search/?page=${page}`, {'query': query})
}

export {getProductList, getProduct, getCategoryList, getProductByCategory, searchProduct}