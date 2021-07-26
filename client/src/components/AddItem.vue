<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Item & Description</label>
      <input
        type="text"
        v-model="item"
        name="item"
        placeholder="e.g. 3 in 1 Instant Coffee - Original (Less Sugar), ~30 Sachets"
      />
    </div>

    <div class="form-control">
      <label>Targeted Quantity</label>
      <input
        type="number"
        v-model="qty"
        name="qty"
        placeholder="Please indicate a whole number, e.g. 100"
      />
    </div>

    <input type="submit" value="Save Item" class="btn-block" />
  </form>
</template>

<script>
export default {
  name: "AddItem",
  data() {
    return {
      item: "",
      qty: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.item) {
        this.$swal("Please add an item");
        return;
      }

      if (!this.qty) {
        this.$swal("Please add a quantity");
        return;
      }

      const newItem = {
        item: this.item,
        qty: this.qty,
      };

      this.$emit("add-item", newItem);

      this.item = "";
      this.qty = "";
    },
  },
};
</script>


<style scoped>
.add-form {
  margin-bottom: 40px;
}

.form-control {
  width: 100%;
  max-width: 700px;
  padding: 15px;
  margin: auto;
  border: none;
}

.form-control label {
  display: block;
  text-align: left;
}

.form-control input {
  width: 100%;
  height: 40px;
  font-size: 17px;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}

.btn-block {
  background: white;
  border-inline: 3px;
  border-color: black;
  cursor: pointer;
  margin: 0 auto;
  display: block;
}
</style>
