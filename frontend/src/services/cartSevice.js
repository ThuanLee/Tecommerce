import axios from '../utils/axious'

const getCart = async () => {
    return await axios.get(`api/cart/`)
}

const getCartItems = async () => {
    return await axios.get(`api/cart/items/`)
}

const addCartItem = async (productId, quantity) => {
    const data = {"productId": productId, "quantity": quantity}
    return await axios.post(`api/cart/items/`, data)
}

const deleteCartItem = async (cartItemId) => {
    return await axios.delete(`api/cart/items/delete/${cartItemId}/`)
}

export {getCart, getCartItems, addCartItem, deleteCartItem}