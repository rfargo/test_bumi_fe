<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">My Gallery</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-0 ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/album">Album</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/filter">Filter</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/search">Search</a>
            </li>

            <li v-if="!token" class="nav-item">
              <a  class="nav-link active" href="/login">Login</a>
            </li>

            <li v-if="token" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="/admin" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{name}}
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/admin/create">Create New Photo/Album</a></li>
                <li><a class="dropdown-item" @click="logout" href="#">Logout</a></li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  <router-view></router-view>
</template>


<script>

import { mapState } from "vuex";
export default {
  computed: mapState(['name', 'token']),
  methods:{
    logout(){
      let self = this;
      this.$store.commit('setToken', ['', ''])
      self.$router.push('/login');
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
