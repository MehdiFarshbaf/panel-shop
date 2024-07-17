import axios from "axios"
import {Navigate, useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {handleLogout} from "@store/authentication"
import {appConfig} from '@configs/config'
import log from "eslint-plugin-react/lib/util/log";

export default class JwtService {
    // ** For Refreshing Token
    isAlreadyFetchingAccessToken = false

    // ** For Refreshing Token
    subscribers = []


    constructor(jwtOverrideConfig) {
        this.jwtConfig = {...this.jwtConfig, ...jwtOverrideConfig}
        // ** Request Interceptor
        axios.interceptors.request.use(
            config => {
                // ** Get token from localStorage
                const accessToken = this.getToken("accessToken")
                // ** If token is present add it to request's Authorization Header
                if (accessToken) {
                    // ** eslint-disable-next-line no-param-reassign
                    config.headers['token'] = `${accessToken}`
                    // config.baseURL = "https://api.labniid.com/api"
                    config.baseURL = appConfig.base_url
                }
                return config
            },
            error => Promise.reject(error)
        )
        const API = axios.create({})
        API.navigate = null
        // ** Add request/response interceptor
        axios.interceptors.response.use(
            response => response,
            error => {
                const {config, response} = error


                switch (response && response.status) {
                    case 400:
                        toast.error(response.data.message)
                        break
                    // Unauthorized
                    case 401:
                        localStorage.removeItem('userData')
                        localStorage.removeItem("accessToken")
                        localStorage.removeItem("userRole")
                        toast.error("اجازه دسترسی ندارید توکن نامعتبر!")
                        API.navigate("/login", {replace: true})
                        // axios.navigate("/", { replace: true })
                        break

                    // Unauthenticated
                    case 403:
                        // toast.error("شما مجوز دسترسی به این صفجه را ندارید.")
                        // localStorage.removeItem('userData')
                        // localStorage.removeItem("accessToken")
                        // localStorage.removeItem("userRole")
                        // API.navigate("/auth/not-auth", {replace: true})
                        // toast.error(response.data.message)
                        break

                    // Not found
                    case 404:
                        toast.error(response.data.message)
                        toast.error("آدرس درخواست شده یافت نشد.")

                        // axios.navigate("/not-found", { replace: true });
                        break

                    // Unprocessable content
                    case 422:
                        // toast.error(response.data.message)
                        break

                    // Too many requests
                    case 429:
                        toast.error(
                            "تعداد درخواست‌های شما از حد مجاز عبور کرده است! لطفا بعدا تلاش کنید."
                        )
                        break

                    // Server-side error
                    // case 500:
                    //     toast.error("سرور قطع میباشد یا موارد مجدد بررسی کنید و از صحیح بودن آن اطمینان حاصل نماید")
                    //
                    //     break

                    default:
                        break
                }

                return Promise.reject((error.response && error.response.data) || 'مشکلی وجود دارد')

                // return Promise.reject(error)
            }
        )
    }

    onAccessTokenFetched(accessToken) {
        this.subscribers = this.subscribers.filter(callback => callback(accessToken))
    }

    addSubscriber(callback) {
        this.subscribers.push(callback)
    }

    getToken(storageTokenKeyName) {
        return localStorage.getItem(storageTokenKeyName)
    }

    getRefreshToken() {
        return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
    }

    setToken(value) {
        localStorage.setItem("accessToken", value)
    }

    setRefreshToken(value) {
        localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
    }

    login(...args) {

        return axios.post(args[0].loginEndpoint, ...args)
    }

    register(...args) {
        return axios.post(args[0].RegisterEndpoint, ...args)
    }

    refreshToken() {
        return axios.post(this.jwtConfig.refreshEndpoint, {
            refreshToken: this.getRefreshToken()
        })
    }
}
