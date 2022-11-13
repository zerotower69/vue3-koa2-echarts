import axios from 'axios'
// axios.defaults.baseURL = 'http://192.168.2.87:8888/api'
axios.defaults.baseURL =process.env.VUE_APP_URL
export default axios
