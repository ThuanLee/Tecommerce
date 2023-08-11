import axios from "../utils/axious";

const signup = async(username, email, password) => {
    let data = {"username": username, "email": email, "password": password}
    return await axios.post('/api/signup/', data)
}

export {signup}