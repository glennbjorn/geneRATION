<template>
  <Nav />
  <div v-if="!isLoading">
    <div class="hero-image">
      <div class="hero-text">
        <h1 style="font-size: 50px">do something that matters</h1>
        <p>
          <a
            href="#ongoing-campaigns"
            class="
              w3-button
              w3-white
              w3-padding-large
              w3-large
              w3-margin-top
              w3-opacity
              w3-hover-opacity-off
            "
            >donate today</a
          >
        </p>
      </div>
    </div>

    <div class="w3-center w3-hide-small w3-xxlarge">
      <a href="#about-us" class="w3-bar-item w3-button w3-half"
        ><i class="fa fa-user"></i> About Us</a
      >

      <a href="#ongoing-campaigns" class="w3-bar-item w3-button w3-half"
        ><i class="fa fa-th"></i> Ongoing Campaigns</a
      >
    </div>

    <div class="page">
      <div id="about-us">
        <img
          class="logo"
          src="@/assets/logo-new3.png"
          alt="Logo of geneRATION"
        />
        <span class="generation-intro">
          <h2>a one-stop food drive organiser<br /></h2>
        </span>

        <div class="aboutus-text">
          <p class="para-space">
            When it comes to food drives, there are always bumps in the process
            of soliciting donations from the public as well as the selection,
            sorting, and distribution of food products.
          </p>

          Thus, as individuals who recognise the value of food donation drives
          and their effect on the less fortunate in our society, we want to
          build a website that will make it easier for charitable organisations
          to organise food drives in the future.
        </div>
      </div>

      <div id="ongoing-campaigns">
        <Campaigns :campaigns="campaigns" />
        <div class="home-no-campaign" v-if="!campaigns">
          <h2>There are no campaigns at the moment.</h2>
          <h3>Do visit another day!</h3>
        </div>
      </div>
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
      isLoading: true,
    };
  },

  methods: {
    async getCampaigns() {
      const res = await axios.post("/api/campaign/getAllCampaigns");

      const data = await res.data;

      return data;
    },
  },

  async created() {
    this.campaigns = await this.getCampaigns();
    this.isLoading = false;
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

.logo {
  margin-right: auto;
  margin: 0 auto;
  display: block;
  max-width: 25%;
  margin-top: 120px;
}

.generation-intro h2 {
  font-weight: bolder;
  color: #cd2520;
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 30px;
}

.aboutus-text {
  text-align: center;
  margin-top: 50px;
  font-size: 30px;
  /* font-weight: bold; */
  margin-bottom: 250px;
  margin-left: 300px;
  margin-right: 300px;
}

.para-space {
  margin-bottom: 50px;
}

@import url("https://www.w3schools.com/w3css/4/w3.css");
@import url("https://fonts.googleapis.com/css?family=Raleway");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

body,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Raleway", sans-serif;
}

body,
html {
  height: 100%;
  line-height: 1.8;
}

.hero-image {
  background-image: url("../assets/fooddistribution2.jpg");
  background-color: #cccccc;
  height: 810px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
</style>