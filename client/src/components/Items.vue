<template>
    <div :key="item.item" v-for="item in items">
        <Item @delete-item="$emit('delete-item', item.item)" :item="item" />
    </div>
</template>

<script>
import Item from "./Item"

export default {
    name: 'Items',
    props: {
        items: Array
    },
    components: {
        Item 
    },
    emits: ['delete-item'],
}
</script>