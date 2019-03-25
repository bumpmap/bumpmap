<template>
  <div class="auth-logo center">
    <img class="center bumpmap-emblem" src="/img/logo/emblem-dark.png" alt="bumpmap logo">
    <img class="center bumpmap-logo" src="/img/logo/bumpmap-light.svg" alt="bumpmap.org">
  </div>
</template>

<script>
export default {
  name: 'AuthLogo',
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.auth-logo {
  display: block;

  img {
    margin: 0 auto;
  }
  .bumpmap-logo {
    @media screen and (max-width: 768px) {
      height: 25px;
    }
    height: 50px;
    display: block;
  }
  .bumpmap-emblem {
    @media screen and (max-width: 768px) {
      height: 50px;
    }
    height: 100px;
    display: block;
  }
}
</style>
