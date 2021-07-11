<template>
  <div class="home">
    <div class="container">
      <div class="row justify-content-md-center align-items-center">
        <div class="col-9">    
          <h2 class="my-4" style="text-align: left">Album {{album_id}}</h2>
        </div>
        <div class="col-3" v-if="token">
        <button type="button" class="btn btn-danger mx-2" data-bs-toggle="modal" data-bs-target="#deleteAlbum">
          Delete Album
        </button>

        <div class="modal fade" id="deleteAlbum" tabindex="-1" aria-labelledby="deleteAlbumLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <form class="col" @submit.prevent="deleteAlbum">
                <div class="modal-header">
                  <h5 class="modal-title" id="deleteAlbumLabel">
                    Delete Album {{album_id}}
                  </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body my-2">
                  <div class="row">
                    <div class="col-3"></div>
                      <div class="mb-3 row justify-content-md-center">
                        <h5>Are you sure to delete album <b>{{album_id}}</b>?</h5>
                      </div>
                    <div class="col-3"></div>
                  </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-danger" data-bs-dismiss="modal">Delete Album {{album_id}}</button>
                  </div>
              </form>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row d-flex">
        <div class="col-sm-3 photo d-flex flex-column align-items-center" v-for="photo in photos" v-bind:key="photo">
          <img v-bind:src="photo.thumbnail_url" class="thumbnail" >
          <a :href="'/detail/' + photo.id"><h5>{{ photo.title }}</h5></a>
          <p>Album No. {{ photo.album_id }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'AlbumDetail',
  props: {
    msg: String,
  },
  data() {
    return{
      hello: 'The name of some other app',
      photos:[],
      album_id:''
    }
  },
  computed: mapState(['name', 'token']),
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

    var id = this.$route.params.id;             
    this.album_id = id;             
    this.axios.get('http://localhost:3000/filter-by-album/'+id).then((response) => {
      this.photos = response.data;
      console.log(this.photos);
    })
  },
  methods: {
    deleteAlbum(){
      console.log('delete');
      let self = this;

      const headers = { 
        "Authorization": "Bearer "+this.$store.state.token,
      };

      const data = {
          album_id: this.album_id,
        };

      this.axios.post('http://localhost:3000/delete-album/', data ,{ headers })
        .then((response)=>{
          console.log(response.data);
          this.$router.push({ path: '/album' });
        })
        .catch(function (error) {
          console.log(error);
          this.$store.commit('setToken', ['', ''])
          self.$router.push('/login');
        });

    },


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