<template>
  <Nav />

  <div class="header">
    <h1>Register</h1>
  </div>

  <div class="form-register">
    <form @submit.prevent="submit">
      <div class="form-floating">
        <input
          v-model="reg.name"
          type="name"
          class="form-control"
          id="floatingName"
          placeholder="Name"
        />
        <label for="floatingName">Name</label>
      </div>

      <div class="form-floating">
        <input
          v-model="reg.organisation"
          type="organisation"
          class="form-control"
          id="floatingOrganisation"
          placeholder="Organisation"
        />
        <label for="floatingOrganisation">Organisation</label>
      </div>

      <div class="form-floating">
        <input
          v-model="reg.email"
          type="email"
          class="form-control"
          id="floatingEmail"
          placeholder="name@example.com"
        />
        <label for="floatingEmail">Email address</label>
      </div>

      <div class="form-floating">
        <input
          v-model="reg.password"
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          minlength="8"
        />
        <label for="floatingPassword">Password</label>
      </div>

      <div class="form-floating">
        <input
          v-model="reg.password.confirm"
          type="cfmpassword"
          class="form-control"
          id="floatingCfmPassword"
          placeholder="Confirm Password"
          minlength="8"
        />
        <label for="floatingCfmPassword">Confirm Password</label>
      </div>

      <p>
        Already have an account?
        <router-link to="/login">Sign in here!</router-link>
      </p>

      <button class="register" type="submit">
        New account
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import Nav from "../components/Nav.vue";

export default {
  name: "Register",
  data() {
    return {
      reg: {
        name: "",
        organisation: "",
        email: "",
        password: "",
        cfmpassword: "",
      },
    };
  },
  components: {
    Nav,
  },
  methods: {
    async submit() {
      if (!this.reg.name) {
        this.$swal(
          "Please include your name!"
        );
        return;
      }

      if (!this.reg.organisation) {
        this.$swal(
          "Please include your organisation!"
        );
        return;
      }

      if (!this.reg.email) {
        this.$swal(
          "Please include your email!"
        );
        return;
      }

if (!this.reg.password) {
        this.$swal(
          "Please include your password!"
        );
        return;
      }

      if (!this.reg.cfmpassword) {
        this.$swal(
          "Please confirm your password!"
        );
        return;
      }

      if (this.reg.password != this.reg.cfmpassword) {
        this.$swal(
          "Your passwords do not match! Please try again."
        );
        return;
      }

      try {
        let response = await axios.post(
          "http://localhost:4000/register",
          this.reg
        );
        let token = response.data.token;
        if (token) {
          this.$swal("Successfully created an account!", "Sign in");
          await router.push("/login");
        } else {
          this.$swal("Something went wrong :(", "Try again");
        }
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
          this.$swal("Error", "Email already in use. Please use another email");
        } else {
          this.$swal("Error", error.data.err.message, "error");
        }
      }
    },
  },
};
</script>

<style scoped>
.header h1 {
  font-size: 150px;
  text-align: center;
  margin: -15px;
}

.form-register {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-register .checkbox {
  font-weight: 400;
}

.form-register .form-floating:focus-within {
  z-index: 2;
}

.form-register input[type="name"] {
  margin-bottom: -2px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-register input[type="organisation"] {
  margin-bottom: -2px;
  border-radius: 0;
}

.form-register input[type="email"] {
  margin-bottom: -2px;
  border-radius: 0;
}

.form-register input[type="password"] {
  margin-bottom: -2px;
  border-radius: 0;
}

.form-register input[type="cfmpassword"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

p {
  text-align: center;
}

.register {
  background: white;
  width: 100%;
  height: 100%;
  border-inline: 3px;
  border-color: black;
  font-size: 30px;
  cursor: pointer;
}
</style>