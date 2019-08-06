import Vue from 'vue'
import Router from 'vue-router'
import Reader from './views/Reader.vue'
import Editor from './views/Editor.vue'
import Profile from './views/Profile.vue'
import SiteSetup from './views/SiteSetup.vue'
import SiteList from './views/SiteList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Reader, props: { siteid: 'skald' } },
    // removed in favour of /v/:siteid and /v/:siteid/:pageid
    // { path: '/page/:pageid', component: Reader, props: true },
    { path: '/edit/:pageid', component: Editor, props: true },
    { path: '/settings/profile', component: Profile, props: false },
    { path: '/c/site/:siteid', component: SiteSetup, props: true },
    { path: '/l/sites', component: SiteList, props: false },
    { path: '/v/:siteid', component: Reader, props: true },
    { path: '/v/:siteid/:pageid', component: Reader, props: true }
  ]
})
