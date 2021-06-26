<template>
  <Nav />
  <div class="page" v-if="!loggedIn">
    <h1>You are not logged in!</h1>
  </div>
  <div class="page" v-if="loggedIn">
    <p><i>You may click on the header to sort the table</i></p>
    <table class="table">
      <thead>
        <tr class="tr">
          <th class="th" @click="sort('name')">Name</th>
          <th class="th" @click="sort('address')">Postal Code</th>
          <th class="th" @click="sort('unit')">Unit Number</th>
          <th class="th" @click="sort('contact')">Contact No.</th>
          <th class="th" :key="item" v-for="item in items">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="tr" :key="donor.id" v-for="donor in donors">
          <td class="td">{{ donor.name }}</td>
          <td class="td">{{ donor.address }}</td>
          <td class="td">{{ donor.unit }}</td>
          <td class="td">{{ donor.contact }}</td>
          <td class="td" :key="item.id" v-for="item in donor.items">
            <p v-if="item.donate">Yes</p>
            <p v-else>No</p>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="back" @click="$router.push(`/mycampaigns/${campaignid}`)">
      Back to My Campaigns
    </button>
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
      currentSort: "address",
      currentSortDir: "asc",
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
      const res = await axios.post("/api/campaign/getCampaignById", {
        _id: this.campaignid,
      });

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
    },

    getCampaignId() {
      this.campaignid = localStorage.getItem("donorsInfoId");
    },

    async getDonors() {
      const res = await axios.post("/api/donate/getDonors", {
        campaignid: this.campaignid,
      });

      return res.data;
    },

    sort(field) {
      if (field === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }

      this.currentSort = field;

      this.donors.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
  },

  async created() {
    this.getUserDetails();
    this.checkLoggedIn();
    this.getCampaignId();
    this.campaign = await this.getCampaign();
    this.getItems();
    this.donors = await this.getDonors();
    this.sort("address");
  },
};
</script>

<style scoped>
p {
  text-align: center;
}

.table {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border-collapse: collapse;
  border: 3px solid #44475c;
}

.table .th {
  text-align: center;
  background: #696969;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  min-width: 30px;
  vertical-align: middle;
}

.table .th:hover {
  background: black;
}
.table .tr .td {
  text-align: center;
  padding: 3px;
  border-right: 2px solid #696969;
  vertical-align: middle;
}

.table .td {
  border-right: none;
}

.table .tbody .tr .td {
  background: #d4d8f9;
}

.back {
  background: white;
  border-inline: 3px;
  border-color: black;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-top: 30px;
}
</style>