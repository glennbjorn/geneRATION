<template>
  <Nav />
  <div class="page">
    <h1 class="header">Thank You</h1>
    <br />
    <h1 class="sentence">For Your Donation!</h1>
    <div class="reminder">
      <p>We will be coming to collect the items on {{ date }}!</p>
    </div>

    <button class="back" @click="$router.push('/')">
      Head back to home page!
    </button>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "Campaign",

  components: {
    Nav,
  },

  data() {
    return {
      campaignid: "",
      campaign: [],
      date: "",
    };
  },

  methods: {
    getCampaignId() {
      this.campaignid = localStorage.getItem("tqid");
    },

    async getCampaign() {
      const res = await axios.post("/api/campaign/getCampaignById", {
        _id: this.campaignid,
      });

      const data = await res.data[0];

      return data;
    },

    convertDate() {
      this.date = moment(this.campaign.collectionDate).format("Do MMM YYYY");
    },
  },

  async created() {
    this.getCampaignId();
    this.campaign = await this.getCampaign();
    this.convertDate();
  },
};
</script>

<style scoped>
.header {
  font-size: 15vw;
  text-align: center;
  margin: -30px;
}

.sentence {
  font-size: 10vw;
  text-align: center;
}

.reminder {
  text-align: center;
  margin-top: 30px;
  font-size: 40px;
  margin-bottom: 50px;
}

.back {
  font-size: 20px;
  background: white;
  border-inline: 3px;
  border-color: black;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-top: 30px;
}
</style>