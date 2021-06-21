<template>
  <Nav />
  <div class="page">
    <h1 class="header">Thank You</h1>
    <h1 class="sentence">so much for your donation!</h1>
    <div class="reminder">
      <p>
        We will be coming to collect the items on {{ campaign.collectionDate }}!
      </p>
    </div>

    <button class="back" @click="$router.push('/')">
      Head back to home page!
    </button>
  </div>
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
        "/campaign/getCampaignById",
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

<style scoped>
.header {
  font-size: 250px;
  text-align: center;
  margin: -30px;
}

.sentence {
  font-size: 100px;
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