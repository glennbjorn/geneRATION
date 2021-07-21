<template>
    <div :key="campaignAdmin.id" v-for="campaignAdmin in campaignsAdmin">
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
}
</script>