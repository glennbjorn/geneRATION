<template>
  <div class="item">
    <h3>
      {{ item.item }}
      <i @click="$emit('delete-item', item.item)" class="fas fa-times"></i>
    </h3>
    <p>Quantity: {{ item.qty }}</p>
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
  background:white;
  margin: 5px;
  padding: 10px 20px;
}

.item h3 {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>