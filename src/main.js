import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import '@/assets/CSS/global.css'
//导入字体图标
import './assets/fonts/iconfont.css'
import './assets/font_lock/iconfont.css'

//引入js文件
import './mock/index.js'
import './mock/api.js'

import axios from 'axios'
import VueAxios from 'vue-axios'

// //配置请求的根路径
axios.defaults.baseURL="http://10.147.26.177:8080/readingannotation/"
// axios.interceptors.request.use(config=>{
//   //在最后必须return config
//   console.log(config)
//   config.headers.Authorization=window.sessionStorage.getItem('token')
// })
// Vue.prototype.$http=axios



Vue.use(VueAxios,axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
