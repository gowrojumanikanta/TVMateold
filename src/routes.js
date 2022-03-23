import Vue from 'vue'
import VueRouter from 'vue-router'
import ShowsDashboard from './components/ShowsDashboard.vue'
import ShowDetails from "./components/ShowDetails.vue"
Vue.use(VueRouter)

const routes = [
    {
        path : "/",
        name : "ShowsDashboard",
        component: ShowsDashboard
    },
    {
        path : "/showdetails/:id",
        name : "ShowDetails",
        component: ShowDetails
    },
    {
        path :"*",
        name : "ShowsDashboard",
        component: ShowsDashboard
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
export default router;
