<template>
  <Nav />
  <div class="page" v-if="!loggedIn">
    <h1>You are not logged in!</h1>
  </div>
  <div class="page" v-if="loggedIn">
    <h1 class="header">Welcome</h1>
    <h1 class="name">{{ user.name }}</h1>
    <div class="container">
      <button class="left" @click="$router.push('/create')">
        New Campaign
      </button>
      <button class="right" @click="$router.push('/mycampaigns')">
        View My Campaigns
      </button>
    </div>
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

<style scoped>
.header {
  font-size: 250px;
  text-align: center;
  margin: -30px;
}

.name {
  font-size: 100px;
  text-align: center;
}

.container {
  height: 100px;
  overflow: hidden;
  margin-top: 50px;
}

.left {
  background: white;
  width: 48%;
  height: 100%;
  border-inline: 3px;
  border-color: black;
  font-size: 50px;
  cursor: pointer;
}

.right {
  background: white;
  width: 48%;
  float: right;
  height: 100%;
  border-inline: 3px;
  border-color: black;
  font-size: 50px;
  cursor: pointer;
}
</style>