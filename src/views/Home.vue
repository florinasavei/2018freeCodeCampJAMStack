<template>
  <v-layout row wrap>
    <v-flex xs8>
      <SearchComponent/>
    </v-flex>
    <v-flex xs4>
      <FavoriteMoviesList/>
    </v-flex>
  </v-layout>
</template>

<script>
import SearchComponent from "../components/SearchComponent.vue";
import FavoriteMoviesList from "../components/FavoriteMoviesList.vue";
import SpinnerComponent from "../components/Spinner.vue";

export default {
  name: 'HomeView',
  components: {
    SearchComponent,
    FavoriteMoviesList
  }
};
</script>
