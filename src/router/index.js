import { createRouter, createWebHistory } from "vue-router";
import TestPage from "../pages/TestPage.vue";
import HomePage from "../pages/HomePage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import NotFoundPage from "../pages/exceptions/NotFoundPage.vue";
import PredeparturePage from "../pages/PredeparturePage.vue";
import OnTheProjectPage from "../pages/OnProjectPage.vue";
import RolesPage from "../pages/OnProject/RolesPage.vue";
import { firebaseAuth } from '../../firebase/config';

function checkAuthAndProceed(to, from, next, redirectPath) {
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
        if (user) {
            unsubscribe();
            next();
        } else {
            unsubscribe();
            next(redirectPath);
        }
    });
}

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
            checkAuthAndProceed(to, from, next, '/login');
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
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture",
        name: 'PredeparturePage',
        component: PredeparturePage,
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/country",
        name: 'CountryPage',
        component: () => import('../pages/Predeparture/CountryPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/Eu",
        name: 'EuPage',
        component: () => import('../pages/Predeparture/EuPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/Eu/Part1",
        name: 'EuPage1',
        component: () => import('../pages/Predeparture/EuPage1.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/Eu/Part2",
        name: 'EuPage2',
        component: () => import('../pages/Predeparture/EuPage2.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/Eu/Part3",
        name: 'EuPage3',
        component: () => import('../pages/Predeparture/EuPage3.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },

    {
        path: "/predeparture/health",
        name: 'HealthPage',
        component: () => import('../pages/Predeparture/HealthPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/health/Part1",
        name: 'HealthPage1',
        component: () => import('../pages/Predeparture/HealthPage1.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },   
    {
        path: "/predeparture/health/Part2",
        name: 'HealthPage2',
        component: () => import('../pages/Predeparture/HealthPage2.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    }, 
    {
        path: "/predeparture/health/Part3",
        name: 'HealthPage3',
        component: () => import('../pages/Predeparture/HealthPage3.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login'); 
        }
    },
    {
        path: "/predeparture/health/Part4",
        name: 'HealthPage4',
        component: () => import('../pages/Predeparture/HealthPage4.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login'); 
        }
    },
    {
        path: "/predeparture/health/Part5",
        name: 'HealthPage5',
        component: () => import('../pages/Predeparture/HealthPage5.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login'); 
        }
    },
    {
        path: "/predeparture/health/Part6",
        name: 'HealthPage6',
        component: () => import('../pages/Predeparture/HealthPage6.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login'); 
        }
    },
    {
        path: "/project",
        name: 'ProjectPage',
        component: OnTheProjectPage,
        props:  true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }        
    },
    {
        path: "/project/roles",
        name: 'RolesPage',
        component: RolesPage,
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/project/activities",
        name: 'ActivitiesPage',
        component: () => import('../pages/OnProject/ActivitiesPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }  
    },
    {
        path: "/project/management",
        name: 'ManagementPage',
        component: () => import('../pages/OnProject/ManagementPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }

    },
    {
        path: "/project/followup",
        name: 'FollowUpPage',
        component: () => import('../pages/OnProject/FollowUpPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/project/followup/activities",
        name: 'FollowUpActivitiesPage',
        component: () => import('../pages/OnProject/FollowUpActivitiesPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/project/followup/support",
        name: 'FollowUpSupportPage',
        component: () => import('../pages/OnProject/FollowUpSupportPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }        
    },
    {
        path: "/project/followup/competences",
        name: 'FollowUpCompetencesPage',
        component: () => import('../pages/OnProject/FollowUpCompetencesPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
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
