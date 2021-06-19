<template>
  <Nav />
  <h1>Thank you so much for your donation!</h1>
  <p>We will be coming to collect the items on {{campaign.collectionDate}}!</p>
  <router-link to="/">You may head back to the Home page!</router-link>
</template>

<script>
import Nav from "../components/Nav.vue";
import axios from "axios";

export default {
  name: "Campaign",

  components: {
    Nav,
  },

  data() {
    return {
      campaignid: "",
      campaign: [],
    };
  },

  methods: {
    getCampaignId() {
      this.campaignid = localStorage.getItem("tqid");
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
  },

  async created() {
    this.getCampaignId();
    this.campaign = await this.getCampaign();
  },
};
</script>

<style>
</style>