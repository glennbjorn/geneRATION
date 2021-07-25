<template>
  <Nav />
  <div v-if="isLoading">
    <Loading />
  </div>

  <div v-if="!isLoading">
    <div>
      <h1 class="header">{{ campaign.name }}</h1>
    </div>
    <div class="form-page">
      <form @submit.prevent="submit">
        <div class="subheader">
          <h2>
            By pledging your donations, you will be helping many people in need!
          </h2>
          <h3><br />Kindly fill up your information below</h3>
        </div>

        <div class="form-form">
          <label for="name">Name</label>
          <input
            v-model="donor.name"
            type="text"
            id="name"
            placeholder="Name"
          />
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

        <div class="mini-header">
          <h5>Self-dropoff or have volunteers collect</h5>
        </div>

        <div class="dropoff-checkbox">
          <input v-model="donor.dropoff" type="checkbox" id="dropoff" />
          <p>
            I will personally send the items to the collection point at
            {{ campaign.collectionAddress }} within
            {{ campaign.collectionStartTime }} to
            {{ campaign.collectionEndTime }}.
          </p>
        </div>

        <div v-if="!donor.dropoff">
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
        </div>

        <div class="mini-header">
          <h5>Items to donate</h5>
        </div>

        <div class="items">
          <table>
            <tbody>
              <tr>
                <th colspan="1" style="width: 50%">Item Name</th>
                <th scope="col" style="width: 40%">Donation Progress</th>
                <th scope="col" style="width: 10%">Quantity</th>
              </tr>
              <tr :key="n" v-for="n in campaign.items.length">
                <td>{{ campaign.items[n - 1].item }}</td>
                <td>
                  {{ itemCount[n - 1] }} / {{ campaign.items[n - 1].qty }}
                </td>
                <td><input type="number" value="1" name="quantity" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mini-header">
          <h5>Declarations</h5>
        </div>

        <div class="agree-checkbox">
          <input v-model="donor.shelfLife" type="checkbox" id="shelf-life" />
          <p>
            I agree to only donate items that are <b>NOT</b> expiring in the
            next 3 months <br />(starting from the day of collection)
          </p>
        </div>

        <br />

        <div class="agree-checkbox">
          <input v-model="donor.halal" type="checkbox" id="halal" />
          <p>I agree to only donate items that are <b>Halal Certified</b></p>
        </div>

        <br />

        <div class="agree-checkbox">
          <input v-model="donor.pdpa" type="checkbox" id="pdpa" />
          <p>
            COLLECTION, USE AND DISCLOSURE OF PERSONAL DATA:
            <br /><br />
            <b>I AGREE TO ALLOW THE ORGANISER(S)</b> to perform obligations in
            the course of or in connection with our provision of the goods
            and/or services - "Doorstep Collection Service" <b>ALLOWED</b> by
            you. <br /><br />
            (Note: no external disclosure would be made)
          </p>
        </div>

        <br />

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
      </form>
      <button class="back" @click="$router.push(`/${campaignid}`)">
        Back to Campaigns
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import Nav from "../components/Nav.vue";
import Loading from "@/components/Loading";

var quantity = null;
var quantity_arr = [];

//To get values of the textbox and store inside an array (quantity_arr)
function update_quantity() {
  quantity = document.getElementsByName("quantity");
  quantity_arr = [];
  for (var x = 0; x < quantity.length; x++) {
    //store in array
    quantity_arr.push(quantity[x].value);
  }
}

