<template>
  <div id="app">
      <main>
        <v-container>
           <v-layout row wrap>
             <v-flex xs3 sm3 md3>
               </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field v-model="movie"
                label="Movie name"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm2 md2>
                <v-btn id="btn" class="" v-on:click="getData">Find movie</v-btn>
            </v-flex>
          </v-layout>
        <div class="wrapper">
          <div v-if="data" id="example-1">
            <div v-for="item in data">
              <img v-if="item.Poster" v-bind:src="item.Poster"/>
            </div>
          </div>
        </div>
          </v-container>
      </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data () {
    return {
     data: [],
      movie: ''
    }
  },
  methods: {
    getData: function () {
      axios.get('http://www.omdbapi.com/?s=' + this.movie +'&apikey=93d8cda4')
        .then((response) => {
          this.data = response.data.Search;
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
