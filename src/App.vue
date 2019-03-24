<template>
  <div id="app">
    <q-layout view="hHh lpR fFf">
      <Navbar/>

      <q-drawer :value="layout.menus.left" @input="updateLeft" side="left" bordered>
        <!-- drawer content -->
      </q-drawer>

      <q-drawer
        v-if="user.exists"
        :value="layout.menus.right"
        @input="updateRight"
        side="right"
        behavior="mobile"
        elevated
      >
        <q-scroll-area
          style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
        >
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox"/>
              </q-item-section>

              <q-item-section>Inbox</q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star"/>
              </q-item-section>

              <q-item-section>Star</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send"/>
              </q-item-section>

              <q-item-section>Send</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts"/>
              </q-item-section>

              <q-item-section>Drafts</q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar-framework.org/img/material.png"
          style="height: 150px"
          v-if="user.exists"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar-framework.org/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">{{user.email}}</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <transition name="quickfade">
          <router-view/>
        </transition>
      </q-page-container>
    </q-layout>
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
    return { ...this.mapState('layout', 'user') }
  },
  watch: {
    $route(to) {
      dispatch.route.update(to)
    },
  },
  methods: {
    updateRight(value) {
      if (value && !this.layout.menus.right) {
        dispatch.layout.openMenu('right')
      } else if (!value) {
        dispatch.layout.closeMenu('right')
      }
    },
    updateLeft(value) {
      if (value && !this.layout.menus.left) {
        dispatch.layout.openMenu('left')
      } else if (!value) {
        dispatch.layout.closeMenu('left')
      }
    },
  },
  mounted() {
    dispatch.route.update(this.$route)
  },
}
</script>

<style lang="scss">
#app {
  background-color: rgba(20, 20, 20, 0.95);

  .quickfade-enter-active {
    transition: opacity 0.6s ease-in-out;
  }
  .quickfade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }

  .quickfade-enter,
  .quickfade-leave-to {
    opacity: 0;
  }

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

  /*style the box which holds the text of the information window*/
  .gm-style-cc {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    filter: invert(1);
  }
}
</style>
