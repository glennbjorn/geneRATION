<template>
  <div v-if="!loggedIn">
    <h1>You are not logged in!</h1>
  </div>
  <div v-if="loggedIn">
    <h1>Welcome {{ user.name }}</h1>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "Dashboard",

  data() {
    return {
      user: {},
      loggedIn: false,
    };
  },

  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      if (token) {
        let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      }
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
    this.getUserDetails();
    this.checkLoggedIn();
  },
};
</script>

<style></style>