export default {
  name: "Form",

  data() {
    return {
      campaignid: "",
      campaign: [],
      donors: [],
      itemm: [],
      itemCount: [],
      donor: {
        name: "",
        contact: "",
        address: "",
        unit: "",
        items: [],
        shelfLife: false,
        halal: false,
        pdpa: false,
        remarks: "",
        dropoff: false,
      },
      toggle: false,
      isLoading: true,
    };
  },

  components: {
    Nav,
    Loading,
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
      let arr = [];
      for (let i = 0; i < this.campaign.items.length; i++) {
        var item = this.campaign.items[i].item;
        quantity = this.campaign.items[i].qty;
        arr = [...arr, item];
        var data = { item: item, quantity: quantity, donate: false };
        this.donor.items = [...this.donor.items, data];
      }
      this.itemm = arr;
    },

    async getDonors() {
      const res = await axios.post("/api/donate/getDonors", {
        campaignid: this.campaignid,
      });
      return res.data;
    },

    getItemCount() {
      this.getItems();
      let arr = [];

      for (let i = 0; i < this.itemm.length; i++) {
        arr = [...arr, 0];
      }
      for (let j = 0; j < this.donors.length; j++) {
        let donor = this.donors[j];
        for (let k = 0; k < donor.items.length; k++) {
          if (donor.items[k].donate) {
            let index = this.itemm.indexOf(donor.items[k].item);
            if (index !== -1) {
              if (arr[index] >= 0) {
                arr[index] += donor.items[k].quantity;
              } else {
                arr[index] = 0;
                arr[index] = donor.items[k].quantity;
              }
            }
          }
        }
      }
      this.itemCount = arr;
    },

    async submit() {
      // Call function to get the updated array of the quantity,
      // Empty the donor array to add new/updated quantity,
      // Reuse the code on getItems() but change to use quantity_arr instead of campaign quantity ("update quantity")
      // Donate change to true

      // get updated array of quantity
      update_quantity();
      //empty the donor item array to store updated quantity
      this.donor.items = [];
      console.log(quantity_arr);
      for (let i = 0; i < this.campaign.items.length; i++) {
        var item = this.campaign.items[i].item;
        quantity = quantity_arr[i];
        var data = { item: item, quantity: quantity, donate: true };
        this.donor.items = [...this.donor.items, data];
      }

      if (!this.donor.name) {
        this.$swal("Please include your name!");
        return;
      }

      if (!this.donor.contact) {
        this.$swal("Please include your contact number!");
        return;
      }

      if (this.donor.contact.length != 8) {
        this.$swal("Your contact number should be 8 digits.");
        return;
      }

      if (!this.donor.dropoff) {
        if (!this.donor.address) {
          this.$swal("Please include your postal code!");
          return;
        }

        if (this.donor.address.length != 6) {
          this.$swal("Your postal code should be 6 digits!");
          return;
        }

        if (!this.donor.unit) {
          this.$swal("Please include your unit number!");
          return;
        }
      } else {
        this.donor.address = "NA";
        this.donor.unit = "NA";
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

      if (!this.donor.pdpa) {
        this.$swal(
          "Please AGREE to PDPA to proceed!"
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
        dropoff: this.donor.dropoff,
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
    this.donors = await this.getDonors();
    this.getItemCount();
    this.getItems();
    this.isLoading = false;
  },
};
</script>

<style scoped>
.subheader {
  text-align: center;
  margin-top: -20px;
}

.subheader h2 {
  text-align: center;
  margin-left: 5%;
  margin-right: 5%;
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
.all {
  display: inline;
}
.item-name {
  display: inline;
  margin-left: 15px;
}

.items-checkbox {
  width: 50%;
  margin-left: 15px;
}

.items-checkbox-quantity {
  float: left;
  margin-right: 25px !important;
}

.items-checkbox input {
  transform: scale(1.5);
  float: right;
}

.agree-checkbox {
  margin-top: 10px;
  margin-left: 20px;
}

.agree-checkbox input {
  float: left;
  transform: scale(1.5);
  margin-right: 15px;
  margin-top: 5px;
}

.agree-checkbox p {
  margin-left: 30px;
  margin-right: 15px;
  text-align: justify;
}

.dropoff-checkbox {
  margin-top: 20px;
  margin-left: 20px;
}

.dropoff-checkbox input {
  float: left;
  transform: scale(1.5);
  margin-top: 5px;
}

.dropoff-checkbox p {
  margin-left: 30px;
  margin-right: 15px;
  text-align: justify;
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

.items {
  padding: 15px;
}

table {
  width: 100%;
}

table input {
  width: 100%;
}
</style>
