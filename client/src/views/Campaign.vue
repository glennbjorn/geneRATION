<template style="w3-mobile">
  <Nav />
  <div v-if="isLoading">
    <Loading />
  </div>

  <div v-if="!isLoading">
    <div class="page">
      <h1 class="header">{{ campaign.name }}</h1>
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
      <div class="donate-desc">
        NOTE: Residents may choose to drop-off their donations at the ground
        floor of each of the blocks indicated above.
      </div>
      <div class="cam-desc">
        {{ campaign.camDesc }}
      </div>

      <br>
   
      <h5><b>Items for collection and donation progress</b></h5>
      <div class="itemcount" v-for="n in items.length" :key="n">
        {{ items[n - 1] }} : {{ itemCount[n - 1] }} /
        {{ campaign.items[n - 1].qty }}
        <!-- {{ items[n - 1] }} : {{ itemCount[n - 1] }} / {{ qty[n - 1] }} -->
      </div>

      <button class="donate" @click="gotoform">Donate Today!</button>
      <h5><b>More about the Organisation:</b></h5>
      <div class="org-desc">
        <p>{{ campaign.orgDesc }}</p>
      </div>
      <h5><b>For further enquiries, please contact the organiser at:</b></h5>
      <div class="org-desc">
        <p>{{ campaign.collectionContact }}</p>
      </div>
      <button class="home" @click="$router.push('/')">Back to Home</button>
    </div>
    <!--social share-->
    <div class="share-btn-container">
      <p><b>Share!</b></p>

      <a
        :href="'https://www.facebook.com/sharer.php?u=' + Location"
        class="facebook-btn"
      >
        <i class="fab fa-facebook"></i>
      </a>

      <a
        :href="'https://twitter.com/share?url=' + Location + '&text=' + title"
        class="twitter-btn"
      >
        <i class="fab fa-twitter"></i>
      </a>

      <a
        :href="'https://t.me/share/url?url=' + Location + '&text=' + title"
        class="telegram-btn"
      >
        <i class="fab fa-telegram"></i>
      </a>

      <a :href="'https://wa.me/?text=' + title + Location" class="whatsapp-btn">
        <i class="fab fa-whatsapp"></i>
      </a>
    </div>
    <!--end of social share-->
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import axios from "axios";
import moment from "moment";
import "@/assets/socialSharing.css";
import Loading from "@/components/Loading";

export default {
  name: "Campaign",

  components: {
    Nav,
    Loading,
  },

  data() {
    return {
      campaignid: "",
      campaign: [],
      date: "",
      isLoading: true,
      Location: "",
      title: encodeURI("Hey, please support this Donation Drive! "),
      donors: [],
      items: [],
      itemCount: [],
    };
  },

  methods: {
    getCampaignId() {
      this.campaignid = this.$route.path.slice(1);
    },

    async getCampaign() {
      const res = await axios.post("/api/campaign/getCampaignById", {
        _id: this.campaignid,
      });

      const data = await res.data[0];

      return data;
    },

    gotoform() {
      localStorage.removeItem("formId"),
        localStorage.setItem("formId", this.campaignid),
        this.$router.push(`/${this.campaignid}/donate`);
    },

    convertDate() {
      this.date = moment(this.campaign.collectionDate).format("Do MMM YYYY");
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
  },

  async created() {
    this.getCampaignId();
    this.campaign = await this.getCampaign();
    this.convertDate();
    this.donors = await this.getDonors();
    this.getItemCount();
    this.isLoading = false;
    this.Location = encodeURI(window.location.href);
    // this.Location = encodeURI("https://new-generation.herokuapp.com/");
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css");

.org {
  text-align: center;

  margin-top: -20px;
}

.date-and-loc {
  text-align: center;
  padding: 20px;
  margin-top: -20px;
}

.cam-desc {
  max-width: 1000px;
  font-size: 20px;
  text-align: center;
  margin: auto;
  margin-bottom: 30px;
}

.donate-desc {
  font-size: 18px;
  text-align: center;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 30px;
}

h5 {
  text-align: center;
}

h5 b {
  font-weight: 2000;
}

.items {
  text-align: center;
  margin: auto;
  align-content: center;
  margin-bottom: -15px;
}

.donate {
  background: white;
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

.home {
  background: white;
  border-inline: 3px;
  border-color: black;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-top: 30px;
  margin-bottom: 150px;
}

.itemcount {
  text-align: center;
}
</style>
