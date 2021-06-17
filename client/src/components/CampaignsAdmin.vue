<template>
    <div :key="campaignAdmin.id" v-for="campaignAdmin in campaignsAdmin">
        <!-- <Campaign @delete-item="$emit('delete-campaign', campaign.id)" :campaign="campaign" /> -->
        <CampaignAdmin :campaignAdmin="campaignAdmin" />
    </div>
</template>

<script>
import CampaignAdmin from "./CampaignAdmin"

export default {
    name: 'CampaignsAdmin',
    props: {
        campaignsAdmin: Array
    },
    components: {
        CampaignAdmin 
    },
    // emits: ['delete-campaign'],
}
</script>