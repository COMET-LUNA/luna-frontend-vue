import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import FindMe from './views/FindMe.vue'
import Register from './views/Register.vue'
import Doctors from './views/Doctors.vue'
import Login from './views/Login.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
      path: '/findMe',
      name: 'FindMe',
      component: FindMe,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
        path: '/doctors',
        name: 'Doctors',
        component: Doctors,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router