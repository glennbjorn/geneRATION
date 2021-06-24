<template>
  <Nav />
  <div class="page">

    <img class="logo" src="@/assets/logo.png" alt="Logo of geneRATION">
    <a href="#section-aboutus"> About Us </a>
    <a href="#section-howitworks"> How it Works </a>
    <a href="#ongoing-campaign"> Ongoing Campaigns </a>

    <span class="generation-intro">
      <h2>geneRATION is your a one-stop web platform that eases the process of organising food drives for charitable organisations</h2>
    </span>

  <h2 id="section-aboutus"> About Us </h2>
  <div class="aboutus-text"> 
    <p> When it comes to food drives, there are always bumps in the process of soliciting donations
        from the public as well as the selection, sorting, and distribution of food products.</p>

    <p> One of the problems is a shortage of manpower to go door-to-door and engage with
        members of the public in attempt to prompt them to contribute to the food drive. There is
        also a manpower shortage to visit each unit a week later to check if would like to donate. </p>

    <p> Since volunteers have no clue which units would be donating, the conventional method
        would be to knock on every unit. </p>

    <p> Other problems include a lack of food donations to evenly allocate to the beneficiaries,
        leading to the charitable organisations spending their own money to supplement these
        missing products. </p> 

    <p> Also, food products that are donated must be re-screened to ensure that
        they are halal certified and have a minimum of three months left on their shelf life. </p>

        As a result, as individuals who recognise the value of food donation drives and their effect
        on the less fortunate in our society, we want to build a website that will make it easier for
        charitable organisations to organise food drives in the future. </div>

  <h3 id="section-howitworks"> How it Works </h3>
  <div class="howitworks-text"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, aliquam? </div>

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
  background-position: center;
}

.generation-intro h2 {
  font-family: 'Poiret One', cursive;
  font-weight: bolder;
  color: #c42218;
  text-align: center;
  margin-top: 100px;
  font-size: 80px;
  margin-bottom: 30px;
}

#section-aboutus {
font-family: 'Poiret One', cursive;
  font-weight: bolder;
  color: #4a0602;
  text-align: center;
  margin-top: 100px;
  font-size: 50px;
  margin-bottom: 30px;
}

.aboutus-text{
text-align: center;
  margin-top: 50px;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
}

#section-howitworks {
font-family: 'Poiret One', cursive;
  font-weight: bolder;
  color: #4a0602;
  text-align: center;
  margin-top: 100px;
  font-size: 50px;
  margin-bottom: 30px;
}

.howitworks-text{
text-align: center;
  margin-top: 50px;
  font-size: 30px;
  font-weight: bold;
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