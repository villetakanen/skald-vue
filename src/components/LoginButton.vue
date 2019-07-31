<template>
    <div>
      <v-btn
        v-if="!displayname"
        color="secondary"
        @click="dialog=!dialog">
        <v-icon>mdi-login</v-icon>
        &nbsp;{{$t("login-button")}} {{displayname}}
      </v-btn>
    <v-btn
      v-if="displayname"
      text
      :to="'/settings/'+displayname" >
        {{displayname}}
      </v-btn>
      <v-dialog
      v-model="dialog"
      max-width="800"
     >
     <v-card color="pink darken-1" dark>
      <v-card-title class="pink darken-3">Login</v-card-title>
      <v-card-text>
      <v-card-actions>
              <v-btn>
                  <v-icon @click="socialGoogleLogin">mdi-google</v-icon>
              </v-btn>
              <v-btn>
                  <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn>
                  <v-icon>mdi-github-circle</v-icon>
              </v-btn>
      </v-card-actions>
      </v-card-text>
     </v-card>
     </v-dialog>
    </div>
</template>
<script>
import firebase from 'firebase'

export default {
  computed: {
    displayname () {
      // console.log(this.$store.state.user.name)
      console.log('d:', this.$store.state.user)
      if (typeof this.$store.state.user === 'undefined' || this.$store.state.user === null) {
        console.log('is null')
        return null
      }
      // console.log('d:' + this.$store.state.user)
      return this.$store.state.user.displayName
    }
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    socialGoogleLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        console.log('user is' + result.user.displayName)
        this.$store.commit('setActiveUser', result.user)
        // this.$router.push('/')
      }).catch(function (error) {
        console.log(error.message)
      })
      this.dialog = !this.dialog
    }
  }
}
</script>
