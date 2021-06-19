<template>
  <Nav />
  <h1>{{ campaign.name }}</h1>
  <p>By {{ campaign.org }}</p>
  <h4>{{ campaign.camDesc }}</h4>
  <p>Collection Date: {{ campaign.collectionDate }}</p>
  <h5>Items for collection</h5>
  <div :key="item._id" v-for="item in campaign.items">
    <p>{{ item.qty }} x {{ item.item }}</p>
  </div>
  <button class="w-100 btn btn-lg btn-primary" @click="gotoform">
    Donate Today!
  </button>
  <h5>More about the organisation:</h5>
  <p>{{ campaign.orgDesc }}</p>
  <router-link to="/">Back</router-link>
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

    gotoform() {
      localStorage.removeItem("formId"),
      localStorage.setItem("formId", this.campaignid),
      this.$router.push(`/${this.campaignid}/donate`)
    }
  },

  async created() {
    this.getCampaignId();
    this.campaign = await this.getCampaign();
  },
};
</script>

<style>
</style>