<template>
  <div @click="goto" class="campaign">
    <h3>
      {{ campaign.name }}
    </h3>
    <p>{{ campaign.camDesc }}</p>
    <p>Collection Date: {{ campaign.collectionDate }}</p>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Campaign",

  props: {
    campaign: Object,
  },

  methods: {
    async goto() {
      localStorage.removeItem('campaignid')
      localStorage.setItem('campaignid', this.campaign._id)
      await router.push(`/${this.campaign._id}`)
    },
  }
};
</script>

<style scope>
.fas {
  color: red;
}

.campaign {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.campaign h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>