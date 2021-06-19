<template class="page">
  <Nav />
  <h1 class="page">Home</h1>
  <div class="page">
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

<style>
.page {
  width: 100%;
  padding: 15px;
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>