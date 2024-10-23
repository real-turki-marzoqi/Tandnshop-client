import axios from 'axios'


const baseUrl = axios.create({ baseURL: "https://tandinshop-server.vercel.app" })

export default baseUrl