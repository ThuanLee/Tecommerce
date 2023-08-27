import axios from "../utils/axios";

const signup = async(username, email, password) => {
    let data = {"username": username, "email": email, "password": password}
    return await axios.post('/api/signup/', data)
}

const login = async(username, password) => {
    let data = {"username": username, "password": password}
    return await axios.post('/api/login/', data)
}

const getProfile = async() => {
    return await axios.get(`/api/profile/`)
}

const updateProfile = async(data) => {
    return await axios.put(`/api/profile/`, data)
}

export {signup, login, getProfile, updateProfile}