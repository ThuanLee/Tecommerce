import axios from '../utils/axious'

const getCart = async (userId) => {
    return await axios.get(`api/cart/${userId}/`)
}

const getCartItems = async (userId) => {
    return await axios.get(`api/cart/items/${userId}/`)
}

const addCartItem = async (userId, productId, quantity) => {
    const data = {"productId": productId, "quantity": quantity}
    return await axios.post(`api/cart/items/${userId}/`, data)
}

const deleteCartItem = async (cartItemId) => {
    return await axios.delete(`api/cart/items/delete/${cartItemId}/`)
}

export {getCart, getCartItems, addCartItem, deleteCartItem}