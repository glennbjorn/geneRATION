import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import CreateNew from '../views/CreateNew.vue'
import MyCampaigns from '../views/MyCampaigns.vue'
import Form from '../views/Form.vue'
import Campaign from '../views/Campaign.vue'
import ThankYou from '../views/ThankYou.vue'
import CampaignAdmin from '../views/CampaignAdmin.vue'
import Edit from '../views/Edit.vue'
import DonorsInfo from '../views/DonorsInfo.vue'
import ManageAdmins from '../views/ManageAdmins'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/create',
        name: 'CreateNew',
        component: CreateNew
    },
    {
        path: '/mycampaigns',
        name: 'MyCampaigns',
        component: MyCampaigns
    },
    {
        path: '/:_id',
        name: 'Campaign',
        component: Campaign
    },
    {
        path: '/:_id/donate',
        name: 'Form',
        component: Form
    },
    {
        path: '/ThankYou',
        name: 'ThankYou',
        component: ThankYou
    },
    {
        path: '/mycampaigns/:_id',
        name: 'CampaignAdmin',
        component: CampaignAdmin
    },
    {
        path: '/mycampaigns/:_id/edit',
        name: 'Edit',
        component: Edit
    },
    {
        path: '/mycampaigns/:_id/donorsInfo',
        name: 'DonorsInfo',
        component: DonorsInfo
    },
    {
        path: '/mycampaigns/:_id/admins',
        name: 'ManageAdmins',
        component: ManageAdmins
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router