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







axios.defaults.baseURL = "http://localhost:3000/"
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
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
      if (token) {
        config.headers.common.authorization= `Bearer ${token}`
      }
      return config
    },
    error => Promise.reject(error),
  )
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
)
const app = createApp(App)
const options = {
    // You can set your default options here
};

app.use(Toast, options);
app.use(router)
app.use(VueLoading)
app.mount('#app')
