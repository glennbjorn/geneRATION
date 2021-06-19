<template>
  <Nav />
  <div class="page" v-if="!loggedIn">
    <h1>You are not logged in!</h1>
  </div>
  <div class="page" v-if="loggedIn">
    <h1>{{ campaign.name }}</h1>
    <p>By {{ campaign.org }}</p>
    <h4>{{ campaign.camDesc }}</h4>
    <p>Collection Date: {{ campaign.collectionDate }}</p>
    <h5>Items for collection</h5>
    <div :key="item._id" v-for="item in campaign.items">
      <p>{{ item.qty }} x {{ item.item }}</p>
    </div>
    <h5>More about the organisation:</h5>
    <p>{{ campaign.orgDesc }}</p>
    <button @click="goToEdit">Edit</button>
    <button @click="goToDonorsInfo">Donors Information</button>
    <h5>Donation progress</h5>
    <div v-for="n in items.length" :key="n">
      {{ items[n - 1] }} : {{ itemCount[n - 1] }}
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import Nav from "../components/Nav.vue";
import axios from "axios";
import router from "@/router";

export default {
  name: "Dashboard",

  data() {
    return {
      user: {},
      loggedIn: false,
      campaignid: "",
      campaign: [],
      donors: [],
      items: [],
      itemCount: [],
    };
  },

  components: {
    Nav,
  },

  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      if (token) {
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
      }
    },

    checkLoggedIn() {
      if (localStorage.getItem("jwt")) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    },

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

    goToEdit() {
      localStorage.removeItem("editId");
      localStorage.setItem("editId", this.campaignid);
      router.push(`/mycampaigns/${this.campaignid}/edit`);
    },

    goToDonorsInfo() {
      localStorage.removeItem("donorsInfoId"),
      localStorage.setItem("donorsInfoId", this.campaignid),
      router.push(`/mycampaigns/${this.campaignid}/donorsInfo`);
    },

    async getDonors() {
      const res = await axios.post("http://localhost:4000/donate/getDonors", {
        campaignid: this.campaignid,
      });

      return res.data;
    },

    getItems() {
      let arr = [];
      for (let i = 0; i < this.campaign.items.length; i++) {
        let item = this.campaign.items[i].item;
        arr = [...arr, item];
      }
      this.items = arr;
    },

    getItemCount() {
      this.getItems();
      let arr = [];
      for (let i = 0; i < this.items.length; i++) {
        arr = [...arr, 0];
      }
      for (let j = 0; j < this.donors.length; j++) {
        let donor = this.donors[j];
        for (let k = 0; k < donor.items.length; k++) {
          if (donor.items[k].donate) {
            let index = this.items.indexOf(donor.items[k].item);
            if (index !== -1) {
              arr[index]++;
            }
          }
        }
      }
      this.itemCount = arr;
    },
  },

  async created() {
    this.getUserDetails();
    this.checkLoggedIn();
    this.getCampaignId();
    this.campaign = await this.getCampaign();
    this.donors = await this.getDonors();
    this.getItemCount();
  },
};
</script>

<style></style>