import axios from 'axios'

const HTTP = axios.create({
  baseURL: `http://localhost:9090/api/v1/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})

export default HTTP
