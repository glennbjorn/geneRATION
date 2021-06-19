<template>
  <Nav />
  <div v-if="!loggedIn">
    <h1>You are not logged in!</h1>
  </div>
  <div v-if="loggedIn">
    <h1>{{ campaign.name }}</h1>
    <p>By {{ campaign.org }}</p>
    <h4>{{ campaign.camDesc }}</h4>
    <p>Collection Date: {{ campaign.collectionDate }}</p>
    <h5>Items for collection</h5>
    <div :key="item._id" v-for="item in campaign.items">
      <p>{{ item.qty }} x {{ item.item }}</p>
    </div>
    <h5>More about the organisation:</h5>
    <p>{{ campaign.orgDesc }}</p>
    <button @click="goToEdit">
      Edit
    </button>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import Nav from "../components/Nav.vue";
import axios from "axios";
import router from "@/router"

export default {
  name: "Dashboard",

  data() {
    return {
      user: {},
      loggedIn: false,
      campaignid: "",
      campaign: [],
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

    getCampaignId() {
      this.campaignid = localStorage.getItem("campaignid");
    },

    async getCampaign() {
      const res = await axios.post(
        "http://localhost:4000/campaign/getCampaignById",
        {
          _id: this.campaignid,
        }
      );

      const data = await res.data[0];

      return data;
    },

    goToEdit() {
      localStorage.removeItem("editId");
      localStorage.setItem("editId", this.campaignid);
      router.push(`/mycampaigns/${this.campaignid}/edit`)
    }
  },

  async created() {
    this.getUserDetails();
    this.checkLoggedIn();
    this.getCampaignId();
    this.campaign = await this.getCampaign();
  },
};
</script>

<style></style>