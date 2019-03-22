<template>
  <div id="app">
    <div class="app-navbar">
      <Navbar :currentRoute="currentRoute"/>
    </div>
    <div class="app-bg">
      <div class="app-view">
        <transition name="fade">
          <router-view/>
        </transition>
      </div>
      <div class="app-view-bg"/>
    </div>
  </div>
</template>

<script>
import { dispatch } from '@/state'
import Navbar from '@/components/layout/Navbar'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data() {
    return {
      currentRoute: { name: '' },
    }
  },
  watch: {
    $route(to, from) {
      this.currentRoute = to
      dispatch.route.update(to)
    },
  },
  mounted() {
    dispatch.route.update(this.$route)
    this.currentRoute = this.$route
  },
}
</script>

<style lang="scss">
#app {
  .app-navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: none;
    * {
      pointer-events: auto;
    }
  }
  .app-view-bg {
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.88);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .app-view {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    z-index: 1;
    pointer-events: auto;
  }

  .fade-enter-active {
    transition: opacity 0.6s ease-in-out;
  }
  .fade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

  .vue-map img[src="https://maps.gstatic.com/mapfiles/api-3/images/google_white5.png"] {
    pointer-events: none;
    opacity: 0;
  }

  /*style the box which holds the text of the information window*/
  .gm-style-cc {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    filter: invert(1);
  }
}
</style>
