<template>
  <Nav />
  <div v-if="!isLoading">
    <div v-if="!auth">
      <h1>You are not authorised to view this page</h1>
    </div>
    <div class="edit-page" v-if="auth">
      <form @submit.prevent="submit">
        <div class="header">
          <h1>Edit your campaign</h1>
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
          <label for="collection-address">Address of Collection Area</label>
          <input
            v-model="campaign.collectionAddress"
            type="text"
            id="collection-address"
            placeholder="Address of Collection Area"
          />
        </div>

        <div class="edit-campaign">
          <label for="collection-postcode"
            >Postal Code of Collection Area</label
          >
          <input
            v-model="campaign.collectionPostalCode"
            type="text"
            id="collection-postcode"
            placeholder="e.g. 512345"
          />
        </div>

        <div class="edit-campaign">
          <label for="collection-date">Choose a collection date</label>
          <input
            type="date"
            v-model="campaign.collectionDate"
            placeholder="DD/MM/YYYY"
            id="collection-date"
          />
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
          <label for="target">Target number of sets</label>
          <input
            v-model="campaign.target"
            type="text"
            id="target"
            placeholder="Please indicate a whole number"
          />
        </div>

        <button class="edit" type="submit">Save Changes</button>
      </form>

      <div class="icons">
        <div class="delete">
          <i class="fas fa-trash" @click="deleteCampaign"></i>
          <p>Delete campaign</p>
        </div>
        <div class="admins">
          <i
            class="fas fa-user-friends"
            @click="$router.push(`/mycampaigns/${campaignid}/admins`)"
          ></i>
          <p>Manage administrators</p>
        </div>
      </div>
      <button class="back" @click="$router.push(`/mycampaigns/${campaignid}`)">
        Back to My Campaigns
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

export default {
  name: "Dashboard",

  components: {
    Items,
    AddItem,
    Nav,
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

      if (!this.campaign.collectionPostalCode) {
        this.$swal(
          "Please include the postal code for the collection address!"
        );
        return;
      }

      if (this.campaign.collectionPostalCode.length !== 6) {
        this.$swal("A postal code should consist of 6 digits");
        return;
      }

      if (!this.campaign.collectionDate) {
        this.$swal("Please include a collection date!");
        return;
      }

      if (this.items.length === 0) {
        this.$swal("Please include some items!");
        return;
      }

      try {
        await axios.post("/api/campaign/editCampaign", {
          _id: this.campaignid,
          name: this.campaign.name,
          camDesc: this.campaign.camDesc,
          orgDesc: this.campaign.orgDesc,
          collectionAddress: this.campaign.collectionAddress,
          collectionPostalCode: this.campaign.collectionPostalCode,
          collectionDate: this.campaign.collectionDate,
          items: this.items,
          target: this.campaign.target,
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
</style>