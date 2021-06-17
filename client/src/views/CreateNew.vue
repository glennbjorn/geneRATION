<template>
  <Nav />
  <div v-if="!loggedIn">
    <h1>You are not logged in!</h1>
  </div>
  <div class="create-page" v-if="loggedIn">
    <form @submit.prevent="submit">
      <h1>Create a new campaign!</h1>

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

      <!-- having trouble adding datepicker -->

      <div class="create-campaign">
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
        Create campaign
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
      userOrg: "",
      loggedIn: false,
      campaign: {
        name: "",
        camDesc: "",
        orgDesc: "",
        collectionDate: "",
      },
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

    async getUserOrg() {
      const res = await axios.post("http://localhost:4000/getuserorg", {
        email: this.user.email,
      });
      this.userOrg = res.data;
    },

    checkLoggedIn() {
      if (localStorage.getItem("jwt")) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    },

    async addItem(item) {
      const res = await fetch("http://localhost:5000/items", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(item),
      });

      const data = await res.json();

      this.items = [...this.items, data];
    },

    async deleteItem(id) {
      if (confirm("Are you sure?")) {
        const res = await fetch(`http://localhost:5000/items/${id}`, {
          method: "DELETE",
        });

        res.status === 200
          ? (this.items = this.items.filter((item) => item.id !== id))
          : alert("Error deleting item");
      }
    },

    async fetchItems() {
      const res = await fetch("http://localhost:5000/items");

      const data = await res.json();

      return data;
    },

    async fetchItem(id) {
      const res = await fetch(`http://localhost:5000/items/${id}`);

      const data = await res.json();

      return data;
    },

    async submit() {
      try {
        await this.getUserOrg();
        console.log(this.campaign);
        let response = await axios.post(
          "http://localhost:4000/create/newCampaign",
          {
            org: this.userOrg,
            name: this.campaign.name,
            camDesc: this.campaign.camDesc,
            orgDesc: this.campaign.orgDesc,
            collectionDate: this.campaign.collectionDate,
            items: this.items,
          }
        );
        console.log(response);
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
    this.items = await this.fetchItems();
    this.getUserOrg();
  },
};
</script>

<style>
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
</style>