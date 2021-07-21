<template>
  <div @click="goto" class="campaignAdmin" v-if="!expired">
    <h3>
      {{ campaignAdmin.name }}
    </h3>
    <div>
      <p><b>Collection Date:</b> {{ date }}</p>
      <p>
        <b>Self Drop-Off Location:</b><br />
        {{ campaignAdmin.collectionAddress }}
      </p>
    </div>
  </div>
  <div @click="goto" class="expired" v-if="expired">
    <h3>
      {{ campaignAdmin.name }} (Expired)
    </h3>
    <div>
      <p><b>Collection Date:</b> {{ date }}</p>
      <p>
        <b>Self Drop-Off Location:</b><br />
        {{ campaignAdmin.collectionAddress }}
      </p>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import moment from "moment";

export default {
  name: "CampaignAdmin",

  data() {
    return {
      date: "",
      expired: false,
    };
  },

  props: {
    campaignAdmin: Object,
  },

  methods: {
    async goto() {
      localStorage.removeItem("admincampaignid");
      localStorage.setItem("admincampaignid", this.campaignAdmin._id);
      await router.push(`/mycampaigns/${this.campaignAdmin._id}`);
    },

    convertDate() {
      this.date = moment(this.campaignAdmin.collectionDate).format(
        "Do MMM YYYY"
      );
    },

    checkExpiry() {
      this.expired = this.campaignAdmin.collectionDate < moment(moment().toDate()).format("YYYY-MM-DD")
    }
  },

  created() {
    this.convertDate();
    this.checkExpiry();
  },
};
</script>

<style scoped>
.fas {
  color: red;
}

.campaignAdmin {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.campaignAdmin h3 {
  text-align: center;
  font-size: 50px;
}

.campaignAdmin p {
  text-align: center;
}

.expired {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  color: rgb(199, 199, 199);
}

.expired h3 {
  text-align: center;
  font-size: 50px;
}

.expired p {
  text-align: center;
}
</style>