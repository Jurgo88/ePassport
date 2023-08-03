import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store';
// Vuetify
//import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App)
const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light',
        dark: true,
        themes: {
            light: {
                colors: {

                    primary: '#0C2F6B',
                    secondary: '#2148C0',
                    accent: '#82B1FF',
                    error: '#FF5252',
                    background: '#F0F0F0',
                },
                icons: {
                    iconfont: 'mdi', // default - only for display purposes
                },
            },
        },
        // themes: {
        //     light: {
        //         primary: '#1976D2',
        //         secondary: '#424242',
        //         accent: '#82B1FF',
        //         error: '#FF5252',
        //         info: '#2196F3',
        //         success: '#4CAF50',
        //         warning: '#FFC107',
        //         // background: '#E5E5E5',
        //         // background: '#F5F5F5',
        //         // background: '#FAFAFA',
        //         // background: '#FFFFFF',
        //         background: '#F0F0F0',
        //     },
        //     dark: {
        //         primary: '#2196F3',
        //         secondary: '#424242',
        //         accent: '#FF4081',
        //         error: '#FF5252',
        //         info: '#2196F3',
        //         success: '#4CAF50',
        //         warning: '#FFC107',
        //         // background: '#303030',
        //         background: '#212121',
        //     },
    },
    // icons: {
    //     defaultSet: 'mdi',
    //     aliases,
    //     sets: {
    //       mdi,
    //     },
    //   },
    components,
    directives,
  })

app.use(store).use(router).use(PrimeVue)
app.use(vuetify)
app.mount('#app')
