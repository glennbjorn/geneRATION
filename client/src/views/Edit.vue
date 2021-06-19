<template>
  <Nav />
  <div v-if="!loggedIn">
    <h1>You are not logged in!</h1>
  </div>
  <div class="edit-page" v-if="loggedIn">
    <form @submit.prevent="submit">
      <h1>Edit your campaign!</h1>

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

      <!-- having trouble adding datepicker -->

      <div class="edit-campaign">
        <label for="collection-date">Choose a collection date</label>
        <input
          v-model="campaign.collectionDate"
          placeholder="DD/MM/YYYY"
          id="collection-date"
        />
      </div>

      <div>
        <AddItem @add-item="addItem" />
      </div>

      <div>
        <p>List of items:</p>
        <Items @delete-item="deleteItem" :items="items" />
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Edit campaign
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
    </form>
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
      loggedIn: false,
      campaignid: "",
      campaign: [],
      items: [],
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

    getCampaignId() {
      this.campaignid = localStorage.getItem("editId");
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
      try {
        await axios.post("http://localhost:4000/campaign/editCampaign", {
          _id: this.campaignid,
          name: this.campaign.name,
          camDesc: this.campaign.camDesc,
          orgDesc: this.campaign.orgDesc,
          collectionDate: this.campaign.collectionDate,
          items: this.items,
        });

        this.$swal("Campaign edited!");

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
    this.getCampaignId();
    this.campaign = await this.getCampaign();
    this.fetchItems();
  },
};
</script>

<style>
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
</style>