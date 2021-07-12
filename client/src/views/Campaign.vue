<template>
  <Nav />
  <div v-if="!isLoading">
    <div class="page">
      <h1 class="header">{{ campaign.name }}</h1>
      <h6 class="org">By {{ campaign.org }}</h6>
      <div class="date-and-loc">
        <h6>Collection Date: {{ date }}</h6>
        <h6>
          Self Drop-Off Location: {{ campaign.collectionAddress }}, S{{
            campaign.collectionPostalCode
          }}
        </h6>
      </div>
      <div class="cam-desc">
        {{ campaign.camDesc }}
      </div>
      <h5>Items for Collection</h5>
      <div class="items" :key="item._id" v-for="item in campaign.items">
        <p>{{ item.qty }} x {{ item.item }}</p>
      </div>
      <button class="donate" @click="gotoform">Donate Today!</button>
      <h5>More about the Organisation:</h5>
      <div class="org-desc">
        <p>{{ campaign.orgDesc }}</p>
      </div>
      <button class="home" @click="$router.push('/')">Back to Home</button>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import axios from "axios";
import moment from "moment";

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
  },
};
</script>

<style scoped>
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

h5,
h6 {
  text-align: center;
  font-weight: bold;
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
}
</style>