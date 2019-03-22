<template>
  <div class="bumpmap-explorer">
    <div id="ui">
      <Welcome/>
    </div>
    <div id="map">
      <Map/>
    </div>
  </div>
</template>

<script>
import Map from '@/components/home/Map.vue'
import Welcome from '@/components/Welcome.vue'

export default {
  name: 'Explorer',
  components: {
    Map,
    Welcome,
  },
  mounted() {},
}
</script>

<style lang="scss">
.bumpmap-explorer {
  & > #ui {
    top: 0;
    left: 0;
    position: absolute;
    overflow: auto;
    padding: 15px;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: none;
    * {
      pointer-events: auto;
    }
  }
  & > #map {
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;
    padding: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
</style>
