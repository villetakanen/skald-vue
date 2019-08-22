import Vue from 'vue'
import Router from 'vue-router'
import Reader from './views/Reader.vue'
import Editor from './views/Editor.vue'
import Profile from './views/Profile.vue'
import SiteSetup from './views/SiteSetup.vue'
import ListSites from './views/ListSites.vue'
import ListPages from './views/ListPages.vue'
import ListAttachments from './views/ListAttachments'
import Portal from './views/Portal'
import Bio from './views/Bio'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Reader, props: { siteid: 'skald' } },
    { path: '/c/profile', component: Profile, props: false },
    { path: '/c/site/:siteid', component: SiteSetup, props: true },
    { path: '/e/:siteid/:pageid', component: Editor, props: true },
    { path: '/l/sites', component: ListSites, props: false },
    { path: '/l/attachments/:siteid', component: ListAttachments, props: true },
    { path: '/l/pages/:siteid', component: ListPages, props: true },
    { path: '/v/:siteid', component: Reader, props: true },
    { path: '/v/:siteid/:pageid', component: Reader, props: true },
    { path: '/b/:nick', component: Bio, props: true },
    { path: '/meta/portal', component: Portal, props: false }
  ]
})
