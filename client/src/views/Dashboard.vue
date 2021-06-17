<template>
  <Nav />
  <div v-if="!loggedIn">
    <h1>You are not logged in!</h1>
  </div>
  <div v-if="loggedIn">
    <h1>Welcome {{ user.name }}</h1>
    <button @click="$router.push('/create')">Create new campaign</button>
    <button @click="$router.push('/mycampaigns')">View your campaigns</button>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import Nav from "../components/Nav.vue";

export default {
  name: "Dashboard",

  data() {
    return {
      user: {},
      loggedIn: false,
    };
  },

  components: {
    Nav,
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