import Vue from 'vue'
import Router from 'vue-router'
import Reader from './views/Reader.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Reader },
    { path: '/page/:name', component: Reader, props: true }
  ]
})
