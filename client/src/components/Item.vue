<template>
  <div class="item">
    <h3>
      {{ item.item }}
      <i @click="$emit('delete-item', item.id)" class="fas fa-times"></i>
    </h3>
    <p>{{ item.qty }}</p>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: Object,
  },
};
</script>

<style scope>
.fas {
  color: red;
}

.item {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.item h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>