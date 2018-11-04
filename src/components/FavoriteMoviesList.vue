<template>
  <div id="favoriteMoviesListContainer">
    <v-layout row>
      <v-flex xs10>
        <v-card v-if="favoriteMoviesList">
          <v-toolbar light>
            <v-btn id="refreshFavoriteMoviesBtn" ref="refreshFavoriteMoviesBtn" class=""
                   v-on:click="refreshFavoriteMovies">
              <v-icon>fas fa-sync-alt</v-icon>
            </v-btn>
            <v-toolbar-title>Watchlist</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn dark icon>
              <v-icon dark>search</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list>
            <v-list-tile v-for='movie in favoriteMoviesList' :key="movie.id" avatar @click="">
              <v-list-tile-avatar>
                <v-chip>
                  <v-icon>fas fa-video</v-icon>
                </v-chip>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ movie.Title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
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
          `query {  favorite_movies(where: {fbUser: {_eq: "${this.$store.state.loggedUser.id}"}}) {    id   Title Poster  Year  imdbID  fbUser    }}`,
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
  position: sticky;
}
</style>
