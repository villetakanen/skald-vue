import Vue from 'vue'
import Router from 'vue-router'
import Reader from './views/Reader.vue'
import Editor from './views/Editor.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Reader, props: { name: 'skald.welcome' } },
    { path: '/page/:name', component: Reader, props: true },
    { path: '/edit/:name', component: Editor, props: true }
  ]
})
