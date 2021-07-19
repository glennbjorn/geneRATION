<template>
  <Nav />
  <div v-if="!isLoading">
    <div class="page" v-if="!loggedIn">
      <h1>You are not logged in!</h1>
    </div>
    <div class="page" v-if="loggedIn">
      <h1 class="header">Welcome</h1>
      <h1 class="name">{{ user.name }} <br /><i class="fa fa-smile-o"></i></h1>

      <div class="w3-bar">
        <button class="btn w3-mobile" @click="$router.push('/create')">
          Create New Campaign
        </button>
        <button class="btn w3-mobile" @click="$router.push('/mycampaigns')">
          View My Campaigns
        </button>
      </div>
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
      isLoading: true,
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
    this.isLoading = false;
  },
};
</script>

<style scoped>
.header {
  font-size: 8vw;
  text-align: center;
  margin: -30px;
  margin-top: 30px;
}

.name {
  font-size: 10vw;
  text-align: center;
  margin-top: 30px;
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

.btn {
  background: white;
  border-inline: 3px;
  border-color: black;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-top: 30px;
  font-size: 50px;
}
</style>