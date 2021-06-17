<template>
  <Nav />
  <div class="form-signin">
    <form @submit.prevent="submit">
      <img
        class="mx-auto"
        src="../assets/logo.png"
        alt=""
        width="300"
        height="200"
      />
      <h1 class="h3 mb-3 fw-normal">Sign In</h1>

      <div class="form-floating">
        <input
          v-model="login.email"
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Email address</label>
      </div>

      <div class="form-floating">
        <input
          v-model="login.password"
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

      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Sign in
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Nav from '../components/Nav.vue'

export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },

  components: {
    Nav
  },

  methods: {
    async submit() {
      try {
        let response = await axios.post(
          "http://localhost:4000/login",
          this.login
        );
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          this.$swal("Successfully logged in!");
          await this.$router.push("/dashboard");
        } else {
          this.$swal("Something went wrong :(", "Try again");
        }
      } catch (err) {
        this.$swal("Login failed!", "Check authentication credentials");
      }
    },
  },
};
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>