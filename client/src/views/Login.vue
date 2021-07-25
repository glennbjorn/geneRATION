<template>
  <Nav />

  <div class="header w3-mobile">
    <h1>Login</h1>
  </div>

  <div class="subheader"><h5>For Food Drive Organisers</h5></div>

  <div class="form-signin">
    <form @submit.prevent="submit">
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

      <p class="center">
        Dont have an account?
        <router-link to="/register">Register here!</router-link>
      </p>

      <button class="signin" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Nav from "../components/Nav.vue";

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
    Nav,
  },

  methods: {
    async submit() {
      try {
        let response = await axios.post("/api/login", this.login);
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

<style scoped>
.header h1 {
  font-size: 15vw;
  text-align: center;
  margin: -15px;
}

.subheader {
  text-align: center;
}

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

.signin {
  background: white;
  width: 100%;
  height: 100%;
  border-inline: 3px;
  border-color: black;
  font-size: 30px;
  cursor: pointer;
}

p {
  text-align: center;
}
</style>
