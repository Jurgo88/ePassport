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
    // {
    //     path: "/predeparture",
    //     name: 'PredeparturePage',
    //     component: PredeparturePage,
    //     props: true,
    //     beforeEnter: (to, from, next) => {
    //         checkAuthAndProceed(to, from, next, '/login');
    //     }
    // },
    {
        path:"/predeparture",
        name: 'PredeparturePage',
        component: () => import('../pages/BeforeProjectPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
                checkAuthAndProceed(to, from, next, '/login');
            }
    },
    {
        path: "/predeparture/letter",
        name: 'LetterToMyselfPage',
        component: () => import('../pages/Predeparture/LetterToMyselfPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/CV",
        name: 'EuropassCVPage',
        component: () => import('../pages/Predeparture/EuropassCVPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/EnglishTest",
        name: 'EnglishTestPage',
        component: () => import('../pages/Predeparture/EnglishTestPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/EnglishTest/test",
        name: 'EnglishTestStartTestPage',
        component: () => import('../pages/Predeparture/EnglishTestStartTestPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/EnglishTest/listening",
        name: 'EnglishTestListeningPage',
        component: () => import('../pages/Predeparture/EnglishTestListeningPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
           checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/EnglishTest/writting",
        name: 'EnglishTestWrittingPage',
        component: () => import('../pages/Predeparture/EnglishTestWrittingPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
              checkAuthAndProceed(to, from, next, '/login');
          }
    },
    {
        path: "/predeparture/EnglishTest/learning",
        name: 'EnglishTestLearningPage',
        component: () => import('../pages/Predeparture/EnglishTestLearningPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
                checkAuthAndProceed(to, from, next, '/login');
            }
    },
    {
        path: "/predeparture/project",
        name: 'ProjectPage',
        component: () => import('../pages/Predeparture/ProjectPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/project/advantages",
        name: 'ProjectAdvantagesPage',
        component: () => import('../pages/Predeparture/ProjectAdvantagesPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
                checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/project/expectations",
        name: 'ProjectExpectationsPage',
        component: () => import('../pages/Predeparture/ProjectExpectationsPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
           checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/project/howIsee",
        name: 'ProjectHowIseePage',
        component: () => import('../pages/Predeparture/ProjectHowIseePage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/project/competences",
        name: 'ProjectCompetencesPage',
        component: () => import('../pages/Predeparture/ProjectCompetencesPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path: "/predeparture/project/howBenefit",
        name: 'ProjectHowBenefitPage',
        component: () => import('../pages/Predeparture/ProjectHowBenefitPage.vue'), // Lazy loading
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
        name: 'OnProjectPage',
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
        path: "/evaluation",
        name: 'AfterProjectPage',
        component: () => import('../pages/AfterProjectPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
              checkAuthAndProceed(to, from, next, '/login');
          }
    },
    {
        path: "/evaluation/support",
        name: 'SupportPage',
        component: () => import('../pages/AfterProject/SupportPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }
    },
    {
        path:"/evaluation/tasks",
        name: 'TasksPage',
        component: () => import('../pages/AfterProject/TasksPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }   
    },
    {
        path: "/evaluation/competences",
        name: 'CompetencesPage',
        component: () => import('../pages/AfterProject/CompetencesPage.vue'), // Lazy loading
        props: true,
        beforeEnter: (to, from, next) => {
            checkAuthAndProceed(to, from, next, '/login');
        }   
    },
    {
        path: "/evaluation/general",
        name: 'GeneralPage',
        component: () => import('../pages/AfterProject/GeneralPage.vue'), // Lazy loading
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
