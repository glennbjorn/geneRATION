<template>
  <Nav />
  <div v-if="!isLoading">
    <div class="page" v-if="!auth">
      <h1>You are not authorised to view this page</h1>
    </div>

    <div class="page" v-if="auth">
      <p><i>You may click on the header to sort the table</i></p>

      <div class="excel">
        <table class="table" border="1" ref="exportable_table">
          <thead>
            <tr class="tr">
              <th class="th" @click="sort('name')">Name</th>
              <th class="th" @click="sort('contact')">Contact No.</th>
              <th class="th" @click="sort('dropoff')">Self Drop Off</th>
              <th class="th" @click="sort('address')">Postal Code</th>
              <th class="th" @click="sort('unit')">Unit Number</th>
              <th class="th" :key="item" v-for="item in items">{{ item }}</th>
              <th class="th" @click="sort('remarks')">Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr class="tr" :key="donor.id" v-for="donor in donors">
              <td class="td">{{ donor.name }}</td>
              <td class="td">{{ donor.contact }}</td>
              <td class="td">{{ donor.dropoff }}</td>
              <td class="td">{{ donor.address }}</td>
              <td class="td">{{ donor.unit }}</td>

              <td class="td" :key="item.id" v-for="item in donor.items">
                <p v-if="item.quantity != 0">{{ item.quantity }}</p>
                <p v-else>0</p>
              </td>
              <td class="td">{{ donor.remarks }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="app" style="overflow-x: auto">
        <button class="export" @click="ExportExcel('xlsx')">
          Export as Excel
        </button>
        <h5>Pick Up Donors</h5>
        <table class="table" border="1">
          <thead>
            <tr class="tr">
              <th class="th" @click="sortpickup('name')">Name</th>
              <th class="th" @click="sortpickup('contact')">Contact No.</th>
              <th class="th" @click="sortpickup('address')">Postal Code</th>
              <th class="th" @click="sortpickup('unit')">Unit Number</th>
              <th class="th" :key="item" v-for="item in items">{{ item }}</th>
              <th class="th" @click="sortpickup('remarks')">Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr class="tr" :key="donor.id" v-for="donor in pickupdonors">
              <td class="td">{{ donor.name }}</td>
              <td class="td">{{ donor.contact }}</td>
              <td class="td">{{ donor.address }}</td>
              <td class="td">{{ donor.unit }}</td>

              <td class="td" :key="item.id" v-for="item in donor.items">
                <p v-if="item.quantity != 0">{{ item.quantity }}</p>
                <p v-else>0</p>
              </td>
              <td class="td">{{ donor.remarks }}</td>
            </tr>
          </tbody>
        </table>
        <h5>Self-Dropoff Donors</h5>
        <table class="table" border="1">
          <thead>
            <tr class="tr">
              <th class="th" @click="sortdropoff('name')">Name</th>
              <th class="th" @click="sortdropoff('contact')">Contact No.</th>
              <th class="th" :key="item" v-for="item in items">{{ item }}</th>
              <th class="th" @click="sortdropoff('remarks')">Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr class="tr" :key="donor.id" v-for="donor in dropoffdonors">
              <td class="td">{{ donor.name }}</td>
              <td class="td">{{ donor.contact }}</td>
              <td class="td" :key="item.id" v-for="item in donor.items">
                <p v-if="item.quantity != 0">{{ item.quantity }}</p>
                <p v-else>0</p>
              </td>
              <td class="td">{{ donor.remarks }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button class="back" @click="$router.push(`/mycampaigns/${campaignid}`)">
        Back to My Campaigns
      </button>
    </div>
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
      auth: false,
      campaignid: "",
      campaign: [],
      items: [],
      dropoffdonors: [],
      pickupdonors: [],
      currentSortPickUp: "address",
      currentSortDirPickUp: "asc",
      currentSortDropOff: "name",
      currentSortDirDropOff: "asc",
      isLoading: true,
      halal: false,
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
    checkAuth() {
      let admins = this.campaign.admin;
      for (var i = 0; i < admins.length; i++) {
        if (admins[i].email === this.user.email) {
          this.auth = true;
        }
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
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].dropoff) {
          this.dropoffdonors.push(res.data[i])
        } else {
          this.pickupdonors.push(res.data[i])
        }
      }
    },
    sortpickup(field) {
      if (field === this.currentSortPickUp) {
        this.currentSortDirPickUp = this.currentSortDirPickUp === "asc" ? "desc" : "asc";
      }
      this.currentSortPickUp = field;
      this.pickupdonors.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDirPickUp === "desc") modifier = -1;
        if (a[this.currentSortPickUp] < b[this.currentSortPickUp]) return -1 * modifier;
        if (a[this.currentSortPickUp] > b[this.currentSortPickUp]) return 1 * modifier;
        return 0;
      });
    },
    sortdropoff(field) {
      if (field === this.currentSortDropOff) {
        this.currentSortDirDropOff = this.currentSortDirDropOff === "asc" ? "desc" : "asc";
      }
      this.currentSortDropOff = field;
      this.pickupdonors.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDirDropOff === "desc") modifier = -1;
        if (a[this.currentSortDropOff] < b[this.currentSortDropOff]) return -1 * modifier;
        if (a[this.currentSortDropOff] > b[this.currentSortDropOff]) return 1 * modifier;
        return 0;
      });
    },

    ExportExcel(type, fn, dl) {
      var XLSX = require("xlsx");
      var elt = this.$refs.exportable_table;
      var wb = XLSX.utils.table_to_book(elt, { sheet: "Sheet JS" });
      return dl
        ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
        : XLSX.writeFile(
            wb,
            fn ||
              (this.campaign.name + "." || "SheetJSTableExport.") +
                (type || "xlsx")
          );
    },
  },
  async created() {
    this.getUserDetails();
    this.getCampaignId();
    this.campaign = await this.getCampaign();
    this.checkAuth();
    this.getItems();
    await this.getDonors();
    this.sortpickup("address");
    this.sortdropoff("name");

    let exportExcelA = document.createElement("script");
    exportExcelA.setAttribute(
      "src",
      "//unpkg.com/xlsx@0.15.1/dist/xlsx.full.min.js"
    );
    document.head.appendChild(exportExcelA);

    let exportExcelB = document.createElement("script");
    exportExcelB.setAttribute(
      "src",
      "//cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"
    );
    document.head.appendChild(exportExcelB);

    this.isLoading = false;
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
  padding: 5px;
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
.itemcount {
  text-align: center;
}
.export {
  background: white;
  border-inline: 3px;
  border-color: black;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-bottom: 20px;
  font-size: 30px;
}
.excel {
  display: none;
}

h5 {
  text-align: center;
}
</style>
