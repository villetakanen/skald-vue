<template>
  <div>
    <v-btn
      v-if="!nick"
      text
      @click="dialog=!dialog"
      >
      <v-icon>mdi-login</v-icon>
        &nbsp;{{$t("login-button")}}
    </v-btn>
    <v-btn
      v-if="nick"
      fab
      outlined
      small
      to="/c/profile">
        {{nick}}
      </v-btn>
      <v-dialog
      v-model="dialog"
      max-width="500px"
      >
      <v-card>
        <v-card-title>{{$t("loginTitle")}}</v-card-title>
        <v-card-text>
          <v-container>
            <div><p>{{$t("loginMessage")}}</p></div>
            <v-btn
              outlined
              rounded
              large
              color="primary"
              @click="socialGoogleLogin">
              <img style="width:28px" src="../assets/google-logo.svg"/>
              <span style="padding-left:11px">{{$t("loginSignWithGoogle")}}</span>
            </v-btn>

            <br/><br/>

            <v-btn
              outlined
              rounded
              large
              color="primary"
              @click="socialFacebookLogin">
              <v-icon>mdi-facebook</v-icon>
              <span style="padding-left:11px">{{$t("loginSignWithFacebook")}}</span>
            </v-btn>

            <div><p><br/>{{$t("loginPs")}}</p></div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="primary"
            @click="dialog=!dialog">
            {{$t("cancel")}}
          </v-btn>
      </v-card-actions>
     </v-card>
     </v-dialog>
    </div>
</template>
<script>
import firebase from 'firebase'

export default {
  data: () => ({
    dialog: false,
    nick: null
  }),
  methods: {
    socialGoogleLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        // console.log('user is' + result.user.displayName)
        this.$store.commit('setActiveUser', result.user)
        this.$store.dispatch('getProfile', result.user.uid)
        // this.$router.push('/')
      }).catch(function (error) {
        console.log(error.message)
      })
      this.dialog = !this.dialog
    },
    socialFacebookLogin () {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        console.log('user is' + result.user)
        this.$store.commit('setActiveUser', result.user)
        this.$store.dispatch('getProfile', result.user.uid)
        // this.$router.push('/')
      }).catch((error) => {
        console.log(error.message)
        this.$store.commit('error', error.message)
      })
      this.dialog = !this.dialog
    }
  },
  mounted () {
    this.$store.subscribe((mutation, state) => {
      // console.log(mutation.type)
      switch (mutation.type) {
        case 'creator/setCreator':
          var nick = state.creator.nick

          console.log(`Updating to ${nick}`)
          if (nick !== null) this.nick = nick.substring(0, 1) // .substring(0, 1)

          break
      }
    })
  }
}
</script>
