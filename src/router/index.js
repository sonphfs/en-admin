import Vue from 'vue';
import VueRouter from 'vue-router'
import { isAuthorized } from '@/permission'
Vue.use(VueRouter)

const ifAuthenticated = async (to, from, next) => {
    let check = await isAuthorized()
    if (check) {
      next()
      return
    }
    next('/login')
}

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
        beforeEnter: ifAuthenticated,
        redirect: '/dashboard'
    },
    {
        path: '/Dashboard',
        component: () => import("@/components/pages/Dashboard"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/page-403',
        component: () => import("@/components/error_pages/Page403"),
        meta: {
            layout: 'BlankLayout'
        },
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/page-404',
        component: () => import("@/components/error_pages/Page404"),
        meta: {
            layout: 'BlankLayout'
        },
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/page-500',
        component: () => import("@/components/error_pages/Page500"),
        meta: {
            layout: 'BlankLayout'
        },
        beforeEnter: ifAuthenticated,
    },
    { path: '*', redirect: '/page-404' },  
    {
        path: '/table',
        component: () => import("@/components/pages/Table"),
        beforeEnter: ifAuthenticated,
    },
    //user
    {
        path: '/management/users/list',
        component: () => import("@/components/users/Index"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/users/login-histories',
        component: () => import("@/components/users/LoginHistories"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/users/create',
        component: () => import("@/components/users/Create"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/users/detail/:id',
        component: () => import("@/components/users/Show"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/my-profile',
        component: () => import("@/components/pages/Profile"),
        beforeEnter: ifAuthenticated,
    },
    //contact
    {
        path: '/management/contacts/list',
        component: () => import("@/components/contacts/Index"),
        beforeEnter: ifAuthenticated,
    },
    
    //lesson
    {
        path: '/management/lessons/list',
        component: () => import("@/components/lessons/Index"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/lessons/questions',
        component: () => import("@/components/lessons/Question"),
        beforeEnter: ifAuthenticated,
    },
    //units
    {
        path: '/management/units/edit/:id',
        component: () => import("@/components/units/Edit"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/units/detail/:id',
        component: () => import("@/components/units/Show"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/units/list',
        component: () => import("@/components/units/List"),
        beforeEnter: ifAuthenticated,
    },
    //questions
    {
        path: '/management/questions/list',
        component: () => import("@/components/questions/Index"),
        beforeEnter: ifAuthenticated,
    },
    //examinations
    {
        path: '/management/examinations/list',
        component: () => import("@/components/examinations/Index"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/examinations/detail/:code',
        component: () => import("@/components/examinations/Show"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/examinations/create',
        component: () => import("@/components/examinations/Create"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/examinations/score-table',
        component: () => import("@/components/examinations/ScoreConvert"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/examinations/edit/:code',
        component: () => import("@/components/examinations/Edit"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/examinations/part/:code/1',
        component: () => import("@/components/examinations/elements/Part1"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/examinations/part/:code/2',
        component: () => import("@/components/examinations/elements/Part2"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/examinations/part/:code/3',
        component: () => import("@/components/examinations/elements/Part3"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/examinations/part/:code/4',
        component: () => import("@/components/examinations/elements/Part4"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/examinations/part/:code/5',
        component: () => import("@/components/examinations/elements/Part5"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/examinations/part/:code/6',
        component: () => import("@/components/examinations/elements/Part6"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/examinations/part/:code/7',
        component: () => import("@/components/examinations/elements/Part7"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/examinations/part/edit',
        component: () => import("@/components/examinations/PartEdit"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/examinations/new',
        component: () => import("@/components/elements/NewParagraph"),
        beforeEnter: ifAuthenticated,
    },
    //learning_words
    {
        path: '/management/learning_words/list',
        component: () => import("@/components/learning_words/Index"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/learning_words/subjects/list',
        component: () => import("@/components/subjects/List.vue"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/management/learning_words/questions',
        component: () => import("@/components/learning_words/Question.vue"),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/upload',
        component: () => import("@/components/pages/Upload.vue"),
        beforeEnter: ifAuthenticated,
    },
]

export default new VueRouter({
    routes: routes,
    mode: 'history'
})