import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: () => import("@/components/pages/Login"),
        meta: {
            layout: 'BlankLayout'
        }
    },
    {
        path: '/Dashboard',
        component: () => import("@/components/pages/Dashboard"),
    },
    {
        path: '/page-403',
        component: () => import("@/components/error_pages/Page403"),
        meta: {
            layout: 'BlankLayout'
        }
    },
    {
        path: '/page-404',
        component: () => import("@/components/error_pages/Page404"),
        meta: {
            layout: 'BlankLayout'
        }
    },
    {
        path: '/page-500',
        component: () => import("@/components/error_pages/Page500"),
        meta: {
            layout: 'BlankLayout'
        }
    },
    {
        path: '/table',
        component: () => import("@/components/pages/Table"),
    },
    {
        path: '/management/users/list',
        component: () => import("@/components/users/Index"),
    },
    {
        path: '/management/lessons/list',
        component: () => import("@/components/lessons/Index"),
    },
    {
        path: '/management/questions/list',
        component: () => import("@/components/questions/Index"),
    },
    {
        path: '/management/examinations/list',
        component: () => import("@/components/examinations/Index"),
    },
    {
        path: '/management/learning_words/list',
        component: () => import("@/components/learning_words/Index"),
    },
    {
        path: '/my-profile',
        component: () => import("@/components/pages/Profile"),
    }
]

export default new VueRouter({
    routes: routes,
    mode: 'history'
})