import axios from 'axios'
import store from '@/store'

let token = store.getters.getAuth

const http = axios.create({
  baseURL: `http://localhost:9090/`,
  headers: {
    Authorization: token
  }
})

export default http
