<template>
  <Nav />
  <div>
    <h1 class="header">{{ campaign.name }}</h1>
  </div>
  <div class="form-page">
    <form @submit.prevent="submit">
      <div class="subheader">
        <h1>Thank you for donating!</h1>
        <h3>Kindly fill up your information below</h3>
      </div>

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
        <label for="address">Home Postal Code</label>
        <input
          v-model="donor.address"
          type="text"
          id="address"
          placeholder="Postal Code"
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

      <div class="mini-header">
        <h5>Items to donate</h5>
      </div>

      <div class="items-checkbox">
        <input v-model="toggle" type="checkbox" @click="selectAll" />
        <p>Select all</p>
      </div>

      <div class="items-checkbox" :key="n" v-for="n in donor.items.length">
        <input v-model="donor.items[n - 1].donate" type="checkbox" id="items" />
        <p>
          {{ campaign.items[n - 1].qty }} x {{ campaign.items[n - 1].item }}
        </p>
      </div>

      <div class="mini-header">
        <h5>Declarations</h5>
      </div>

      <div class="agree-checkbox">
        <label for="shelf-life"
          >I agree to only donate items that are <b>NOT</b> expiring in the next
          3 months</label
        >
        <input v-model="donor.shelfLife" type="checkbox" id="shelf-life" />
      </div>

      <div class="agree-checkbox">
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

      <button class="donate" type="submit">Pledge My Donation!</button>
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
        remarks: "",
      },
      toggle: false,
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
      const res = await axios.post("/api/campaign/getCampaignById", {
        _id: this.campaignid,
      });

      const data = await res.data[0];

      return data;
    },

    getItems() {
      for (let i = 0; i < this.campaign.items.length; i++) {
        var item = this.campaign.items[i].item;
        var data = { item: item, donate: false };
        this.donor.items = [...this.donor.items, data];
      }
    },

    async submit() {
      if (!this.donor.name) {
        this.$swal("Please include your name!");
        return;
      }

      if (!this.donor.contact) {
        this.$swal("Please include your contact number!");
        return;
      }

      if (!this.donor.address) {
        this.$swal("Please include your postal code!");
        return;
      }

      if (this.donor.address.length != 6) {
        this.$swal("Your postal code should be 6 digits!");
      }

      if (!this.donor.unit) {
        this.$swal("Please include your unit number!");
        return;
      }

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

      await axios.post("/api/donate", {
        campaignid: this.campaignid,
        name: this.donor.name,
        contact: this.donor.contact,
        address: this.donor.address,
        unit: this.donor.unit,
        items: this.donor.items,
        remarks: this.donor.remarks,
      });

      localStorage.removeItem("tqid");
      localStorage.setItem("tqid", this.campaignid);

      router.push("/ThankYou");
    },

    selectAll() {
      for (let i = 0; i < this.donor.items.length; i++) {
        this.donor.items[i].donate = !this.toggle;
      }
    },
  },

  async created() {
    this.getCampaignId();
    this.campaign = await this.getCampaign();
    this.getItems();
  },
};
</script>

<style scoped>
.subheader {
  text-align: center;
  margin-top: -20px;
}

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

.items-checkbox {
  width: 50%;
  margin-left: 15px;
}

.items-checkbox input {
  float: right;
  transform: scale(1.5);
}

.agree-checkbox {
  margin-top: 20px;
  margin-left: 15px;
}

.agree-checkbox input {
  float: right;
  transform: scale(1.5);
  margin-right: 15px;
}

.mini-header {
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 15px;
}

.mini-header h5 {
  text-align: left;
}

.donate {
  background: white;
  width: 100%;
  border-inline: 3px;
  border-color: black;
  font-size: 50px;
  cursor: pointer;
  margin-top: 20px;
}
</style>