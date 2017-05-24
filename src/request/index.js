import axios from 'axios'
import store from '@/store'

let token = store.getters.getToken

const client = axios.create({
  baseURL: `http://localhost:9090/api/v1/`,
  headers: {
    'Authorization': token
  }
})

const request = function (options) {
  const onSuccess = function (response) {
    // console.debug('Request Successful!', response)
    // return response.data
    return response
  }

  const onError = function (error) {
    console.error('Request Failed:', error.config)
    if (error.response) {
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
