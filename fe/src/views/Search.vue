<template>
  <div class="home">
    <h1 class="my-4">Photo Search</h1>
    <div class="container my-3">
      <div class="row">
        <div class="col-2">
          <label>Search Title</label>
        </div>
        <div class="col-10">
          <input @keyup="searchPhoto(name)" v-model="name" placeholder="Search" class="form-control" />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row d-flex">
        <div v-for="photo in photos" v-bind:key="photo" 
          class="col-sm-3 photo d-flex flex-column align-items-center px-2 my-2" >
          <img v-bind:src="photo.thumbnail_url" class="thumbnail">
          <a :href="'/detail/' + photo.id"><h5>{{ photo.title }}</h5></a>
          <p>Album No. {{ photo.album_id }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Search',
  props: {
    msg: String,
  },
  data() {
    return{
      hello: 'The name of some other app',
      photos: [],
      albumLists:[],
      name:''
    }
  },
  mounted(){
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
  },
  methods: {
    searchPhoto(name){
      this.axios.get('http://localhost:3000/search-by-name/'+name).then((response) => {
        this.photos = response.data;
      })
    }

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
.photo{
  height: 250px;
}
.thumbnail{
  max-width:150px;
  max-height:150px;
  width: auto;
  height: auto;
}

</style>