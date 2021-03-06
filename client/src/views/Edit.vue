<template>
  <Nav />
  <div v-if="isLoading">
    <Loading />
  </div>

  <div v-if="!isLoading">
    <div v-if="!auth">
      <h1>You are not authorised to view this page</h1>
    </div>
    <div class="edit-page" v-if="auth">
      <form @submit.prevent="submit">
        <div class="header">
          <h1 style="font-size: 10vw">Edit Campaign</h1>
        </div>

        <div class="edit-campaign">
          <label for="name">Name of Campaign</label>
          <input
            v-model="campaign.name"
            type="text"
            id="name"
            placeholder="Name of Campaign"
          />
        </div>

        <div class="edit-campaign">
          <label for="camDesc">Description of Campaign</label>
          <textarea
            v-model="campaign.camDesc"
            type="text"
            id="camDesc"
            rows="4"
            placeholder="Description of Campaign"
          />
        </div>

        <div class="edit-campaign">
          <label for="orgDesc">Description of Organisation</label>
          <textarea
            v-model="campaign.orgDesc"
            type="text"
            id="orgDesc"
            rows="4"
            placeholder="Description of Organisation"
          />
        </div>

        <div class="edit-campaign">
          <label for="collection-address"
            >Full Address of Collection Area</label
          >
          <input
            v-model="campaign.collectionAddress"
            type="text"
            id="collection-address"
            placeholder="Block Number(if needed), Street Name and Postal Code"
          />
        </div>

        <div class="edit-campaign">
          <label for="collection-contact">Organiser's Contact Number</label>
          <input
            v-model="campaign.collectionContact"
            type="tel"
            id="collection-contact"
            placeholder="Contact Number"
          />
        </div>

        <div class="edit-campaign">
          <label for="collection-date">Set a Collection Date</label>
          <input
            type="date"
            v-model="campaign.collectionDate"
            placeholder="DD/MM/YYYY"
            id="collection-date"
          />
        </div>

        <div class="edit-campaign">
          <label>Set a Collection Time</label>
          <div class="time">
            <label for="collection-start-time">Start:</label>
            <input
              class="start-time"
              type="time"
              v-model="campaign.collectionStartTime"
              id="collection-start-time"
            />
          </div>
          <div class="time">
            <label for="collection-end-time">End:</label>
            <input
              class="start-time"
              type="time"
              v-model="campaign.collectionEndTime"
              id="collection-end-time"
            />
          </div>
        </div>

        <h3 class="mini-header">Add items here</h3>

        <div>
          <AddItem @add-item="addItem" />
        </div>

        <h3 class="mini-header">List of Items</h3>

        <div class="no-items" v-if="items.length === 0">
          <h5>Please add some items!</h5>
        </div>

        <div>
          <Items @delete-item="deleteItem" :items="items" />
        </div>

        <div class="edit-campaign">
          <label for="tag">Tags / Keywords (Optional)</label>
          <input
            v-model="campaign.tags"
            type="text"
            id="tag"
            placeholder="e.g. Clementi, rice, elderly"
          />
        </div>

        <div class="publish-checkbox">
          <label for="publish">Publish Campaign</label>
          <input v-model="campaign.publish" type="checkbox" id="publish" />
        </div>

        <button class="edit" type="submit">Save Changes</button>
      </form>

      <div class="icons">
        <div class="delete">
          <i class="fas fa-trash" @click="deleteCampaign"></i>
          <p>Delete <br />Campaign</p>
        </div>
        <div class="admins">
          <i
            class="fas fa-user-friends"
            @click="$router.push(`/mycampaigns/${campaignid}/admins`)"
          ></i>
          <p>Manage <br />Administrators</p>
        </div>
      </div>
      <button class="back" @click="$router.push(`/mycampaigns/${campaignid}`)">
        Back to Campaign
      </button>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import Items from "@/components/Items";
import AddItem from "@/components/AddItem";
import axios from "axios";
import router from "@/router";
import Nav from "../components/Nav.vue";
import Loading from "@/components/Loading";

