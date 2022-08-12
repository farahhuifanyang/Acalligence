import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import EntityPerson from '../views/EntityPerson.vue'
import EntityPerson_0 from '../views/EntityPerson_0.vue'
import EntityPerson_1 from '../views/EntityPerson_1.vue'
import EntityPerson_2 from '../views/EntityPerson_2.vue'
import EntityInstitute from '../views/EntityInstitute.vue'
import EntityInstitute_0 from '../views/EntityInstitute_0.vue'
import SixDegrees from '../views/SixDegrees.vue'
import Article from '../views/Article.vue'
import Event from '../views/Event.vue'
import SearchResult from '../views/SearchResult.vue'
import EventEvolutionaryGraph from "../views/EventEvolutionaryGraph.vue"
import Organization from "../views/Organization.vue"


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/EntityPerson',
    name: 'EntityPerson',
    component: EntityPerson
  },
  {
    path: '/EntityPerson_0',
    name: 'EntityPerson_0',
    component: EntityPerson_0
  },
  {
    path: '/EntityPerson_1',
    name: 'EntityPerson_1',
    component: EntityPerson_1
  },
  {
    path: '/EntityPerson_2',
    name: 'EntityPerson_2',
    component: EntityPerson_2
  },
  {
    path: '/EntityInstitute',
    name: 'EntityInstitute',
    component: EntityInstitute
  },
  {
    path: '/EntityInstitute_0',
    name: 'EntityInstitute_0',
    component: EntityInstitute_0
  },
  {
    path: '/SixDegrees',
    name: 'SixDegrees',
    component: SixDegrees
  },
  {
    path: '/article',
    name: 'Article',
    component: Article
  },
  {
    path: '/event',
    name: 'Event',
    component: Event
  },
  {
    path: '/SearchResult',
    name: 'SearchResult',
    component: SearchResult,
    meta: {
      ifDoFresh:false
    }
  },
  {
    path: '/EventEvolutionaryGraph',
    name: '/EventEvolutionaryGraph',
    component: EventEvolutionaryGraph
  },
  {
    path: '/Organization',
    name: '/Organization',
    component: Organization
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
