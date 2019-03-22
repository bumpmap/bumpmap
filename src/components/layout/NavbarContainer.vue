<template>
  <Provider :store="store" :mapDispatch="mapDispatch" :mapState="mapState">
    <template slot-scope="{ route, layout, explorer, user }">
      <Navbar
        :route="route"
        :explorer="explorer"
        :user="user"
        :layout="layout"
        :increment="increment"
      />
    </template>
  </Provider>
</template>

<script>
import Provider from 'vuejs-redux'
import { store } from '@/state'
import Navbar from './Navbar.vue'

// It's recommended to declare mapState and mapDispatch outside the component (as pure function)
// for easier tests.
const mapState = state => ({
  route: state.route,
  explorer: state.explorer,
  user: state.user,
})

const mapDispatch = dispatch => ({
  increment: () => dispatch.route.increment(),
})

export default {
  data: () => ({
    store, // make it accessible in the template
  }),

  methods: {
    mapDispatch,
    mapState,
  },
}
</script>
