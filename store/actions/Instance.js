import axios from "axios"
import {store} from "../index";
import {LogoutAction} from "./AuthActions";


const axiosInstance = axios.create({ baseURL: process.env.BASE_URL })

const handleSuccess = async (res) => {
    res.headers['Accept'] = 'application/json'
    res.headers['Content-Type'] = 'application/json'
    res.headers['Content-Type'] = 'multipart/form-data'

    const token = localStorage.getItem('token')
    if (token && token !== null) {
        res.headers['Authorization'] = `Bearer ${token}`
    }
    store.dispatch({type: 'GET_ERR_SUCCESS', payload: null})
    return res
}


async function handleError(err) {
    if (err) {
        const originalRequest = err.config
        if (err.response && err.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            const refresh = localStorage.getItem('refresh')

            if(refresh) {
                return axiosInstance.post(`api/token/refresh/`,
                    {
                        refresh: refresh,
                    })
                    .then(async (res) => {
                        if (res.status === 200) {
                            localStorage.setItem('refresh', null)
                            localStorage.setItem('token', res.data.access)
                            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`
                            return axios(originalRequest)
                        }
                    }).catch((err) => {
                        store.dispatch(LogoutAction())
                    })
            } else {
                store.dispatch(LogoutAction(() => window.location.assign('/')))
            }
        }  else {
            store.dispatch({type: 'GET_ERR_SUCCESS', payload: err.response})
        }
        return Promise.reject(err)
    }
}

axiosInstance.interceptors.request.use(handleSuccess, null)
axiosInstance.interceptors.response.use(null, handleError)
export default axiosInstance
