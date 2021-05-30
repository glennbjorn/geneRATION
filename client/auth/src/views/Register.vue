<template>
  <form @submit.prevent="submit">

    <img
      class="mx-auto"
      src="../../assets/logo.png"
      alt=""
      width="300"
      height="200"
    />
    <h1 class="h3 mb-3 fw-normal">Register</h1>

    <div class="form-floating">
      <input
        v-model="data.name"
        type="name"
        class="form-control"
        id="floatingName"
        placeholder="Ben Leong"
      />
      <label for="floatingName">Name</label>
    </div>

    <div class="form-floating">
      <input
        v-model="data.email"
        type="email"
        class="form-control"
        id="floatingEmail"
        placeholder="name@example.com"
      />
      <label for="floatingEmail">Email address</label>
    </div>

    <div class="form-floating">
      <input
        v-model="data.password"
        type="password"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
      />
      <label for="floatingPassword">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
  </form>
</template>

<script lang="ts">
import {reactive} from "vue";
import {useRouter} from 'vue-router';

export default {
  name: "Register",
  setup() {
    const data = reactive({
      name: "",
      email: "",
      password: "",
    });

    const router = useRouter();

    const submit = async () => {
      await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      await router.push('/login');
    };

    return {
      data,
      submit,
    };
  },
};
</script>