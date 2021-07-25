<template>
  <Nav />
  <div v-if="isLoading">
    <Loading />
  </div>

  <div v-if="!isLoading">
    <div class="page" v-if="!loggedIn">
      <h1>You are not logged in!</h1>
    </div>
    <div class="create-page" v-if="loggedIn">
      <form @submit.prevent="submit">
        <div class="header">
          <h1>Create</h1>
          <h2>a new campaign!</h2>
        </div>

        <div class="create-campaign">
          <label for="name">Name of Campaign</label>
          <input
            v-model="campaign.name"
            type="text"
            id="name"
            placeholder="Name of Campaign"
          />
        </div>

        <div class="create-campaign">
          <label for="camDesc">Description of Campaign</label>
          <textarea
            v-model="campaign.camDesc"
            type="text"
            id="camDesc"
            rows="4"
            placeholder="Description of Campaign"
          />
        </div>

        <div class="create-campaign">
          <label for="orgDesc">Description of Organisation</label>
          <textarea
            v-model="campaign.orgDesc"
            type="text"
            id="orgDesc"
            rows="4"
            placeholder="Description of Organisation"
          />
        </div>

        <div class="create-campaign">
          <label for="collection-address"
            >Full Address of Collection Point</label
          >
          <input
            v-model="campaign.collectionAddress"
            type="text"
            id="collection-address"
            placeholder="Block Number(if needed), Street Name and Postal Code"
          />
        </div>

        <div class="create-campaign">
          <label for="collection-contact">Organiser's Contact Number</label>
          <input
            v-model="campaign.collectionContact"
            type="text"
            id="collection-contact"
            placeholder="Contact Number"
          />
        </div>

        <div class="create-campaign">
          <label for="collection-date">Set a Collection Date</label>
          <input
            type="date"
            v-model="campaign.collectionDate"
            placeholder="DD/MM/YYYY"
            id="collection-date"
          />
        </div>

        <div class="create-campaign">
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

        <div class="publish-checkbox">
          <label for="publish">Publish campaign</label>
          <input v-model="campaign.publish" type="checkbox" id="publish" />
        </div>

        <button class="btn" type="submit">Create Campaign</button>
      </form>
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
      userOrg: "",
      loggedIn: false,
      campaign: {
        name: "",
        camDesc: "",
        orgDesc: "",
        collectionAddress: "",
        collectionContact: "",
        collectionDate: "",
        collectionStartTime: "",
        collectionEndTime: "",
        qty: "",
        publish: false,
      },
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

    checkLoggedIn() {
      if (localStorage.getItem("jwt")) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    },

    async getUserOrg() {
      const res = await axios.post("/api/getuserorg", {
        email: this.user.email,
      });
      this.userOrg = res.data;
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

      try {
        await axios.post("/api/campaign/newCampaign", {
          email: [{ email: this.user.email }],
          org: this.userOrg,
          name: this.campaign.name,
          camDesc: this.campaign.camDesc,
          orgDesc: this.campaign.orgDesc,
          collectionAddress: this.campaign.collectionAddress,
          collectionContact: this.campaign.collectionContact,
          collectionDate: this.campaign.collectionDate,
          collectionStartTime: this.campaign.collectionStartTime,
          collectionEndTime: this.campaign.collectionEndTime,
          items: this.items,
          publish: this.campaign.publish,
        });

        this.$swal("Campaign created!");

        await router.push("/dashboard");
      } catch (err) {
        let error = err.response;
        console.log(error.data.err.message);
        this.$swal("Error");
      }
    },
  },

  async created() {
    this.getUserDetails();
    this.checkLoggedIn();
    this.getUserOrg();
    this.isLoading = false;
  },
};
</script>

<style scoped>
.create-page {
  width: 100%;
  max-width: 700px;
  padding: 15px;
  margin: auto;
}

.create-page .create-campaign {
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.create-page .mini-header {
  text-align: center;
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: -10px;
}

.create-page .header {
  text-align: center;
  margin-top: -20px;
}

.create-page .header h1 {
  font-size: 100px;
  margin-bottom: -15px;
}

.create-page .header h2 {
  font-size: 35px;
}

.btn {
  background: white;
  border-inline: 3px;
  border-color: black;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-top: 30px;
}

.no-items {
  text-align: center;
  font-size: 20px;
  margin-top: 30px;
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

.create-campaign .time {
  display: inline-block;
  margin-top: 5px;
}

.create-campaign .time input {
  width: 40%;
  margin-right: 50%;
  float: right;
}
</style>
