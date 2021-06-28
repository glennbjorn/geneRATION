<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Email</label>
      <input
        type="email"
        v-model="email"
        name="email"
        placeholder="Add collaborator email"
      />
    </div>

    <input type="submit" value="Give permission" class="btn-block" />
  </form>
</template>

<script>
export default {
  name: "AddAdmin",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.email) {
        this.$swal("Please add an email");
        return;
      }

      const newAdmin = {
        email: this.email,
      };

      this.$emit("add-admin", newAdmin);

      this.email = "";
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
