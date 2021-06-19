<template>
    <div :key="campaign.id" v-for="campaign in campaigns">
        <Campaign :campaign="campaign" />
    </div>
</template>

<script>
import Campaign from "./Campaign"

export default {
    name: 'Campaigns',
    props: {
        campaigns: Array
    },
    components: {
        Campaign 
    },
}
</script>