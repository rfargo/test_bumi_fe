<template>
  <div class="admin">
  </div>
  <router-view></router-view>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Admin',
  computed: mapState(['name', 'token']),
  mounted() {
      console.log(this.$store.state.token)
      console.log(this.$store.state.name)
  },
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