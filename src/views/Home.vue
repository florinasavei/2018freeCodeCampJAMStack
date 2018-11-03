<template>
  <v-layout row wrap>
    <v-flex xs8>
      <HelloWorld/>
    </v-flex>
    <v-flex xs4>
      <FavoriteMoviesList/>
    </v-flex>
  </v-layout>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";
import FavoriteMoviesList from "../components/FavoriteMoviesList.vue";

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    FavoriteMoviesList
  }
};
</script>
