<template>
  <div class="map">
    <GmapMap
      @click="clickMap"
      :center="{lat: this.lat, lng: this.lng}"
      :zoom="zoom"
      map-type-id="roadmap"
      class="google-map"
      style="width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #000000;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  padding-top: 50px;"
      v-bind:options="mapStyle"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in fakePins"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="centerAt(m.position)"
      />

      <GmapMarker
        ref="newPinRef"
        v-if="newPin.exists"
        :position="newPin.position"
        :clickable="true"
        :draggable="true"
        @click="centerAt(newPin.position)"
      />
    </GmapMap>
  </div>
</template>


<script>
import { GMapMap } from 'vue2-google-maps'
import { interval } from 'rxjs'
import styles from './mapstyles'
import fakePins from './fake-pins'
import { getGeoLocation } from '@/utils/geolocation'

export default {
  name: 'GMap',
  components: {
    GMapMap,
  },
  data() {
    return {
      lat: 53,
      lng: -2,
      zoom: 3,
      mapStyle: {
        styles,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
      },
      sessionLength: 0,
      fakePins,
      newPin: {
        exists: false,
        topic: null,
        body: null,
        createdAt: null,
        author: null,
        score: null,
        position: {
          lat: 53,
          lng: -2,
        },
      },
    }
  },
  methods: {
    placePin(lat, lng) {
      this.newPin = {
        exists: true,
        topic: `New Pin`,
        body: `Insert text here.`,
        createdAt: Date.now(),
        author: 'rai',
        score: Math.round(Math.random() * 100),
        position: {
          lat: lat,
          lng: lng,
        },
      }
    },
    cancelPlacePin() {
      this.newPin = {
        exists: false,
        topic: null,
        body: null,
        createdAt: null,
        author: null,
        score: null,
        position: {
          lat: 53,
          lng: -2,
        },
      }
    },
    centerAt({ lat, lng }) {
      this.zoom = 7
      this.lat = lat
      this.lng = lng
    },
    clickMap(event) {
      const { latLng } = event
      const { lat, lng } = latLng
      console.log(`map clicked @ (${lat()}, ${lng()})`)
      this.placePin(lat(), lng())
    },
    printSessionLength() {
      console.debug(`map session length: ${this.sessionLength} minute`)
    },
  },
  mounted() {
    console.log('fake pins: ', this.fakePins)
    this.$subscribeTo(interval(60000), () => {
      this.sessionLength += 1
      this.printSessionLength()
    })

    this.$subscribeTo(interval(3333), () => {
      console.debug(
        `newPin.position =\t${this.newPin.position.lat} ${
          this.newPin.position.lng
        }`,
      )
      if (this.$refs.newPinRef) {
        const { $markerObject } = this.$refs.newPinRef
        const { position } = $markerObject
        const lat = position.lat()
        const lng = position.lng()
        console.log(`ref pos:\t${lat} ${lng}`)
      }
    })

    getGeoLocation().then(
      ({ lat, lng }) => {
        this.lat = lat || this.lat
        this.lng = lng || this.lng
      },
      (error) => {
        console.error('geolocation get error', error)
      },
    )
  },
}
</script>

<style lang="scss">
.vue-map > div:first-child {
  background-color: rgba(0, 0, 0, 1) !important;
}
</style>
