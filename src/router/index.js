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
        path: '/',
        redirect: '/dashboard'
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
    { path: '*', redirect: '/page-404' },  
    {
        path: '/table',
        component: () => import("@/components/pages/Table"),
    },
    //user
    {
        path: '/management/users/list',
        component: () => import("@/components/users/Index"),
    },
    {
        path: '/management/users/create',
        component: () => import("@/components/users/Create"),
    },
    {
        path: '/management/users/detail',
        component: () => import("@/components/users/Show"),
    },
    {
        path: '/my-profile',
        component: () => import("@/components/pages/Profile"),
    },
    //lesson
    {
        path: '/management/lessons/list',
        component: () => import("@/components/lessons/Index"),
    },
    {
        path: '/management/lessons/create',
        component: () => import("@/components/lessons/Create"),
    },
    {
        path: '/management/lessons/edit/:id',
        component: () => import("@/components/lessons/Edit"),
    },
    {
        path: '/management/lessons/detail/:id',
        component: () => import("@/components/lessons/Show"),
    },
    //units
    {
        path: '/management/units/create',
        component: () => import("@/components/units/Create"),
    },
    {
        path: '/management/units/edit/:id',
        component: () => import("@/components/units/Edit"),
    },
    {
        path: '/management/units/detail/:id',
        component: () => import("@/components/units/Show"),
    },
    {
        path: '/management/units/list',
        component: () => import("@/components/units/List"),
    },
    //questions
    {
        path: '/management/questions/list',
        component: () => import("@/components/questions/Index"),
    },
    //examinations
    {
        path: '/management/examinations/list',
        component: () => import("@/components/examinations/Index"),
    },
    {
        path: '/management/examinations/detail/:code',
        component: () => import("@/components/examinations/Show"),
    },
    {
        path: '/management/examinations/create',
        component: () => import("@/components/examinations/Create"),
    },
    {
        path: '/management/examinations/edit/:code',
        component: () => import("@/components/examinations/Edit"),
    },
    {
        path: '/management/examinations/part/:code/:part',
        component: () => import("@/components/examinations/elements/Part1"),
    },
    //learning_words
    {
        path: '/management/learning_words/list',
        component: () => import("@/components/learning_words/Index"),
    },
    {
        path: '/management/learning_words/create',
        component: () => import("@/components/learning_words/Create"),
    },
    {
        path: '/management/learning_words/detail',
        component: () => import("@/components/learning_words/Show"),
    },
    {
        path: '/management/learning_words/edit',
        component: () => import("@/components/learning_words/Edit"),
    },
    {
        path: '/management/learning_words/subjects/list',
        component: () => import("@/components/subjects/List.vue"),
    },
    {
        path: '/management/learning_words/subjects/create',
        component: () => import("@/components/subjects/Create"),
    },
    {
        path: '/management/learning_words/subjects/edit',
        component: () => import("@/components/subjects/Edit"),
    },
    {
        path: '/management/learning_words/subjects/detail',
        component: () => import("@/components/subjects/Edit"),
    }
]

export default new VueRouter({
    routes: routes,
    mode: 'history'
})