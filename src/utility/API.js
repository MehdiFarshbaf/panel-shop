import axios from "axios"
import {appConfig} from "@configs/config"


axios.defaults.headers.common["Content-Type"] = "application/json"
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
axios.defaults.headers.common['Content-Type'] = "multipart/form-data"
axios.defaults.baseURL = appConfig.base_url
axios.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
    return req
}, null)


axios.interceptors.response.use(
    res => {
        return res
    },
    err => {
        // console.log("error is : ",err)
        // console.log(err.response.status)
        // return Promise.reject(err.response)
        // log(err)
        // toast.error(err.message)
        return Promise.reject(err)
    }
)
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch
}