<template>
  <Nav />
  <div class="page" v-if="!loggedIn">
    <h1>You are not logged in!</h1>
  </div>
  <div class="page" v-if="loggedIn">
    <h1 class="header">Your Campaigns</h1>
    <div v-if="!campaignsAdmin">
      <h2>You do not have any campaigns</h2>
      <button class="create" @click="$router.push('/create')">
        Create New Campaign
      </button>
    </div>
    <div>
      <CampaignsAdmin :campaignsAdmin="campaignsAdmin" />
    </div>
    <button class="btn" @click="$router.push('/dashboard')">
      Go back to dashboard
    </button>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import CampaignsAdmin from "@/components/CampaignsAdmin";
import Nav from "../components/Nav.vue";

export default {
  name: "Dashboard",

  components: {
    CampaignsAdmin,
    Nav,
  },

  data() {
    return {
      user: {},
      loggedIn: false,
      userOrg: "",
      campaignsAdmin: [],
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

    async getUserOrg() {
      const res = await axios.post("http://localhost:4000/getuserorg", {
        email: this.user.email,
      });
      this.userOrg = res.data;
    },

    async getCampaigns() {
      const res = await axios.post(
        "http://localhost:4000/campaign/getCampaigns",
        { org: this.userOrg }
      );

      const data = await res.data;

      return data;
    },
  },

  async created() {
    this.getUserDetails();
    this.checkLoggedIn();
    await this.getUserOrg();
    this.campaignsAdmin = await this.getCampaigns();
  },
};
</script>

<style scoped>
.btn {
  background: white;
  border-inline: 3px;
  border-color: black;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-top: 30px;
}

.page h2 {
  text-align: center;
  margin-top: 70px;
}

.create {
  background: white;
  width: 48%;
  height: 100%;
  border-inline: 3px;
  border-color: black;
  font-size: 50px;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-top: 50px;
  margin-bottom: 20px;
}
</style>