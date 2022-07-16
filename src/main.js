import { createApp } from 'vue'
import App from './App.vue'
import router from './components/router'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";




// Optional, since every component import their Bootstrap functionality
// the following line is not necessary
// import 'bootstrap'







// axios.defaults.baseURL = "https://cicdtutorial10.herokuapp.com/"
// axios.defaults.baseURL = "http://localhost:5000"
// let token = localStorage.getItem('token')
/* axios.interceptors.request.use(
    function (config) {
        config.headers.authorization= `Bearer ${token}`
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
) */
/* axios.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
      if (accessToken) {
        config.headers.common.authorization= `Bearer ${accessToken}`
      }
      return config
    },
    error => Promise.reject(error),
  )
axios.interceptors.response.use(
    (response => response),
    (error => Promise.reject(error))
) */



axios.defaults.baseURL = "http://localhost:5000"
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.authorization= `Bearer ${token}`; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 403 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const rs = await axios.post("/auth/token", {
          refreshToken: localStorage.getItem("refreshToken"),
        });
        const { accessToken } = rs.data;
        localStorage.setItem("accessToken", accessToken);
        return axios(originalConfig);
      } catch (_error) {
        localStorage.clear()
        return Promise.reject(_error);
      }
    }
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      localStorage.clear()
      router.push({name: "login"});
    }
  }
);






const app = createApp(App)
const options = {
    // You can set your default options here
};

app.use(Toast, options);
app.use(router)
app.use(VueLoading)
app.mount('#app')
