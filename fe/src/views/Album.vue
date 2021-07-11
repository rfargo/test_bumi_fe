<template>
  <div class="home">
    <h1>Album List</h1>
    <div class="container">
      <div class="row justify-content-center">
        <a :href="'/album/' + albumList.album_id" class="border-2 border border-success col-2  mx-3 my-3 py-3 px-3 album" v-for="albumList in albumLists" v-bind:key="albumList">
          Album {{ albumList.album_id }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Album',
  props: {
    msg: String,
  },
  data() {
    return{
      hello: 'The name of some other app',
      albumLists:[],
    }
  },
  components: {

  },
  mounted() {
    const data_validate = {
        token: this.$store.state.token
    };
    this.axios.post('http://localhost:3000/validate', data_validate)
      .then((response)=>{
        var code = response.data.code;
        if(code == 'ERR'){
          this.$store.commit('setToken', ['', ''])
        }
      })
      .catch(function (error) {
        console.log(error)
    });                 
    this.axios.get('http://localhost:3000/album-list').then((response) => {
      this.albumLists = response.data;
    })
  },
  methods: {
    // filterAlbum(album) {
    //   this.axios.get('http://localhost:3000/filter-by-album/'+album).then((response) => {
    //     this.photos = response.data;
    //   })
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.list-group{
  text-align: left;
}
.album{
  width: 13%;
}
</style>