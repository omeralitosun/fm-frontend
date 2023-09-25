import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import CreateFieldView from '../views/field/CreateFieldView.vue'
import FieldDetailView from '../views/field/FieldDetailView.vue'
import FieldListView from '../views/field/FieldListView.vue'
import UpdateFieldView from '../views/field/UpdateFieldView.vue'

import CreateEquipmentView from '../views/equipment/CreateEquipmentView.vue'
import UpdateEquipmentView from '../views/equipment/UpdateEquipmentView.vue'
import EquipmentDetailView from '../views/equipment/EquipmentDetailView.vue'
import EquipmentListView from '../views/equipment/EquipmentListView.vue'

import CreateActionTakenView from '../views/actionTaken/CreateActionTakenView.vue'
import ActionTakenDetailView from '../views/actionTaken/ActionTakenDetailView.vue'
import ActionTakenListView from '../views/actionTaken/ActionTakenListView.vue'
import UpdateActionTakenView from '../views/actionTaken/UpdateActionTakenView.vue'

import CreateHarvestView from '../views/harvest/CreateHarvestView.vue'
import HarvestDetailView from '../views/harvest/HarvestDetailView.vue'
import HarvestListView from '../views/harvest/HarvestListView.vue'
import UpdateHarvestView from '../views/harvest/UpdateHarvestView.vue'

import CreateMaintenanceView from '../views/maintenance/CreateMaintenanceView.vue'
import MaintenanceDetailView from '../views/maintenance/MaintenanceDetailView.vue'
import MaintenanceListView from '../views/maintenance/MaintenanceListView.vue'
import UpdateMaintenanceView from '../views/maintenance/UpdateMaintenanceView.vue'

import CreateReceivedProductView from '../views/receivedProduct/CreateReceivedProductView.vue'
import ReceivedProductDetailView from '../views/receivedProduct/ReceivedProductDetailView.vue'
import ReceivedProductListView from '../views/receivedProduct/ReceivedProductListView.vue'
import UpdateReceivedProductView from '../views/receivedProduct/UpdateReceivedProductView.vue'

import CreateSelledProductView from '../views/selledProduct/CreateSelledProductView.vue'
import SelledProductDetailView from '../views/selledProduct/SelledProductDetailView.vue'
import SelledProductListView from '../views/selledProduct/SelledProductListView.vue'
import UpdateSelledProductView from '../views/selledProduct/UpdateSelledProductView.vue'

const routes = [
  //Home
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // Field
  {
    path: '/field/new',
    name: 'createField',
    component: CreateFieldView,
  },
  {
    path: '/field/update/:id',
    name: 'updateField',
    component: UpdateFieldView,
    props: true
  },
  {
    path: '/field/detail/:id',
    name: 'fieldDetail',
    component: FieldDetailView,
    props: true
  }, {
    path: '/field',
    name: 'fieldList',
    component: FieldListView
  },
  //Equipment
  {
    path: '/equipment/new',
    name: 'createEquipment',
    component: CreateEquipmentView
  },
  {
    path: '/equipment/update/:id',
    name: 'updateEquipment',
    component: UpdateEquipmentView,
    props: true
  }, {
    path: '/equipment/detail/:id',
    name: 'equipmentDetail',
    component: EquipmentDetailView,
    props: true
  }, {
    path: '/equipment',
    name: 'equipmentList',
    component: EquipmentListView
  },
  // Action Taken
  {
    path: '/action-taken/new',
    name: 'createActionTaken',
    component: CreateActionTakenView
  },
  {
    path: '/action-taken/update/:id',
    name: 'updateActionTaken',
    component: UpdateActionTakenView,
    props: true
  }, {
    path: '/action-taken/detail/:id',
    name: 'actionTakenDetail',
    component: ActionTakenDetailView,
    props: true
  }, {
    path: '/action-taken',
    name: 'actionTakenList',
    component: ActionTakenListView
  },
  // Harvest
  {
    path: '/harvest/new',
    name: 'createHarvest',
    component: CreateHarvestView
  },
  {
    path: '/harvest/update/:id',
    name: 'updateHarvest',
    component: UpdateHarvestView,
    props: true
  },
  {
    path: '/harvest/detail/:id',
    name: 'harvestDetail',
    component: HarvestDetailView,
    props: true
  }, {
    path: '/harvest',
    name: 'harvestList',
    component: HarvestListView
  },
  // Maintenance
  {
    path: '/maintenance/new',
    name: 'createMaintenance',
    component: CreateMaintenanceView
  },
  {
    path: '/maintenance/update/:id',
    name: 'updateMaintenance',
    component: UpdateMaintenanceView,
    props: true
  }, {
    path: '/maintenance/detail/:id',
    name: 'maintenanceDetail',
    component: MaintenanceDetailView,
    props: true
  }, {
    path: '/maintenance',
    name: 'maintenanceList',
    component: MaintenanceListView
  },
  // Received Product
  {
    path: '/received-product/new',
    name: 'createReceivedProduct',
    component: CreateReceivedProductView
  },
  {
    path: '/received-product/update/:id',
    name: 'updateReceivedProduct',
    component: UpdateReceivedProductView,
    props: true
  }, {
    path: '/received-product/detail/:id',
    name: 'receivedProductDetail',
    component: ReceivedProductDetailView,
    props: true
  }, {
    path: '/received-product',
    name: 'receivedProductList',
    component: ReceivedProductListView
  },
  // Selled Product
  {
    path: '/selled-product/new',
    name: 'createSelledProduct',
    component: CreateSelledProductView
  },
  {
    path: '/selled-product/update/:id',
    name: 'updateSelledProduct',
    component: UpdateSelledProductView,
    props: true
  }, {
    path: '/selled-product/detail/:id',
    name: 'selledProductDetail',
    component: SelledProductDetailView,
    props: true
  }, {
    path: '/selled-product',
    name: 'selledProductList',
    component: SelledProductListView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
