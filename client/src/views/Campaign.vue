<template style="w3-mobile">
  <Nav />
  <div v-if="!isLoading">
    <div class="page">
      <h1 class="header">{{ campaign.name }}</h1>
      <!-- <h6 class="org">By {{ campaign.org }}</h6> -->
      <div class="date-and-loc">
        <h6>
          <b>Collection Date:</b><br />
          {{ date }}
        </h6>
        <h6>
          <b>Self Drop-Off Location:</b><br />
          {{ campaign.collectionAddress }}
        </h6>
      </div>
      <div class="cam-desc">
        {{ campaign.camDesc }}
      </div>
      <h5><b>Items for collection</b></h5>
      <div class="items" :key="item._id" v-for="item in campaign.items">
        <p>{{ item.qty }} x {{ item.item }}</p>
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
      <p style="margin-left: 25px"><b>Share</b><br /><b>This!</b></p>

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

export default {
  name: "Campaign",

  components: {
    Nav,
  },

  data() {
    return {
      campaignid: "",
      campaign: [],
      date: "",
      isLoading: true,
      Location: "",
      title: encodeURI("Hey, please support this Donation Drive! "),
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
  },

  async created() {
    this.getCampaignId();
    this.campaign = await this.getCampaign();
    this.convertDate();
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
}

.cam-desc {
  max-width: 1000px;
  font-size: 20px;
  text-align: center;
  margin: auto;
  margin-bottom: 30px;
}

h5 {
  text-align: center;
}

.items {
  text-align: center;
  margin: auto;
  align-content: center;
  margin-bottom: -15px;
}

.donate {
  background: white;
  width: 48%;
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
</style>