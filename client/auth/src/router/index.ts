import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

// routes for Home, Login & Register
const routes: Array<RouteRecordRaw> = [
  {path: '/home', component: Home},
  {path: '/', component: Login},
  // {path: '/login', component: Login},
  {path: '/register', component: Register}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
