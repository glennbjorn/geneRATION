<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <!-- link Home -->
      <router-link to="/" class="navbar-brand" href="#">Home</router-link>

      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!loggedIn">
          <li class="nav-item">
            <!-- link Login -->
            <router-link to="/login" class="nav-link" href="#"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <!-- link Register -->
            <router-link to="/register" class="nav-link" href="#"
              >Register</router-link
            >
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

<style></style>