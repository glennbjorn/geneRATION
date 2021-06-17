<template>
  <Nav />
  <div class="form-page">
    <form @submit.prevent="submit">
      <h1>Thank you for donating!</h1>
      <h3>Kindly fill up your information below!</h3>

      <div class="form-form">
        <label for="name">Name</label>
        <input v-model="donor.name" type="text" id="name" placeholder="Name" />
      </div>

      <div class="form-form">
        <label for="contact">Contact Number</label>
        <input
          v-model="donor.contact"
          type="text"
          id="contact"
          placeholder="Contact Number"
        />
      </div>

      <div class="form-form">
        <label for="address">Home Address</label>
        <input
          v-model="donor.address"
          type="text"
          id="address"
          placeholder="Home Address"
        />
      </div>

      <div class="form-form">
        <label for="unit">Unit Number</label>
        <input
          v-model="donor.unit"
          type="text"
          id="unit"
          placeholder="Unit Number"
        />
      </div>

      <div class="form-form">
        <label for="shelf-life">Shelf life</label>
        <input
          v-model="donor.shelfLife"
          type="checkbox"
          id="shelf-life"
          placeholder="Shelf life"
        />
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Pledge My Donation!
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import Nav from "../components/Nav.vue";

export default {
  name: "Form",

  data() {
    return {
      donor: {
        name: "",
        contact: "",
        address: "",
        unit: "",
        shelfLife: false,
      },
    };
  },

  components: {
    Nav,
  },

  methods: {
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

  // async created() {
  // },
};
</script>

<style>
.form-page {
  width: 100%;
  max-width: 700px;
  padding: 15px;
  margin: auto;
}

.form-page .form-form {
  display: flex;
  flex-direction: column;
  padding: 15px;
}
</style>