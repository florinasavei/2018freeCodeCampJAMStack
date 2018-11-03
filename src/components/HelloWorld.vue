<template>
  <div id="app">
      <header>Axios</header>
      <main>
        <h2>Click the button to get a movie</h2>
        <button id="btn" class="" v-on:click="getData">Get</button>
        <div v-if="loading">Loading .. </div>
        <div class="wrapper">
          <p v-if="movie">{{ movie }}</p>
          <img v-if="poster" v-bind:src="poster"/>
        </div>
      </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data () {
    return {
      movie: '',
      poster: '',
      loading: false
    }
  },
  methods: {
    getData: function () {
      this.loading = true;
      axios.get('http://www.omdbapi.com/?t=serenity&apikey=93d8cda4')
        .then((response) => {
          this.loading = false;
          this.movie = response.data.Title;
          this.poster = response.data.Poster;
        })
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
