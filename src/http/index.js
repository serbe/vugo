import axios from 'axios'
import store from '@/store'

let token = store.getters.getToken

const http = axios.create({
  baseURL: `http://localhost:9090/api/v1/`,
  headers: {
    'Authorization': token
  }
})

export default http
