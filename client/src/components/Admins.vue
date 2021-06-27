<template>
    <div :key="admin.email" v-for="admin in admins">
        <Admin @delete-admin="$emit('delete-admin', admin.email)" :admin="admin" />
    </div>
</template>

<script>
import Admin from "./Admin"

export default {
    name: 'Admins',
    props: {
        admins: Array
    },
    components: {
        Admin 
    },
    emits: ['delete-admin'],
}
</script>