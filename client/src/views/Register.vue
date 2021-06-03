<template>
  <div class="form-register">
    <form @submit.prevent="submit">
      <img
        class="mx-auto"
        src="../assets/logo.png"
        alt=""
        width="300"
        height="200"
      />
      <h1 class="h3 mb-3 fw-normal">Register</h1>

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

      <!-- <div class="form-floating">
        <input
          v-model="reg.password.confirm"
          type="cfmpassword"
          class="form-control"
          id="floatingCfmPassword"
          placeholder="Confirm Password"
          minlength="8"
        />
        <label for="floatingCfmPassword">Confirm Password</label>
      </div> -->

      <p>
        Already have an account?
        <router-link to="/login">Sign in here!</router-link>
      </p>

      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Register
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import router from "@/router"

export default {
  name: "Register",
  data() {
    return {
      reg: {
        name: '',
        organisation: '',
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async submit() {
      try {
        let response = await axios.post('http://localhost:4000/register', this.reg);
        let token = response.data.token;
        if (token) {
          this.$swal("Successfully create an account!", "Sign in")
        await router.push('/login');
        } else {
          this.$swal("Something went wrong :(", "Try again")
        }
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
          this.$swal("Error", "Email already in use. Please use another email");
        } else {
          this.$swal("Error", error.data.err.message, "error");
        }
      }
    }
  }
};
</script>

<style>
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

/* .form-register input[type="password"] {
  margin-bottom: -2px;
  border-radius: 0;
} */

.form-register input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>