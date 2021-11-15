import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Estadisticas from '../views/Estadisticas.vue'
import Anuncio from '../views/Anuncio.vue'
import Carrito from '../views/Carrito.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/anuncio',
    name: 'Anuncio',
    component: Anuncio
  },
  {
    path: '/estadisticas',
    name:'Estadisticas',
    component: Estadisticas,
  },
  {
    path:'/carrito',
    name:'Carrito',
    component: Carrito
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
