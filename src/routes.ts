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

const openRoutes = ['Login', 'Register']

function canUserAccess(to: any) {
  const user = localStorage.getItem('user')
  console.log(user)
  for (var route of openRoutes){
    if (route == to.name){
      return true
    } else {
      if (user !== null) {
        return true
      }
    }
  }
  return false
}

router.beforeEach((to, from) => {
  // canUserAccess() returns `true` or `false`
  const canAccess = canUserAccess(to)
  if (!canAccess) return '/login'
})

export default router