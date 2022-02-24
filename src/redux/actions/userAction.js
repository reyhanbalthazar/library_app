import axios from "axios";
import { API_URL } from "../../helper"

export const loginAction = (email, password) => {
    return async (dispatch) => {
        try {
            let response = await axios.post(`${API_URL}/datauser/login`, {
                email, password
            })
            if (response.data.success) {
                localStorage.setItem("data", response.data.dataLogin.token)
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.dataLogin
                })
                return { success: response.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const keepAction = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data');
            if (token) {
                let res = await axios.get(`${API_URL}/datauser/keep`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    localStorage.setItem("data", res.data.dataLogin.token)
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data.dataLogin
                    })
                }
                return { success: res.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const verifyAction = () => {
    return async (dispatch) => {
        try {
            let token = window.location.pathname.split('/')[2]
            if (token) {
                let res = await axios.get(`${API_URL}/datauser/verify`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    localStorage.setItem("data", res.data.dataVerify.token)
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data.dataVerify
                    })
                    return { success: res.data.success }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const logoutAction = () => {
    return {
        type: "LOGOUT"
    }
}

export const updateUserBook = (data) => {
    return {
        type: "UPDATE_BOOK_USER",
        payload: data
    }
}