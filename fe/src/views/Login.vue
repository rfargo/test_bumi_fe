<template>
  <div class="login">
    <h1>Login</h1>
    <div class="row">
      <div class="col-3"></div>
      <form class="col" @submit.prevent="login">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" v-model="username" class="form-control" id="username" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" id="password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div class="col-3"></div>
  </div>

  </div>
</template>

<!--   -->

<script>
export default {
  name: 'Login',
  props: {
    msg: String,
  },
  data() {
    return{
      username:'',
      password:'',
      datas:'',
      redirect:false,
    }
  },
  computed:{

  },
  methods: {
    login(){
      this.axios.post('http://localhost:3000/login/', {
          username: this.username,
          password: this.password
        })
        .then((response)=>{
          localStorage.token = response.data.token;
          localStorage.name = response.data.name;
          this.$store.commit('setToken', [localStorage.token, localStorage.name])
          localStorage.removeItem('token')
          localStorage.removeItem('name')
          this.$router.push({ path: '/' })
        })
        .catch(function (error) {
          console.log(error)
          alert("Incorrect Email or Password");
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
.login .row{
  text-align: left;
}
</style>