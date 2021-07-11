<template>
  <div class="home">
      <h1 class="my-4" >Photo {{photo.id}}</h1>
      <img v-bind:src="photo.url" class="thumbnail">
      <h5 class="my-2" >{{ photo.title }}</h5>
      <p class="my-2" >Album No. {{ photo.album_id }}</p>

      <div class="mb-5" v-if="token">

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#renamePhoto">
          Rename Photo
        </button>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#movePhoto">
          Move to Another Album
        </button>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-danger mx-2" data-bs-toggle="modal" data-bs-target="#deletePhoto">
          Delete Photo
        </button>

        <!-- Modal -->
        <div class="modal fade" id="renamePhoto" tabindex="-1" aria-labelledby="renamePhotoLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
              <form class="col" @submit.prevent="renamePhoto">
                <div class="modal-header">
                  <h5 class="modal-title" id="renamePhotoLabel">Rename Photo {{photo.id}}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body my-5">
                  <div class="row">
                    <div class="col-3"></div>
                      <div class="mb-3 row">
                        <label for="title" class="form-label col-3">Old Title</label>
                        <p class="col-9">{{photo.title}}</p>
                      </div>
                      <div class="mb-3 row">
                        <label for="title" class="form-label col-3">New Title</label>
                        <div class="col-9">
                          <input type="text" v-model="title" class="form-control" id="title">
                        </div>
                      </div>
                    <div class="col-3"></div>
                  </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                  </div>
              </form>
            </div>
          </div>
        </div>

        <div class="modal fade" id="movePhoto" tabindex="-1" aria-labelledby="movePhotoLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
              <form class="col" @submit.prevent="movePhoto">
                <div class="modal-header">
                  <h5 class="modal-title" id="movePhotoLabel">
                    Move Photo {{photo.id}} to another album
                  </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body my-5">
                  <div class="row">
                    <div class="col-3"></div>
                      <div class="mb-3 row justify-content-md-center">
                        <label for="title" class="form-label col-2">Old Album</label>
                        <p class="col-4">{{photo.album_id}}</p>
                      </div>

                      <div class="mb-3 row justify-content-md-center">
                        <label for="title" class="form-label col-2">New Album</label>
                        <div class="col-4">
                          <select v-model="album_id">
                            <option disabled value="">Please select one</option>
                            <option v-for="albumList in albumLists" :value="albumList.album_id" v-bind:key="albumList">
                              {{ albumList.album_id }}
                            </option>
                          </select>
                        </div>
                      </div>

                    <div class="col-3"></div>
                  </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                  </div>
              </form>
            </div>
          </div>
        </div>

        <div class="modal fade" id="deletePhoto" tabindex="-1" aria-labelledby="deletePhotoLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <form class="col" @submit.prevent="deletePhoto">
                <div class="modal-header">
                  <h5 class="modal-title" id="deletePhotoLabel">
                    Delete Photo {{photo.id}}
                  </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body my-2">
                  <div class="row">
                    <div class="col-3"></div>
                      <div class="mb-3 row justify-content-md-center">
                        <h5>Are you sure to delete <b>{{photo.title}}</b> on album {{photo.album_id}}?</h5>
                      </div>
                    <div class="col-3"></div>
                  </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-danger" data-bs-dismiss="modal">Delete Photo {{photo.id}}</button>
                  </div>
              </form>
            </div>
          </div>
        </div>


      </div>


  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Detail',
  props: {
    msg: String,
  },
  data() {
    return{
      photo:[],
      title:'',
      album_id:'',
      albumLists:[],
    }
  },
  computed: mapState(['name', 'token']),
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

    var id = this.$route.params.id;
    this.axios.get('http://localhost:3000/photo-detail/'+id).then((response) => {
      this.photo = response.data[0];
    })
    this.axios.get('http://localhost:3000/album-list').then((response) => {
      this.albumLists = response.data;
    })
  },
  methods: {
    renamePhoto(){
      console.log('rename');
      let self = this;
      const headers = { 
        "Authorization": "Bearer "+this.$store.state.token,
      };

      if(this.title == ''){
        this.title = this.photo.title
      }

      const data = {
          photo_id: this.photo.id,
          new_title: this.title,
        };

      this.axios.post('http://localhost:3000/rename/', data ,{ headers })
        .then((response)=>{
          console.log(response.data);
          this.$router.go(0);
        })
        .catch(function (error) {
            console.log(error);
            this.$store.commit('setToken', ['', ''])
            self.$router.push('/login');
        });
    },
    movePhoto(){
      let self = this;
      const headers = { 
        "Authorization": "Bearer "+this.$store.state.token,
      };

      if(this.album_id == ''){
        this.album_id = this.photo.album_id
      }

      const data = {
          photo_id: this.photo.id,
          new_album_id: this.album_id,
        };

      this.axios.post('http://localhost:3000/move/', data ,{ headers })
        .then((response)=>{
          console.log(response.data);
          this.$router.go(0);
        })
        .catch(function (error) {
            console.log(error);
            this.$store.commit('setToken', ['', ''])
            self.$router.push('/login');
        });
    },
    deletePhoto(){
      let self = this;
      console.log('delete');

      const headers = { 
        "Authorization": "Bearer "+this.$store.state.token,
      };

      const data = {
          photo_id: this.photo.id,
        };

      this.axios.post('http://localhost:3000/delete/', data ,{ headers })
        .then((response)=>{
          console.log(response.data);
          this.$router.push({ path: '/' });
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
.modal-dialog{
  text-align: left;
}
</style>