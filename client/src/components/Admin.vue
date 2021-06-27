<template>
  <div class="admin">
    <h3>
      {{ admin.email }}
      <i @click="$emit('delete-admin', admin.email)" class="fas fa-times"></i>
    </h3>
  </div>
</template>

<script>

export default {
  name: "Admin",

  props: {
    admin: Object,
  },
};
</script>

<style scoped>
.fas {
  color: red;
  cursor: pointer;
}

.admin {
  background:white;
  margin: auto;
  padding: 10px 20px;
  max-width: 450px;
}

.admin h3 {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>