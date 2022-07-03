import { createRouter, createWebHistory } from "vue-router";
/* import LoginPage from './views/LoginPage' */
import Home from './views/HomePage'
/* import Employee from './views/Employees/employeesList'
import Job_id from './views/Employees/setupList' */

const isUserLoggedIn = () => {
    return !!localStorage.getItem('token')
}


const routes = [
    {
        path: '/jobs',
        name: 'job',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("./views/LoginPage"),
        meta: {
            hideNavbar: true,
        }
    },
    {
        path: '/employee',
        name: 'employee',
        component: () => import("./views/Employees/employeesList"),
    },
    {
        path: '/jobs/:jobId',
        name: 'job_id',
        component: () => import("./views/Employees/setupList"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !isUserLoggedIn()) next({ name: 'login' })
    else next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = 'none'
    }
})

export default router