export default {
  name: "Dashboard",

  components: {
    Items,
    AddItem,
    Nav,
    Loading,
  },

  data() {
    return {
      user: {},
      auth: false,
      campaignid: "",
      campaign: [],
      items: [],
      isLoading: true,
    };
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
      this.campaignid = localStorage.getItem("editId");
    },

    async getCampaign() {
      const res = await axios.post("/api/campaign/getCampaignById", {
        _id: this.campaignid,
      });

      const data = await res.data[0];

      return data;
    },

    fetchItems() {
      this.items = this.campaign.items;
    },

    addItem(item) {
      this.items = [...this.items, item];
    },

    deleteItem(item) {
      var arr = this.items;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].item === item) {
          arr.splice(i, 1);
        }
      }
      this.items = arr;
    },

    async submit() {
      if (!this.campaign.name) {
        this.$swal("Please include a campaign name!");
        return;
      }

      if (!this.campaign.camDesc) {
        this.$swal("Please include a campaign description!");
        return;
      }

      if (!this.campaign.orgDesc) {
        this.$swal("Please include an organisation description!");
        return;
      }

      if (!this.campaign.collectionAddress) {
        this.$swal("Please include a collection address!");
        return;
      }

      if (!this.campaign.collectionContact) {
        this.$swal("Please include a contact number for emergency!");
        return;
      }

      if (this.campaign.collectionContact.length !== 8) {
        this.$swal("A contact number should consist of 8 digits");
        return;
      }

      if (!this.campaign.collectionDate) {
        this.$swal("Please include a collection date!");
        return;
      }

      if (!this.campaign.collectionStartTime) {
        this.$swal("Please include a collection time frame!");
        return;
      }

      if (!this.campaign.collectionEndTime) {
        this.$swal("Please include a collection time frame!");
        return;
      }

      if (this.campaign.collectionStartTime > this.campaign.collectionEndTime) {
        this.$swal("Your collection end time should be after your start time!");
        return;
      }

      if (this.items.length === 0) {
        this.$swal("Please include some items!");
        return;
      }

      if (!this.campaign.tags) {
        this.campaign.tags = "";
      }

      try {
        await axios.post("/api/campaign/editCampaign", {
          _id: this.campaignid,
          name: this.campaign.name,
          camDesc: this.campaign.camDesc,
          orgDesc: this.campaign.orgDesc,
          collectionAddress: this.campaign.collectionAddress,
          collectionContact: this.campaign.collectionContact,
          collectionDate: this.campaign.collectionDate,
          collectionStartTime: this.campaign.collectionStartTime,
          collectionEndTime: this.campaign.collectionEndTime,
          items: this.items,
          tags: String(this.campaign.tags).toLowerCase(),
          publish: this.campaign.publish,
        });

        this.$swal("Campaign edited!");

        await router.push("/dashboard");
      } catch (err) {
        let error = err.response;
        console.log(error.data.err.message);
        this.$swal("Error");
      }
    },

    async deleteCampaign() {
      if (confirm("You sure you want to delete this?")) {
        await axios.post("/api/donate/delDonors", {
          campaignid: this.campaignid,
        });
        await axios.post("/api/campaign/deleteCampaign", {
          _id: this.campaignid,
        });
        this.$swal("Campaign deleted!");
        await router.push("/mycampaigns");
      }
    },
  },

  async created() {
    this.getUserDetails();
    this.getCampaignId();
    this.campaign = await this.getCampaign();
    this.checkAuth();
    this.fetchItems();
    this.isLoading = false;
  },
};
</script>

<style scoped>
.edit-page {
  width: 100%;
  max-width: 700px;
  padding: 15px;
  margin: auto;
}

.edit-page .edit-campaign {
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.edit-page .header h1 {
  text-align: center;
  margin-top: -20px;
  font-size: 70px;
  margin-bottom: -15px;
}

.edit-page .mini-header {
  text-align: center;
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: -10px;
}

.edit {
  background: white;
  width: 100%;
  height: 100%;
  border-inline: 3px;
  border-color: black;
  font-size: 50px;
  cursor: pointer;
  margin-top: 70px;
  margin-bottom: 70px;
}

.no-items {
  text-align: center;
  font-size: 20px;
  margin-top: 30px;
}

.icons {
  display: flex;
}

.icons p {
  font-size: 20px;
}

.delete {
  display: block;
  margin: 0 auto;
  text-align: center;
}

.admins {
  display: block;
  margin: 0 auto;
  text-align: center;
}

.fas {
  color: grey;
  cursor: pointer;
  font-size: 40px;
  margin-bottom: 10px;
}

.back {
  background: white;
  border-inline: 3px;
  border-color: black;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-top: 30px;
  margin-bottom: 100px;
}

.publish-checkbox {
  margin-top: 40px;
  font-size: 22.5px;
  display: flex;
  justify-content: center;
}

.publish-checkbox input {
  transform: scale(1.5);
  margin-top: 10px;
  margin-left: 20px;
}

.edit-campaign .time {
  display: inline-block;
  margin-top: 5px;
}

.edit-campaign .time input {
  width: 40%;
  margin-right: 50%;
  float: right;
}
</style>
