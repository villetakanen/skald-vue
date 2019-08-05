import Vue from 'vue'
import Router from 'vue-router'
import Reader from './views/Reader.vue'
import Editor from './views/Editor.vue'
import Profile from './views/Profile.vue'
import SiteSetup from './views/SiteSetup.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Reader, props: { name: 'skald.welcome' } },
    { path: '/page/:pageid', component: Reader, props: true },
    { path: '/edit/:pageid', component: Editor, props: true },
    { path: '/settings/profile', component: Profile, props: false },
    { path: '/settings/site/:siteid', component: SiteSetup, props: true }
  ]
})
