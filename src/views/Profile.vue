<template>
    <v-container
        fluid
        fill-height
      >
        <v-layout>
          <v-flex sx12>
            <h1> Hey, its you! </h1>
          </v-flex>
          <v-flex sx3>
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
                        userphoto: {{user.photoURL}} <br/>
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
    user () {
      console.log(this.$store.state.user)
      return this.$store.state.user
    },
    logged () {
      // console.log(this.$store.state.user.name)
      return this.$store.state.user != null
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
      }).catch(function (error) {
        console.log('logout failed ' + error)
      })
    }
  }
}
</script>
