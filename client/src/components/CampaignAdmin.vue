<template>
  <div @click="goto" class="campaignAdmin">
    <h3>
      {{ campaignAdmin.name }}
    </h3>
    <p>Collection Date: {{ campaignAdmin.collectionDate }}</p>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "CampaignAdmin",
  props: {
    campaignAdmin: Object,
  },
  methods: {
    async goto() {
      localStorage.removeItem("admincampaignid");
      localStorage.setItem("admincampaignid", this.campaignAdmin._id);
      await router.push(`/mycampaigns/${this.campaignAdmin._id}`);
    },
  },
};
</script>

<style scope>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>