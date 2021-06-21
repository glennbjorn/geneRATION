<template>
  <Nav />
  <div class="page">
    <h1 class="header">Home</h1>
    <Campaigns :campaigns="campaigns" />
    <div class="home-no-campaign" v-if="!campaigns">
      <h2>There are no campaigns at the moment.</h2>
      <h3>Do visit another day!</h3>
    </div>
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
        "/campaign/getAllCampaigns"
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
.header {
  text-align: center;
  margin-top: -20px;
  font-size: 100px;
  margin-bottom: 30px;
}

.page {
  width: 100%;
  padding: 15px;
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.page .home-no-campaign h2 {
  text-align: center;
  margin-top: 70px;
}

.page .home-no-campaign h3 {
  text-align: center;
  margin-top: 50px;
}
</style>