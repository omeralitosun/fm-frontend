import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateFieldView from '../views/field/CreateFieldView.vue'
import FieldDetailView from '../views/field/FieldDetailView.vue'
import FieldListView from '../views/field/FieldListView.vue'
import CreateEquipmentView from '../views/equipment/CreateEquipmentView.vue'
import EquipmentDetailView from '../views/equipment/EquipmentDetailView.vue'
import EquipmentListView from '../views/equipment/EquipmentListView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/field/new',
    name: 'createField',
    component: CreateFieldView
  },
  {
    path: '/field/detail/:id',
    name: 'fieldDetail',
    component: FieldDetailView,
    props:true
  },{
    path: '/field',
    name: 'fieldList',
    component: FieldListView
  },
  {
    path: '/equipment/new',
    name: 'createEquipment',
    component: CreateEquipmentView
  },{
    path: '/equipment/detail/:id',
    name: 'equipmentDetail',
    component: EquipmentDetailView,
    props:true
  },{
    path: '/equipment',
    name: 'equipmentList',
    component: EquipmentListView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
