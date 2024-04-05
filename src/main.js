import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/style.css';

import vue3GoogleLogin from 'vue3-google-login';
const CLIENT_ID = "402252794021-lou3mjb7gft8fgq6ubtcu9oqhpsqcap5.apps.googleusercontent.com";

createApp(App)
  .use(router) 
  .use(vue3GoogleLogin, {
    clientId: CLIENT_ID,
  })
  .mount('#app');