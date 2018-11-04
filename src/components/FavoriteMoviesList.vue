<template>
  <div id="favoriteMoviesListContainer">
      <main>
        <v-container>
          <div class="wrapper">
            <v-flex xs12 sm2 md2>
                <v-btn id="refreshFavoriteMoviesBtn" ref="refreshFavoriteMoviesBtn" class="" v-on:click="refreshFavoriteMovies">
                   <v-icon>fas fa-sync-alt</v-icon>
                </v-btn>
            </v-flex>

          <div v-if="favoriteMoviesList" id="example-1">
            <div v-for='movie in favoriteMoviesList'>
             <p>{{movie.Title}}</p>
            </div>
          </div>

        </div>
      </v-container>
    </main>
  </div>
</template>

<script>
import axios from "axios";

import { EventBus } from "../event-bus.js";

export default {
  name: "FavoriteMoviesList",

  data() {
    return {
      favoriteMoviesList: []
    };
  },
  methods: {
    refreshFavoriteMovies: function() {
      this.getFavoriteMoviesFromServer();
      this.favoriteMoviesList = this.$store.state.myFavoriteMovies;
    },
    getFavoriteMoviesFromServer: function() {
      var config = { headers: { "X-Hasura-Access-Key": "freecodecamp" } };
      var data = JSON.stringify({
        query:
          "query {  favorite_movies {    id   Title Poster  Year  imdbID  fbUser    }}",
        variables: null
      });
      axios
        .post(
          "http://fccbv-movie-list.herokuapp.com/v1alpha1/graphql",
          data,
          config
        )
        .then(response => {
          this.updateStore(response.data.data.favorite_movies);
        });
    },
    updateStore: function(data) {
      if (data.length > 0) {
        this.favoriteMoviesList = data;
        this.$store.state.myFavoriteMovies = data;
      }
    }
  },
  created: function() {
    this.refreshFavoriteMovies();
    EventBus.$on("addedToFavorites", this.refreshFavoriteMovies);
  }
};
</script>

<style>
#favoriteMoviesListContainer {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position: fixed;
}
</style>
