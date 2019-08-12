import Vue from 'vue'
import Router from 'vue-router'
import Reader from './views/Reader.vue'
import Editor from './views/Editor.vue'
import Profile from './views/Profile.vue'
import SiteSetup from './views/SiteSetup.vue'
import ListSites from './views/ListSites.vue'
import ListPages from './views/ListPages'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Reader, props: { siteid: 'skald' } },
    // removed in favour of /v/:siteid and /v/:siteid/:pageid
    // { path: '/page/:pageid', component: Reader, props: true },
    // { path: '/edit/:pageid', component: Editor, props: true },
    { path: '/c/profile', component: Profile, props: false },
    { path: '/c/site/:siteid', component: SiteSetup, props: true },
    { path: '/e/:siteid/:pageid', component: Editor, props: true },
    { path: '/l/sites', component: ListSites, props: false },
    { path: '/l/pages/:siteid', component: ListPages, props: true },
    { path: '/v/:siteid', component: Reader, props: true },
    { path: '/v/:siteid/:pageid', component: Reader, props: true }
  ]
})
