import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store';
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'vuetify/dist/vuetify.min.css';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
  })

app.use(store).use(router).use(PrimeVue)
app.use(vuetify)
app.mount('#app')
