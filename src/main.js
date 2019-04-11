// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRx from 'vue-rx'

import { $authState, $user } from '@/firebase/init'
import './registerServiceWorker'

import './styles/quasar.styl'
import 'quasar/dist/quasar.ie.polyfills'
import iconSet from 'quasar/icon-set/fontawesome-v5'
import lang from 'quasar/lang/en-gb'
import 'vue2-animate/dist/vue2-animate.min.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import '@quasar/extras/eva-icons/eva-icons.css'
import '@/lib/animate.css'
import Quasar from 'quasar'
import { connect } from 'redux-vuex'
import router from './router'
import App from './App.vue'
import { store } from '@/state'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

connect({ Vue, store })

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

// wait for firebase auth to init before creating the app

function init() {
  console.debug('initialising bumpmap')
  $authState.subscribe(user => {
    if (user) {
      const { uid, email } = user
      store.dispatch.user.set({
        exists: true,
        id: uid,
        email,
      })
    } else {
      store.dispatch.user.reset()
    }
  })

  $user.subscribe(user => {
    //console.info('$user change:', user)
    if (user) {
      store.dispatch.user.setExists(true)
    } else {
      store.dispatch.user.reset()
    }
  })

  $authState.subscribe(() => {
    /* eslint-disable no-new */
    if (!app) {
      console.debug('authState updated. rendering bumpmap')
      app = new Vue({
        router,
        render: h => h(App),
      }).$mount('#app')
      // if (window || global.window) {
      //   document.addEventListener(
      //     'touchmove',
      //     function(event) {
      //       event = event.originalEvent || event
      //       if (event.scale !== 1) {
      //         event.preventDefault()
      //       }
      //     },
      //     { passive: false, capture: true },
      //   )
      // }
    }
  })
}

init()
