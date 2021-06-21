<template>
  <Nav />
  <div class="page" v-if="!loggedIn">
    <h1>You are not logged in!</h1>
  </div>
  <div class="page" v-if="loggedIn">
      <button @click="$router.push(`/mycampaigns/${campaignid}`)">Back</button>
    <table class="table">
      <thead>
        <tr class="tr">
          <th class="th">Name</th>
          <th class="th">Postal Code</th>
          <th class="th">Unit Number</th>
          <th class="th" :key="item" v-for="item in items">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="tr" :key="donor.id" v-for="donor in donors">
          <td class="td">{{ donor.name }}</td>
          <td class="td">{{ donor.address }}</td>
          <td class="td">{{ donor.unit }}</td>
          <td class="td" :key="item.id" v-for="item in donor.items">
            <p v-if=item.donate>Yes</p>
            <p v-else>No</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import Nav from "../components/Nav.vue";
import axios from "axios";

export default {
  name: "DonorsInfo",

  data() {
    return {
      user: {},
      loggedIn: false,
      campaignid: "",
      campaign: [],
      items: [],
      donors: [],
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

    getItems() {
      let arr = [];
      for (let i = 0; i < this.campaign.items.length; i++) {
        let item = this.campaign.items[i].item;
        arr = [...arr, item];
      }
      this.items = arr;
      console.log(this.items);
    },

    getCampaignId() {
      this.campaignid = localStorage.getItem("donorsInfoId");
    },

    async getDonors() {
      const res = await axios.post("/donate/getDonors", {
        campaignid: this.campaignid,
      });

      return res.data;
    },
  },

  async created() {
    this.getUserDetails();
    this.checkLoggedIn();
    this.getCampaignId();
    this.campaign = await this.getCampaign();
    this.getItems();
    this.donors = await this.getDonors();
  },
};
</script>

<style>
.table {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
}

.table .th {
  text-align: center;
  background: #44475c;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  min-width: 30px;
}

.table .th:hover {
  background: #717699;
}
.table .tr .td {
  text-align: center;
  padding: 3px;
  border-right: 2px solid #696969;
}

.table .td {
  border-right: none;
}

.table .tbody .tr .td {
  background: #d4d8f9;
}
</style>