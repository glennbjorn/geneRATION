<template>
  <div class="campaignAdmin">
    <h3>
      {{ campaignAdmin.name }}
      <!-- <i @click="$emit('delete-item', campaign.id)" class="fas fa-times"></i> -->
    </h3>
    <p>{{ campaignAdmin.collectionDate }}</p>
  </div>
</template>

<script>
export default {
  name: "CampaignAdmin",
  props: {
    campaignAdmin: Object,
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