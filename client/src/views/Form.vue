<template>
  <Nav />
  <div>
    <h1>{{ campaign.name }}</h1>
  </div>
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

      <div :key="n" v-for="n in donor.items.length">
        <input v-model="donor.items[n - 1].donate" type="checkbox" id="items" />
        <p>{{ campaign.items[n - 1].qty }} x {{ campaign.items[n - 1].item }}</p>
      </div>

      <div class="form-form">
        <label for="shelf-life"
          >I agree to only donate items that are <b>NOT</b> expiring in the next
          3 months</label
        >
        <input v-model="donor.shelfLife" type="checkbox" id="shelf-life" />
      </div>

      <div class="form-form">
        <label for="halal"
          >I agree to only donate items that are <b>Halal certified</b></label
        >
        <input v-model="donor.halal" type="checkbox" id="halal" />
      </div>

      <div class="form-form">
        <label for="remarks">Do you have any additional remarks?</label>
        <textarea
          v-model="donor.remarks"
          type="text"
          id="remarks"
          placeholder="e.g. I will be donating additional items!"
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
      campaignid: "",
      campaign: [],
      donor: {
        name: "",
        contact: "",
        address: "",
        unit: "",
        items: [],
        shelfLife: false,
        halal: false,
        remarks: ""
      },
    };
  },

  components: {
    Nav,
  },

  methods: {
    getCampaignId() {
      this.campaignid = localStorage.getItem("formId");
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

    getItems() {
      for (let i = 0; i < this.campaign.items.length; i++) {
        var item = this.campaign.items[i].item;
        var data = {item: item, donate: false};
        this.donor.items = [...this.donor.items, data]
      }
    },

    async submit() {
      if (!this.donor.shelfLife) {
        this.$swal(
          "Please declare that you agree to donate items with sufficient shelf life!"
        );
        return;
      }

      if (!this.donor.halal) {
        this.$swal(
          "Please declare that you agree to donate items that are Halal!"
        );
        return;
      }

      await axios.post("http://localhost:4000/donate", {
        campaignid: this.campaignid,
        name: this.donor.name,
        contact: this.donor.contact,
        address: this.donor.address,
        unit: this.donor.unit,
        items: this.donor.items,
        remarks: this.donor.remarks
      });

      localStorage.removeItem('tqid')
      localStorage.setItem('tqid', this.campaignid);

      router.push('/ThankYou')
    },
  },

  async created() {
    this.getCampaignId();
    this.campaign = await this.getCampaign();
    this.getItems();
  },
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