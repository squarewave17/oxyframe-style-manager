import { createRouter, createWebHashHistory } from 'vue-router'
import SelectorsView from '../views/SelectorsView.vue'
import OverView from '../components/selectors/views/OverView.vue'
import OrganiserView from '../components/selectors/views/OrganiserView.vue'
import SearchView from '../components/selectors/views/SearchView.vue'
import StylesheetView from '../components/selectors/views/StylesheetView.vue'

const routes = [
  {
    path: '/',
    name: 'selectors',
    component: SelectorsView,
    children: [
      {
        path: '',
        name: 'overview',
        component: OverView,
      },
      {
        name: 'organiser',
        path: 'organiser',
        component: OrganiserView,
      },
      {
        name: 'search',
        path: 'search',
        component: SearchView,
      },
      {
        name: 'stylesheets',
        path: 'stylesheets',
        component: StylesheetView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
