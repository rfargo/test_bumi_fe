<template>
  <div class="create">
    <h1>Create New Photo or Album</h1>

    <div class="row">
      <div class="col-3"></div>
      <form class="col" @submit.prevent="createPhoto">

        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" v-model="title" class="form-control" id="title">
        </div>

        <div class="mb-3">
          <label for="image_url" class="form-label">Image URL</label>
          <input type="text" v-model="image_url" class="form-control" id="image_url">
        </div>

        <div class="mb-3">
          <label for="thumbnail_image_url" class="form-label">Thumbnail Image URL</label>
          <input type="text" v-model="thumbnail_image_url" class="form-control" id="thumbnail_image_url">
        </div>

        <div class="mb-3">
          <label for="album" class="form-label">Album</label>
          <select v-model="album" class="form-control" >
            <option disabled value="">Please select one</option>
            <option value="0">New Album</option>
            <option v-for="albumList in albumLists" :value="albumList.album_id" v-bind:key="albumList">
              {{ albumList.album_id }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div class="col-3"></div>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Create',
  props: {
    msg: String,
  },
  computed: mapState(['name', 'token']),
  data() {
    return{
      albumLists:[],
      title:'',
      image_url:'',
      thumbnail_image_url:'',
      album:'0',
      newAlbum:false,
    }
  },
  mounted(){
    let self = this;

    const data_validate = {
        token: this.$store.state.token
    };
    this.axios.post('http://localhost:3000/validate', data_validate)
      .then((response)=>{
        var code = response.data.code;
        if(code == 'ERR'){
          this.$store.commit('setToken', ['', ''])
          self.$router.push('/login');
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
    createPhoto(){
      if(this.album == 0){
        this.newAlbum = true;
      }
      
      const headers = { 
        "Authorization": "Bearer "+this.$store.state.token,
      };

      const data = {
          title: this.title,
          url: this.image_url,
          thumbnail_url: this.thumbnail_image_url,
          album_id: this.album,
          new_album: this.newAlbum,
        };

      this.axios.post('http://localhost:3000/create/', data ,{ headers })
        .then((response)=>{
          console.log(response.data);
          this.$router.push({ path: '/' })
        })
        .catch(function (error) {
          console.log(error)
        });
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
.create .row{
  text-align: left;
}

</style>