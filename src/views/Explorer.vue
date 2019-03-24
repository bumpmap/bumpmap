<template>
  <q-page>
    <div class="bumpmap-explorer">
      <div id="ui">
        <transition
          name="bounce"
          enter-active-class="bounceInDown"
          leave-active-class="bounceOutUp"
        >
          <Welcome v-show="explorer.welcome"/>
        </transition>
        <transition
          name="bounce"
          enter-active-class="bounceInDown"
          leave-active-class="bounceOutUp"
        >
          <Searchbox/>
        </transition>
      </div>
      <div id="map">
        <Map/>
      </div>
    </div>
  </q-page>
</template>

<script>
import Map from '@/components/home/Map.vue'
import Welcome from '@/components/Welcome.vue'
import Searchbox from '@/components/home/Searchbox.vue'
import { dispatch } from '@/state'

export default {
  name: 'Explorer',
  components: {
    Map,
    Welcome,
    Searchbox,
  },
  data() {
    return {
      foo: 'bar',
      ...this.mapState({
        explorer: 'explorer',
      }),
    }
  },
  mounted() {},
  destroyed() {
    dispatch.explorer.resetWelcome()
  },
}
</script>

<style lang="scss">
.bumpmap-explorer {
  & > #ui {
    top: 0;
    left: 0;
    padding: 0;
    margin: 0;
    position: absolute;
    overflow: auto;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: none;
    * {
      pointer-events: auto;
    }
  }
  & > #map {
    overflow: auto;
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;
    padding: 0px;
    width: 100%;
    margin: 0;
    height: 100%;
    z-index: 1;
  }
}
</style>
