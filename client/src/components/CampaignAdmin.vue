<template>
  <div @click="goto" class="campaignAdmin">
    <h3>
      {{ campaignAdmin.name }}
    </h3>
    <div class="date-and-loc">
      <p>Collection Date: {{ date }}</p>
      <p>
        Self Drop-Off Location: {{ campaignAdmin.collectionAddress }}, S{{
          campaignAdmin.collectionPostalCode
        }}
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
  },

  created() {
    this.convertDate();
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
</style>