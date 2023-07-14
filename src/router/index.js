import { createRouter, createWebHistory } from "vue-router";
import TestPage from "../pages/TestPage.vue";
import HomePage from "../pages/HomePage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import NotFoundPage from "../pages/exceptions/NotFoundPage.vue";
import PredeparturePage from "../pages/PredeparturePage.vue";
import { firebaseAuth } from '../../firebase/config';

const routes = [
    {
        path: "/testpage",
        name: 'TestPage',
        component: TestPage
    },
    {
        path: "/home",
        name: 'HomePage',
        component: HomePage,
        beforeEnter: (to, from, next) => {
            const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
                if (user) {
                    unsubscribe();
                    next();
                } else {
                    unsubscribe();
                    next('/login');
                }
            });
        }
    },
    {
        path: "/profile",
        name: 'ProfilePage',
        component: ProfilePage,
        beforeEnter: (to, from, next) => {
            const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
                if (user) {
                    unsubscribe();
                    next();
                } else {
                    unsubscribe();
                    next('/home');
                }
            });
        }
    },
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/login",
        name: 'LoginPage',
        component: LoginPage,
        beforeEnter: (to, from, next) => {
            const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
                console.log("login");
                if (user) {
                    unsubscribe();
                    next('/home');
                } else {
                    unsubscribe();
                    next();
                }
            });
        }
    },
    {
        path: "/register",
        name: 'RegisterPage',
        component: RegisterPage,
        beforeEnter: (to, from, next) => {
            const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
                if (user) {
                    unsubscribe();
                    next();
                } else {
                    unsubscribe();
                    next('/login');
                }
            });
        }
    },
    {
        path: "/predeparture",
        name: 'PredeparturePage',
        component: PredeparturePage,
        props: { VolunteerData: true},
        beforeEnter: (to, from, next) => {
            const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
                if (user) {
                    unsubscribe();
                    next();
                } else {
                    unsubscribe();
                    next('/login');
                }
            });
        }
    },
    {
        path: "/:catchAll(.*)",
        component: NotFoundPage
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});



export default router;
