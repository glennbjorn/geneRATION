<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <!-- link Home -->
      <router-link to="/" class="navbar-brand" href="#">
        <img class="img" src="@/assets/header.png" alt="Home Button" />
      </router-link>

      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!loggedIn">
          <li class="nav-item">
            <!-- link Login -->
            <router-link to="/login" class="nav-link" href="#"
              >LOG IN</router-link
            >
          </li>
          <li class="nav-item">
            <!-- link Register -->
            <router-link to="/register" class="nav-link" href="#"
              >REGISTER</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="loggedIn">
          <li class="nav-item">
            <!-- link Dashboard -->
            <router-link to="/dashboard" class="nav-link" href="#"
              >DASHBOARD</router-link
            >
          </li>
          <li class="nav-item">
            <!-- link Logout -->
            <router-link to="/" class="nav-link" href="#" @click="logUserOut"
              >LOG OUT</router-link
            >
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
    };
  },
  methods: {
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
      this.$router.go();
    },
    checkLoggedIn() {
      if (localStorage.getItem("jwt")) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    },
  },
  created() {
    this.checkLoggedIn();
  },
};
</script>

<style scoped>
.img {
  max-width: 200px;
}
</style>