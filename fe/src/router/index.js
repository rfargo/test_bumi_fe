import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Filter from '../views/Filter.vue'
import Search from '../views/Search.vue'
import Login from '../views/Login.vue'
import Detail from '../views/Detail.vue'
import Album from '../views/Album.vue'
import AlbumDetail from '../views/AlbumDetail.vue'

import Create from '../views/admin/Create.vue'
import Admin from '../views/admin/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      { path: 'create', component: Create },
    ],
  },
  {
    path: '/album',
    name: 'Album',
    component: Album,
  },
  {
    path: '/album/:id',
    name: 'AlbumDetail',
    component: AlbumDetail,
  },
  {
    path: '/filter',
    name: 'Filter',
    component: Filter
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
