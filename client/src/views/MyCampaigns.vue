<template>
  <Nav />
  <div v-if="!loggedIn">
    <h1>You are not logged in!</h1>
  </div>
  <div v-if="loggedIn">
    <h1>Your Campaigns</h1>
    <div>
      <CampaignsAdmin :campaignsAdmin="campaignsAdmin" />
    </div>
    <button @click="$router.push('/dashboard')">Go back to dashboard</button>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import CampaignsAdmin from "@/components/CampaignsAdmin";
import Nav from '../components/Nav.vue'

export default {
  name: "Dashboard",

  components: {
    CampaignsAdmin,
    Nav
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

<style></style>