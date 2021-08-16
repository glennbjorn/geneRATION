<template>
  <Nav />
  <div v-if="isLoading">
    <Loading />
  </div>

  <div v-if="!isLoading">
    <div class="page" v-if="!auth">
      <h1>You are not authorised to view this page</h1>
    </div>
    <div class="page" v-if="auth">
      <h1 class="header" style="font-size: 10vw">{{ campaign.name }}</h1>
      <!-- <h6 class="org">By {{ campaign.org }}</h6> -->
      <div class="date-and-loc">
        <h5>
          <b>Collection Date: </b>
          {{ date }}
        </h5>
        <h5>
          <b>Collection Time: </b>
          {{ campaign.collectionStartTime }} to {{ campaign.collectionEndTime }}
        </h5>
        <h5>
          <b>Collection Point(s): </b><br />
          {{ campaign.collectionAddress }}
        </h5>
      </div>
      <div class="cam-desc">
        {{ campaign.camDesc }}
      </div>
      <h5><b>Items for Collection</b></h5>
      <div class="items" :key="item._id" v-for="item in campaign.items">
        <p>{{ item.qty }} x {{ item.item }}</p>
      </div>

      <div class="qr-img">
        <img :src="imgsrc" />
      </div>

      <div class="w3-bar">
        <button class="btn w3-mobile" @click="goToEdit">Edit</button>
        <button class="btn w3-mobile" @click="goToDonorsInfo">
          Donors Information
        </button>
      </div>

      <h5 style="margin-top: 30px"><b>More about the organisation:</b></h5>
      <div class="org-desc">
        <p>{{ campaign.orgDesc }}</p>
      </div>

      <h5><b>Donation Progress</b></h5>
      <div class="itemcount" v-for="n in items.length" :key="n">
        {{ items[n - 1] }} : {{ itemCount[n - 1] }} /
        {{ campaign.items[n - 1].qty }}
        <!-- {{ items[n - 1] }} : {{ itemCount[n - 1] }} / {{ qty[n - 1] }} -->
      </div>

      <button class="back" @click="$router.push('/mycampaigns')">
        Back to My Campaigns
      </button>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import Nav from "../components/Nav.vue";
import axios from "axios";
import router from "@/router";
import moment from "moment";
import Loading from "@/components/Loading";

export default {
  name: "Dashboard",
  data() {
    return {
      user: {},
      auth: false,
      campaignid: "",
      campaign: [],
      donors: [],
      items: [],
      itemCount: [],
      date: "",
      isLoading: true,
      imgsrc: "",
    };
  },
  components: {
    Nav,
    Loading,
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
    getCampaignId() {
      this.campaignid = localStorage.getItem("admincampaignid");
    },
    async getCampaign() {
      const res = await axios.post("/api/campaign/getCampaignById", {
        _id: this.campaignid,
      });
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
      const res = await axios.post("/api/donate/getDonors", {
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
        let donor = this.donors[j]; // Loop about the particular donor

        for (let k = 0; k < donor.items.length; k++) {
          if (donor.items[k].donate) {
            // Checks if the item is donated
            let index = this.items.indexOf(donor.items[k].item); //checks position of item donated

            if (index !== -1) {
              if (arr[index] >= 0) {
                // Checks if there are any other donation
                arr[index] += donor.items[k].quantity; // The particular index (representing 1 specific item) inside the array will count if being donated
              } else {
                // Initialise the array
                arr[index] = 0;
                arr[index] = donor.items[k].quantity;
              }
            }
          }
        }
      }
      this.itemCount = arr; //store inside
    },

    createQR() {
      this.url = "new-generation.herokuapp.com/" + this.campaignid;
      this.imgsrc =
        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
        this.url;
    },
    convertDate() {
      this.date = moment(this.campaign.collectionDate).format("Do MMM YYYY");
    },
  },
  async created() {
    this.getUserDetails();
    this.getCampaignId();
    this.campaign = await this.getCampaign();
    this.checkAuth();
    this.donors = await this.getDonors();
    this.getItemCount();
    this.createQR();
    this.convertDate();
    this.isLoading = false;
  },
};
</script>

<style scoped>
.org {
  text-align: center;
  margin-top: -20px;
}
.date-and-loc {
  text-align: center;
  padding: 20px;
}
.cam-desc {
  max-width: 1000px;
  font-size: 20px;
  text-align: center;
  margin: auto;
  margin-bottom: 30px;
}
h5 {
  text-align: center;
}
.items {
  text-align: center;
  margin: auto;
  align-content: center;
  margin-bottom: -15px;
}
.donate {
  background: white;
  width: 48%;
  height: 100%;
  border-inline: 3px;
  border-color: black;
  font-size: 50px;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-top: 65px;
  margin-bottom: 50px;
}
.org-desc {
  max-width: 1000px;
  font-size: 15px;
  text-align: center;
  margin: auto;
  margin-bottom: 30px;
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
.container {
  padding: 30px;
}
.left {
  background: white;
  width: 30%;
  height: 100%;
  border-inline: 3px;
  border-color: black;
  font-size: 30px;
  cursor: pointer;
  margin-left: 15%;
}
.right {
  background: white;
  width: 30%;
  float: right;
  height: 100%;
  border-inline: 3px;
  border-color: black;
  font-size: 30px;
  cursor: pointer;
  margin-right: 15%;
}
.itemcount {
  text-align: center;
}
.qr-img {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.qr-img img {
  max-width: 200px;
  width: 100%;
}

.btn {
  background: white;
  border-inline: 3px;
  border-color: black;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-top: 30px;
  font-size: 50px;
}
</style>
