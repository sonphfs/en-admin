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
        path: '/management/users/detail/:id',
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
        path: '/management/lessons/questions',
        component: () => import("@/components/lessons/Question"),
    },
    //units
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
        path: '/management/examinations/score-table',
        component: () => import("@/components/examinations/ScoreConvert"),
    },
    {
        path: '/management/examinations/edit/:code',
        component: () => import("@/components/examinations/Edit"),
    },
    {
        path: '/management/examinations/part/:code/1',
        component: () => import("@/components/examinations/elements/Part1"),
    },
    {
        path: '/management/examinations/part/:code/2',
        component: () => import("@/components/examinations/elements/Part2"),
    },
    {
        path: '/management/examinations/part/:code/3',
        component: () => import("@/components/examinations/elements/Part3"),
    },
    {
        path: '/management/examinations/part/:code/4',
        component: () => import("@/components/examinations/elements/Part4"),
    },
    {
        path: '/management/examinations/part/:code/5',
        component: () => import("@/components/examinations/elements/Part5"),
    },
    {
        path: '/management/examinations/part/:code/6',
        component: () => import("@/components/examinations/elements/Part6"),
    },
    {
        path: '/management/examinations/part/:code/7',
        component: () => import("@/components/examinations/elements/Part7"),
    },
    {
        path: '/management/examinations/part/edit',
        component: () => import("@/components/examinations/PartEdit"),
    },
    {
        path: '/management/examinations/new',
        component: () => import("@/components/elements/NewParagraph"),
    },
    //learning_words
    {
        path: '/management/learning_words/list',
        component: () => import("@/components/learning_words/Index"),
    },
    {
        path: '/management/learning_words/subjects/list',
        component: () => import("@/components/subjects/List.vue"),
    },
    {
        path: '/management/learning_words/questions',
        component: () => import("@/components/learning_words/Question.vue"),
    },
    {
        path: '/upload',
        component: () => import("@/components/pages/Upload.vue"),
    },
]

export default new VueRouter({
    routes: routes,
    mode: 'history'
})