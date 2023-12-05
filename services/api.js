import axios from 'axios'
import { setLogged } from '../actions/user'
import router from 'next/router'

const config = {
    development: {
        baseURL: 'http://localhost:3001/',
    },
    production: {
        baseURL: 'http://localhost:3001/',
    },
}


const api = axios.create({
    baseURL: config[process.env.NODE_ENV].baseURL,
})

export function setUpInterceptors(store) {
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status == 401) {
                store.dispatch(setLogged(false))
                router.push('/login')
                console.log('REDIRECT')
            }
            return Promise.reject(error)
        }
    )
}

const tmpGet = api.get

api.get = (url, params) => tmpGet(url, { params })

export function loadToken() {
    //localStorage.clear()
    const t = localStorage.getItem('token')
    if (t !== null && router.pathname != '/login') {
        api.defaults.headers.common['Authorization'] = t
    } else {
        //window.location.href = 'login'
    }
}

export function saveToken(token) {
    api.defaults.headers.common['Authorization'] = token
    localStorage.setItem('token', token)
}

export default api