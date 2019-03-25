<template>
  <q-page class="map-page" @style-fn="pageStyle">
    <div class="map">
      <!-- <GmapMap
        @click="clickMap"
        :center="{lat: this.lat, lng: this.lng}"
        :zoom="zoom"
        map-type-id="roadmap"
        class="google-map"
        style="
      width: 100%;
      height: 100%;
  background-color: #000000;
  "
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
          :position="newPin.position"
          :clickable="true"
          :draggable="true"
          @click="centerAt(newPin.position)"
        />
      </GmapMap>-->
      <LMap
        style="height: 100%; width: 100%"
        :zoom="zoom"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
      >
        <div class="basetiles">
          <LTileLayer :url="baseUrl"></LTileLayer>
        </div>
        <!-- <div class="lineTiles">
          <LTileLayer :url="linesUrl"></LTileLayer>
        </div>
        -->
        <!-- <div class="labelTiles">
          <LTileLayer :url="labelsUrl" :opacity="0.7"></LTileLayer>
        </div>-->
      </LMap>
    </div>
  </q-page>
</template>


<script>
import { interval } from 'rxjs'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import styles from './mapstyles'
import fakePins from './fake-pins'
import { getGeoLocation } from '@/utils/geolocation'

export default {
  name: 'GMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      center: [-2, 53],
      zoom: 3,
      bounds: null,
      linesUrl:
        'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.png',
      labelsUrl:
        'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png',
      baseUrl:
        // 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png',
        'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png',

      mapStyle: {
        styles,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false,
        fullscreenControl: false,
        scaleControl: true,
        mapTypeControl: false,
        zoomControl: false,
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
    basemapTileClass() {
      return 'basemap-tiles'
    },
    zoomUpdated(zoom) {
      this.zoom = zoom
    },
    centerUpdated(center) {
      this.center = center
    },
    boundsUpdated(bounds) {
      this.bounds = bounds
    },
    pageStyle(offset) {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen,
      // based on the QLayout "view" prop configuration
      return '100vh'
    },
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
    clickMap(evt) {
      const { latLng } = evt
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
      error => {
        console.error('geolocation get error', error)
      },
    )
  },
}
</script>

<style lang="scss">
.map {
  .leaflet-tile-container {
    img {
      // filter: grayscale(1) invert(0.95) brightness(0.37) contrast(2.2);
      // filter: grayscale(1) invert(0.95) brightness(2) contrast(1.1);
      filter: contrast(0.5) brightness(0.4);
    }
  }
  background-color: rgba(41, 41, 41, 1);
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .vue2leaflet-map {
    background-color: #191919;
  }

  .leaflet-control-attribution.leaflet-control {
    display: none !important;
  }
}
.map-page {
  position: static;
}
</style>
