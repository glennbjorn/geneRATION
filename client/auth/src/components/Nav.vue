<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <!-- link Home -->
      <router-link to="/" class="navbar-brand" href="#">Home</router-link>

      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
          <li class="nav-item">
              <!-- link Login -->
            <router-link to="/login" class="nav-link" href="#">Login</router-link>
          </li>
          <li class="nav-item">
              <!-- link Register -->
            <router-link to="/register" class="nav-link" href="#">Register</router-link>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="auth">
          <li class="nav-item">
              <!-- link Logout -->
            <router-link to="/login" class="nav-link" href="#" @click="logout">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {computed} from "vue";
import { useStore } from 'vuex';

export default {
  name: "Nav",
  setup() {
    const store = useStore();

    const auth = computed(() => store.state.authenticated)

    const logout = async () => {
      await fetch("http://localhost:4000/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
      });
    }

    return {
      auth,
      logout
    }
  }
};
</script>