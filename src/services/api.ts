import axios from "axios";

export const apiUrl = 'http://192.168.0.11:7071'

const api = axios.create({
  baseURL: `${apiUrl}/greenhelp`
})

export default api