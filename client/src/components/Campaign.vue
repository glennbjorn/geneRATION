<template>
  <div @click="goto" class="campaign">
    <h3>
      {{ campaign.name }}
    </h3>
    <p>{{ campaign.camDesc }}</p>
    <div>
      <p><b>Collection Date:</b> {{ date }}</p>
      <p>
        <b>Location(s):</b><br />
        {{ campaign.collectionAddress }}
      </p>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import moment from "moment";

export default {
  name: "Campaign",

  data() {
    return {
      date: "",
    };
  },

  props: {
    campaign: Object,
  },

  methods: {
    async goto() {
      await router.push(`/${this.campaign._id}`);
    },

    convertDate() {
      this.date = moment(this.campaign.collectionDate).format("Do MMM YYYY");
    },
  },

  created() {
    this.convertDate();
  },
};
</script>

<style scoped>
.campaign {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.campaign h3 {
  text-align: center;
  font-size: 50px;
}

.campaign p {
  max-width: 1000px;
  text-align: center;
  margin: auto;
  margin-bottom: 15px;
}
</style>