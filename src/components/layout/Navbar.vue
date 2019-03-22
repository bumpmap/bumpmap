<template>
  <div class="navbar">
    <q-header class="bg-special text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="brand-logo">
            <router-link :to="{name: 'Explorer'}">
              <div class="brand-logo-wrapper">
                <img class="emblem" src="/img/logo/emblem-dark@0.5x.png" alt="bumpmap logo">
                <img class="logotext" src="/img/logo/bumpmap-light.svg" alt="bumpmap">
              </div>
            </router-link>
            <span class="version">
              <span class="version-label">v</span>
              <span class="version-number">{{version}}</span>
              <!-- <span class="version-release" v-if="currentRoute">{{currentRoute.name}}</span> -->
              <span class="version-release" v-if="release.phase">{{release.phase}}</span>
            </span>
          </div>
        </q-toolbar-title>

        <div class="auth-buttons">
          <span class="user-email" v-if="user.exists">{{user.data.email}}</span>
          <router-link v-if="!user.exists" :to="{name: 'Join'}">
            <q-btn
              class="auth-button"
              rounded
              flat
              size="small"
              color="green"
              no-caps
              icon="fas fa-user-plus"
              label="Join"
            />
          </router-link>

          <router-link v-if="!user.exists" :to="{name: 'Login'}">
            <q-btn
              class="auth-button"
              rounded
              flat
              size="small"
              color="blue"
              no-caps
              icon="fas fa-sign-in-alt"
              label="Login"
            />
          </router-link>

          <q-btn
            class="auth-button"
            flat
            rounded
            size="small"
            v-if="user.exists"
            @click="logout"
            color="white"
            no-caps
            icon="fas fa-sign-out-alt"
            label="Logout"
          />
        </div>
        <q-btn
          round
          flat
          size="small"
          color="white"
          no-caps
          icon="fas fa-question-circle"
          @click="showWelcome"
        />
        <q-btn dense flat round icon="menu" @click="toggleRightMenu"/>
      </q-toolbar>

      <!-- <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One"/>
        <q-route-tab to="/page2" label="Page Two"/>
        <q-route-tab to="/page3" label="Page Three"/>
      </q-tabs>-->
    </q-header>
  </div>
</template>

<script>
import firebase from 'firebase'
import bumpmapAppData from '@/utils/app-data'
import { dispatch } from '@/state'

export default {
  name: 'Navbar',
  data() {
    const { version, release } = bumpmapAppData
    return {
      version,
      release,
      ...this.mapState({
        user: 'user',
        route: 'route',
        layout: 'layout',
        explorer: 'explorer',
      }),
    }
  },
  methods: {
    showWelcome() {
      dispatch.explorer.setWelcome(true)
    },
    async logout() {
      const result = await firebase.auth().signOut()
      this.$router.push({ name: 'Login' })
    },
    toggleRightMenu() {
      dispatch.layout.toggleMenu('right')
    },
  },
}
</script>

<style lang="scss">
.navbar {
  .brand-logo-wrapper {
    display: inline-block;
    transition: all 0.2s ease-in-out;
    position: relative;
    left: 5px;
    .emblem,
    .logotext {
      transform-origin: center center;
    }
    &:hover {
      .emblem {
        transform: scale(1.05);
        transform: translateX(-5px);
      }
      .logotext {
        transform: scale(1.06);
        // left: -1px;
      }
    }
  }
  .emblem {
    height: 42px;
    position: relative;
    top: 4px;
    @media screen and (max-width: 768px) {
      height: 30px;
      top: 3px;
    }
  }

  .logotext {
    height: 40px;
    position: relative;
    top: 4px;
    left: 0px;
    @media screen and (max-width: 768px) {
      height: 24px;
      top: 0px;
      left: 0px;
    }
  }

  .logotext,
  .emblem {
    transition: all 0.5s ease-in-out;
    margin: 0;
    padding: 0;
  }

  .bg-special {
    background-color: rgba(20, 20, 20, 0.9);
  }

  .brand-logo {
    user-select: none;
    .version {
      @media screen and (max-width: 768px) {
        display: none;
        top: 6px;
        transform: scale(0.6);
      }
      cursor: help;
      position: relative;
      top: -8px;
      left: 10px;
      display: inline-block;
      margin: 2px 5px;
      padding: 0;
      font-size: 1rem;
      font-weight: 150;

      // vertical-align: top;
      letter-spacing: 2px;
      color: rgba(255, 255, 255, 0.25);
      user-select: none;
    }
    .version-label,
    .version-number,
    .version-label {
      display: inline-block;
      margin: 2px;
      padding: 0;
    }
    .version-label {
      color: rgba(255, 255, 255, 0.15);
      font-size: 0.9em;
    }
    .version-number {
      margin-left: 0px;
    }
    .version-release {
      margin-left: 2px;
      font-size: 0.9em;
      font-weight: 500;
      letter-spacing: 0px;
    }
  }

  .user-email {
    position: relative;
    top: 2px;
    user-select: none;
    font-size: 0.9em;
    text-transform: uppercase;
    font-weight: 100;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.5);
    margin-right: 20px;
    @media screen and (max-width: 768px) {
      display: none;
      top: 6px;
      transform: scale(0.6);
    }
  }

  .auth-button {
    margin: 2px 4px;
    padding-left: 15px;
    padding-right: 15px;
    .fas {
      margin-right: 5px;
      transform-origin: center center;
      transform: scale(0.8);
    }
  }
}
</style>
