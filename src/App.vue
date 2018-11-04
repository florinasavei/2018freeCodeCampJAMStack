<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span><img height="20" width="30" src="http://www.stickpng.com/assets/images/5847f91ccef1014c0b5e48b8.png"></span>
        <span class="font-weight-light"> MOVIE APP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    <div>
    <facebook-login class="btn"
      appId="570316863426221"
      @login="onLogin"
      @logout="onLogout"
      @sdk-loaded="sdkLoaded">
    </facebook-login>
    </div>
    </v-toolbar>

    <v-content>
      <HomeView/>
    </v-content>
  </v-app>
</template>

<script>
import { EventBus } from "./event-bus.js";
import HomeView from "./views/Home";
import facebookLogin from 'facebook-login-vuejs';
export default {
  name: "App",
  components: {
    HomeView,
    facebookLogin
  },
  data() {
    return {
      isConnected: false,
      name: '',
      email: '',
      personalID: '',
      FB: undefined
    }
  },
  methods: {
    getUserData() {
      this.FB.api('/me', 'GET', { fields: 'id,name,email' },
        userInformation => {
          this.personalID = userInformation.id;
          this.email = userInformation.email;
          this.name = userInformation.name;
          this.$store.state.loggedUser = {id:userInformation.id, name:userInformation.name };
          EventBus.$emit("addedToFavorites", this.clickCount);
        }
      )
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      if (this.isConnected) this.getUserData()
    },
    onLogin() {
      this.isConnected = true
      this.getUserData()
    },
    onLogout() {
      this.isConnected = false;
      this.name='';
      this.email='';
      this.personalID='';
      this.loggedUser= {
        id: null,
        name: 'John Doe'
      };
      this.$store.state.myFavoriteMovies = [];
      EventBus.$emit("addedToFavorites", this.clickCount);
    }
  }
};
</script>

<style>
.information {
  margin-top: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.well {
  background-color: rgb(191, 238, 229);
  margin: auto;
  padding: 50px 50px;
  ;
  border-radius: 20px;
  /* display:inline-block; */
}
.login {
  width: 200px;
  margin: auto;
}
.list-item:first-child {
  margin: 0;
}
.list-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.button {
  margin: auto;
}
</style>
