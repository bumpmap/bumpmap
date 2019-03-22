<template>
  <div class="searchbox">
    <q-card class="bg-grey-1 q-px-md q-py-xs">
      <q-input v-model="search" rounded type="search">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
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
    return {
      search: '',
    }
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
.searchbox {
  // bottom: 10vh;

  position: relative;
  top: 50px;
  width: 90vw;
  max-width: 320px;
  display: none;
  @media screen and (min-width: 500px) {
    max-width: 450px;
  }
  @media screen and (min-width: 768px) {
    max-width: 600px;
  }
  @media screen and (min-width: 1024px) {
    max-width: 800px;
  }
  @media screen and (min-width: 1920px) {
    max-width: 800px;
    display: block;
  }
  margin: 10px auto;

  .welcome-information {
    padding-top: 8px;
    max-width: 420px;
    font-size: 1.2em;
  }

  .bumpmap-logo {
    display: inline-block;
    position: relative;
    top: 9px;
    .emblem {
      height: 40px;
    }
    .logo-text {
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
