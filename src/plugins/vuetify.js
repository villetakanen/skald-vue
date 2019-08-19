import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        // primary: '#ffb300',
        // primary: '#43a047',
        // primary: '#26a69a',
        // primary: '#00b8d4',
        primary: '#039be5',
        // secondary: '#e91e63'
        secondary: '#fbc02d'
        // secondary: '#34515e'
      },
      dark: {
        primary: '#455a64',
        secondary: '#e91e63'
      }
    }
  }
})
