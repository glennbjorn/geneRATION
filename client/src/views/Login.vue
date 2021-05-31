<template>
  <form @submit.prevent="submit">
    <img
      class="mx-auto"
      src="../../assets/logo.png"
      alt=""
      width="300"
      height="200"
    />
    <h1 class="h3 mb-3 fw-normal">Sign In</h1>

    <div class="form-floating">
      <input
        v-model="data.email"
        type="email"
        class="form-control"
        id="floatingInput"
        placeholder="name@example.com"
      />
      <label for="floatingInput">Email address</label>
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

    <p>
      Dont have an account?
      <router-link to="/register">Register here!</router-link>
    </p>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
  </form>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import {useStore} from "vuex";

export default {
  name: "Login",
  setup() {
    const data = reactive({
      email: "",
      password: "",
    });

    const router = useRouter();

    const store = useStore();

    const submit = async () => {
      const response = await fetch("http://localhost:4000/", { //change to /login after home page is created
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        await router.push("/home");
        await store.dispatch('setAuth', true);
      } else {
        alert("Invalid email or password. Please try again!")
      }
    };

    return {
      data,
      submit,
    };
  },
};
</script>