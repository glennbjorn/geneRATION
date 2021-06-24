<template>
  <Nav />
  <div class="page">
    <!-- <h1 class="generation">geneRATION</h1> -->
    <img class="logo" src="@/assets/logo.png" alt="Logo of geneRATION">

    <span class="generation-intro-highlight">
      <h2>geneRATION is your a one-stop web platform that eases the process of organising food drives for charitable organisations</h2>
    </span>

    <h1 class="ongoing-campaign">Ongoing Campaigns</h1>
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
@import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');

.logo {
display: block;
margin-left: auto;
margin-right: auto;
float: right;
margin-top: 100px; 
}

.page {
  background-image: url("../assets/kindness-bg-50T.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.generation-intro-highlight h2 {
  font-family: 'Poiret One', cursive;
  font-weight: bolder;
  color: #c42218;
  text-align: center;
  margin-top: 100px;
  font-size: 80px;
  margin-bottom: 30px;
}


.ongoing-campaign {
  text-align: center;
  margin-top: 100px;
  font-size: 100px;
  margin-bottom: 30px;
}

.page {
  width: 100%;
  padding: 15px;
  margin: auto;
  font-family: 'Poiret One', cursive;
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