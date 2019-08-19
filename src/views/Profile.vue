<template>
  <v-container fluid grid-list-md>
    <v-layout>
      <v-flex xs12 md6>
          <v-card>
            <v-toolbar dark>
              <v-toolbar-title>{{$t('cp-profile-title')}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!profileValid"
                color="primary"
                @click="updateProfile">{{$t("save")}}</v-btn>
            </v-toolbar>
            <v-card-text>
              <v-form
                v-model="profileValid"
                @submit.prevent="savePage">
              <v-text-field
                label="Nickname"
                filled
                v-bind:placeholder="displayname"
                v-model="nick"
                :rules="[v => !(taken.includes(v)) || 'Nick in use']"
                ></v-text-field>
              <v-select
                :items="langs"
                v-model="locale"
                prepend-icon="mdi-flag"
                :label="$t('setLocale')"></v-select>
              </v-form>
            </v-card-text>
          </v-card>
          </v-flex>
          <v-flex xs12 md6>
            <v-card>
              <v-toolbar dark>
              <v-toolbar-title>{{$t('cp-account-title')}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="logout">{{$t("logout")}}</v-btn>
            </v-toolbar>
            <v-card-text>
              <img v-bind:src="user.photoURL" style="height:64px;width:64px"/><br/>
              displayName: {{user.displayName}} <br/>
              email: {{user.email}} <br/>
              uid: {{user.uid}} <br/>
            </v-card-text>
          </v-card>
        </v-flex>
    </v-layout>
      <v-layout>
        <v-flex xs12 md4>
          <v-card>
            <v-card-title>{{$t("cp-editor-settings")}}</v-card-title>
            <v-card-text>
              <template v-if="editorPreview">
                <v-btn icon
                  @click="editorPreview=!editorPreview">
                  <v-icon color="primary">mdi-eye</v-icon>
                </v-btn> {{$t("cp-editor-preview-on")}}
              </template>
              <template v-if="!editorPreview">
                <v-btn icon
                    @click="editorPreview=!editorPreview">
                <v-icon>mdi-eye-off</v-icon>
                </v-btn> {{$t("cp-editor-preview-off")}}
              </template>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>
<script>
import firebase from 'firebase'
export default {
  computed: {
    taken () {
      // const n = this.$store.getters['users/nicks'](this.$store.state.creator.nick)

      return this.$store.getters['users/nicks'](this.$store.state.creator.nick)
    },
    displayname () {
      return this.$store.state.creator.displayname
    },
    user () {
      // console.log(this.$store.state.user)
      return this.$store.state.user
    },
    logged () {
      // console.log(this.$store.state.user.name)
      return this.$store.state.user != null
    },
    nickname: {
      get () {
        return this.$store.state.profile.nick || null
      },
      set (value) {
        this.$store.commit('updateProfile', value, this.name)
      }
    },
    editorPreview: {
      get () {
        return this.$store.state.creator.editorPreview
      },
      set (value) {
        // console.log('setting editorPreview to')
        this.$store.dispatch('creator/updateEditorPreview', value)
      }
    }
  },
  created () {
    this.nick = this.$store.state.creator.nick
    this.locale = this.$store.state.creator.locale
    this.$store.dispatch('users/getAll')
    // console.log(this.nick)
    /* this.updatePage(this.siteid, this.pageid)
    this.$store.dispatch('binder/openPage', { siteid: this.siteid, pageid: this.pageid }) */
  },
  data: () => ({
    profileValid: true,
    langs: ['fi', 'en'],
    nick: '',
    locale: 'en' // ,
    // editorPreview: true
  }),
  methods: {
    saveProfile (name) {
      // console.log('saveProfile(' + name + ')')
      this.$store.dispatch('saveProfile', name)
    },
    updateNick (e) {
      // console.log(e)
      this.$store.commit('setNick', e)
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$store.dispatch('creator/logout')
        this.$router.push('/')
      }).catch(function (error) {
        console.log('logout failed ' + error)
      })
    },
    setLang (l) {
      this.$i18n.locale = l
      this.$store.commit('setLocale', l)
    },
    updateProfile () {
      console.log('updateProfile', this.nick, this.locale, this.$store.state.creator.uid)
      this.$store.dispatch('creator/update', { uid: this.$store.state.creator.uid, nick: this.nick, locale: this.locale })
    }
  },
  mounted () {
    this.$store.subscribe((mutation, state) => {
      // console.log(mutation.type)
      switch (mutation.type) {
        case 'creator/setCreator':
          this.nick = state.creator.nick
          this.locale = state.creator.locale
          break
      }
    })
  }
}
</script>
