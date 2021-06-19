<template>
  <Nav />
  <h1>Home</h1>
  <div>
    <Campaigns :campaigns="campaigns" />
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import Campaigns from "@/components/Campaigns";
import axios from "axios";

export default {
  name: "Home",

  components: {
    Nav,
    Campaigns,
  },

  data() {
    return {
      campaigns: [],
    };
  },

  methods: {
    async getCampaigns() {
      const res = await axios.post(
        "http://localhost:4000/campaign/getAllCampaigns"
      );

      const data = await res.data;

      return data;
    },
  },

  async created() {
    this.campaigns = await this.getCampaigns();
  },
};
</script>

<style></style>