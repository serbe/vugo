import axios from 'axios'
import store from '@/store'
import router from '@/router'

let baseURL = '/api/v1/'

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:9090/api/v1/'
}

const client = axios.create({
  baseURL: baseURL
})

const request = function (options) {
  if (store.getters.isAuth) {
    client.defaults.headers.common['Authorization'] = store.getters.getToken
  }

  const onSuccess = function (response) {
    // console.debug('Request Successful!', response)
    // return response.data
    return response
  }

  const onError = function (error) {
    console.error('Request Failed:', error.config)
    if (error.response) {
      if (error.response.status === 401 && store.getters.isAuth) {
        store.dispatch('logout')
        router.push({name: 'login'})
      }
      console.error('Status:', error.response.status)
      console.error('Data:', error.response.data)
      console.error('Headers:', error.response.headers)
    } else {
      console.error('Error Message:', error.message)
    }
    return Promise.reject(error.response || error.message)
  }

  return client(options)
    .then(onSuccess)
    .catch(onError)
}

export default request
