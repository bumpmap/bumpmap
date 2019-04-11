<template>
  <q-page>
    <div class="bumpmap-explorer">
      <div id="ui">
        <div class="q-pa-md">
          <q-page-sticky position="top-right" :offset="[18, 18]">
            <transition
              name="bounce"
              enter-active-class="bounceInDown"
              leave-active-class="bounceOutUp"
            >
              <Welcome v-show="explorer.welcome && !pins.addMode"/>
            </transition>
          </q-page-sticky>
          <q-page-sticky position="bottom-right" :offset="[36, 36]">
            <q-btn
              rounded
              v-show="pins.addMode"
              outline
              size="xl"
              text-color="positive"
              icon="check_circle"
              label="Confirm"
              @click="clickAddPin"
              class="q-pa-md q-px-lg gt-sm q-mx-xs"
            />

            <transition
              name="bounce"
              enter-active-class="bounceInDown"
              leave-active-class="bounceOutUp"
            >
              <q-btn
                rounded
                :push="!pins.addMode"
                :outline="pins.addMode"
                size="xl"
                :color="addPinColor"
                :text-color="addPinTextColor"
                :icon="addPinIcon.desktop"
                :label="addPinLabel"
                @click="clickAddPin"
                class="q-pa-md q-px-lg gt-sm q-mx-xs"
              />
            </transition>
          </q-page-sticky>

          <q-page-sticky class="mobile-only lt-md" position="bottom" :offset="[0,0]">
            <transition
              name="bounce"
              enter-active-class="bounceInDown"
              leave-active-class="bounceOutUp"
            >
              <q-btn
                v-show="!explorer.welcome"
                @click="clickAddPin"
                push
                round
                size="lg"
                color="white"
                text-color="black"
                :icon="addPinIcon.mobile"
                class="q-pa-xs q-px-xs"
              />
            </transition>
          </q-page-sticky>

          <transition
            name="bounce"
            enter-active-class="bounceInDown"
            leave-active-class="bounceOutUp"
          >
            <Searchbox/>
          </transition>
        </div>
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
        pins: 'pins',
      }),
    }
  },
  mounted() {
    dispatch.pins.resetAddMode()
  },
  destroyed() {
    dispatch.pins.resetAddMode()
    dispatch.explorer.resetWelcome()
  },
  computed: {
    addPinLabel() {
      return this.pins.addMode ? 'CANCEL' : 'NEW PIN'
    },
    addPinIcon() {
      return {
        desktop: this.pins.addMode ? 'clear' : 'add_location',
        mobile: this.pins.addMode ? 'clear' : 'fas fa-plus',
      }
    },
    addPinTextColor() {
      return this.pins.addMode ? 'negative' : 'black'
    },
    addPinColor() {
      return this.pins.addMode ? 'black' : 'white'
    },
  },
  methods: {
    clickAddPin(...args) {
      console.debug('clickAddPin', args)
      if (!this.pins.addMode) {
        dispatch.pins.startAddMode({ center: this.pins.center })
      } else {
        dispatch.pins.stopAddMode()
      }
    },
  },
}
</script>

<style lang="scss">
.bumpmap-explorer {
  & > #ui {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    z-index: 10;
    pointer-events: none;
    * {
      pointer-events: auto;
    }
  }
  & > #map {
    overflow: auto;
    top: 0px;
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
