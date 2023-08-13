import axios from "../utils/axious";

const signup = async(username, email, password) => {
    let data = {"username": username, "email": email, "password": password}
    return await axios.post('/api/signup/', data)
}

const login = async(username, password) => {
    let data = {"username": username, "password": password}
    return await axios.post('/api/login/', data)
}

const getProfile = async(userId) => {
    return await axios.get(`/api/profile/${userId}/`)
}

export {signup, login, getProfile}