<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>FCC</span>
        <span class="font-weight-light">MOVIE APP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <FavoriteMoviesList/>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import FavoriteMoviesList from "./components/FavoriteMoviesList";

export default {
  name: "App",
  components: {
    HelloWorld,
    FavoriteMoviesList
  },
  data() {
    return {
      //
    };
  }
};
</script>
