<template>
  <div class="welcome">
    <q-card flat bordered class="bg-grey-1">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h5">
              Welcome to
              <Logo/>
            </div>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="close" @click="hideWelcome"></q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="welcome-information">
        <p>
          Here you can post and enjoy
          <strong>
            <em>pins</em>
          </strong> - messages, notices, images, memes etc.
          <strong>pinned to a location</strong>.
        </p>
        <p>
          <strong>
            Pins disappear after
            24 hours
          </strong>, so be quick!
        </p>
        <p>
          Once a pin is gone it is deleted,
          <strong>forever</strong>.
        </p>
        <p>
          Other users can
          <strong>bump</strong> your pins by replying to them.
        </p>
        <p>Have fun!</p>
      </q-card-section>

      <q-separator/>

      <q-card-actions>
        <router-link :to="{name: 'Join'}">
          <q-btn
            class="auth-button"
            size="large"
            rounded
            icon="fas fa-user-plus"
            no-caps
            color="green"
          >Join</q-btn>
        </router-link>
        <router-link :to="{name: 'Login'}">
          <q-btn
            class="auth-button"
            size="large"
            rounded
            icon="fas fa-sign-in-alt"
            no-caps
            color="blue"
          >Login</q-btn>
        </router-link>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'
import { dispatch } from '@/state'

export default {
  name: 'Welcome',
  components: {
    Logo,
  },
  data() {
    return {}
  },
  methods: {
    hideWelcome() {
      dispatch.explorer.setWelcome(false)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.welcome {
  .text-h5 {
    @media screen and (max-width: 420px) {
      position: relative;

      font-size: 1.337em;
    }
  }
  .welcome-information {
    @media screen and (max-width: 420px) {
      padding-top: 0px;
      font-size: 1em;
    }
    padding-top: 8px;
    max-width: 420px;
    font-size: 1.2em;
  }

  .bumpmap-logo {
    @media screen and (max-width: 420px) {
      top: 8px;
      left: 2px;
    }
    display: inline-block;
    position: relative;
    top: 9px;
    .emblem {
      height: 40px;
      @media screen and (max-width: 420px) {
        height: 30px;
      }
    }
    .logo-text {
      @media screen and (max-width: 420px) {
        height: 30px;
      }
      height: 40px;
    }
  }

  .auth-button {
    margin: 2px 5px;
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
