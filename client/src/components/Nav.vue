<template>
  <nav class="navbar navbar-expand-md navbar-light bg-custom mb-4">
    <div class="container-fluid">
      <!-- link Home -->
      <!-- <router-link to="/" class="navbar-brand" href="#">geneRATION</router-link> -->
      <router-link to="/" class="navbar-brand" href="#">
         <img class="top-right-logo" src="@/assets/smaller-logo.png" alt="Home Button">
      </router-link>

    

    <a href="/Home#section-aboutus"> About Us </a>&ensp;
    <a href="#section-howitworks"> How it Works </a>&ensp;
    <a href="#ongoing-campaign"> Ongoing Campaigns </a>



      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!loggedIn">
          <li class="nav-item">
            <!-- link Login -->
            <router-link to="/login" class="nav-link" href="#"
              > <p class="navbar-wording"> Login </p>
              </router-link>
          </li>
          <li class="nav-item">
            <!-- link Register -->
            <router-link to="/register" class="nav-link" href="#"
              > <p class="navbar-wording"> Register </p>
              </router-link>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="loggedIn">
          <li class="nav-item">
            <!-- link Dashboard -->
            <router-link to="/dashboard" class="nav-link" href="#">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <!-- link Logout -->
            <router-link to="/" class="nav-link" href="#" @click="logUserOut">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",

  data() {
    return {
      loggedIn: false,
    }
  },

  methods: {
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },
    checkLoggedIn() {
      if (localStorage.getItem("jwt")) {
         this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }
  },

  created() {
    this.checkLoggedIn();
  }
};
</script>

<style>
.top-right-logo {
  width: 25%;
  height: 25%;
  float: left;
}

.bg-custom {
  /* background-color: #eef3e3; */
  /* background-image: linear-gradient(15deg, #eef3e3 0%, #e0e0e0 100%); */
  background-image: linear-gradient(15deg, #eef3e3 0%, #d4c7c7 100%); 
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.8);
}

.navbar-wording {
font-weight: bold;
font-size: 120%;
}
</style>