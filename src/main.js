import Vue from 'vue'
import './plugins/vuetify'
import App from './App1.vue'
// import router from './router'
import authentication from './authentication'

Vue.config.productionTip = false
authentication.initialize();
// authentication.initialize().then(_ => {
  /*
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  });
  */
    new Vue({
      render: h => h(App),
    }).$mount('#app') 
  

// });