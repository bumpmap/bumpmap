// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRx from 'vue-rx'
import * as VueGoogleMaps from 'vue2-google-maps'
import { $authState, $user } from '@/firebase/init'
import './registerServiceWorker'

import './styles/quasar.styl'
import 'quasar/dist/quasar.ie.polyfills'
import iconSet from 'quasar/icon-set/fontawesome-v5'
import lang from 'quasar/lang/en-gb'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import '@quasar/extras/eva-icons/eva-icons.css'
import Quasar from 'quasar'
import router from './router'
import App from './App.vue'

Vue.use(Quasar, {
  config: {
    loadingBar: {
      position: 'top',
      color: 'green',
      skipHijack: true,
    },
  },
  lang,
  iconSet,
})

let app = null

Vue.config.productionTip = true

Vue.use(VueRx)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDkee2d7wb8w4pg4aFzcXvQgYM6yLe6i70',
    libraries: 'places',
  },
})

// wait for firebase auth to init before creating the app

function init() {
  console.debug('initialising bumpmap')
  $authState.subscribe(user => {
    console.info('$authState change:', user)
  })

  $user.subscribe(user => {
    console.info('$user change:', user)
  })

  $authState.subscribe(() => {
    /* eslint-disable no-new */
    if (!app) {
      console.debug('authState updated. rendering bumpmap')
      app = new Vue({
        router,
        render: h => h(App),
      }).$mount('#app')
    }
  })
}

init()
