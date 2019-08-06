<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 md12>
        <h1>{{$t("cp-intro")}}</h1>
      </v-flex>
    </v-layout>
    <v-layout>
    <v-flex xs6 md6>
      <v-form @submit.prevent="savePage">
        <v-card>
          <v-card-title>{{$t("cp-profile-title")}}</v-card-title>
            <v-card-text>
              <v-text-field
                label="Nickname"
                filled
                v-bind:placeholder="user.displayName"
                v-bind:value="nickname"
                @input="updateNick"
                ></v-text-field>
                        <v-flex xs12 sm6 d-flex>
                          <v-select
                            :items="langs"
                            label="Language"
                            @input="setLang"
                          ></v-select>
                        </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-card-actions>
                      <v-btn @click="saveProfile(user.uid)">Save</v-btn>
                  </v-card-actions>
                </v-card-actions>
            </v-card>
            </v-form>
          </v-flex>
          <v-flex xs6>
              <v-card>
                  <v-card-title>
                      Data provided by SSO
                  </v-card-title>
                  <v-card-text>
                      <div style="padding:0.5em; border: solid 1px grey; float: right">
                        <img v-bind:src="user.photoURL" style="height:64px;width:64px"/>
                      </div>
                      <div>
                        displayName: {{user.displayName}} <br/>
                        email: {{user.email}} <br/>
                        uid: {{user.uid}} <br/>
                      </div>
                  </v-card-text>
                  <v-card-actions>
                      <v-btn @click="logout">logout</v-btn>
                  </v-card-actions>
              </v-card>
          </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import firebase from 'firebase'
export default {
  computed: {
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
    }
  },
  data: () => ({
    langs: ['fi', 'en']
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
        this.$router.push('/')
      }).catch(function (error) {
        console.log('logout failed ' + error)
      })
    },
    setLang (l) {
      this.$i18n.locale = l
      this.$store.commit('setLocale', l)
    }
  }
}
</script>
