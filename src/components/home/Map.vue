<template>
  <q-page class="map-page" @style-fn="pageStyle">
    <q-no-ssr>
      <div class="map">
        <LMap
          style="height: 100%; width: 100%"
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
          :worldCopyJump="true"
          :minZoom="4"
          :maxZoom="16"
          :noBlockingAnimations="true"
        >
          <div class="basetiles">
            <LTileLayer :url="baseUrl"></LTileLayer>
          </div>

          <div v-if="pins.filtered && pins.filtered.length">
            <PinMarker
              served
              v-for="pin in pins.filtered"
              :key="pin.id"
              :pin="pin"
              :onClick="centerAt"
              :size="dynamicSize"
              :anchor="dynamicAnchor"
              :imageStyle="markerImageStyle"
            ></PinMarker>

            <!-- <LMarker
              ref="newPinRef"
              :position="newPin.position"
              :clickable="true"
              :draggable="true"
              @click="centerAt(newPin.position)"
            />-->
          </div>
        </LMap>
      </div>
    </q-no-ssr>
  </q-page>
</template>


<script>
import { interval } from 'rxjs'
import throttle from 'lodash/throttle'
import { pluck, map, reduce, max, min, prop, sortBy, filter } from 'rambda'
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet'
import styles from './mapstyles'
import { getGeoLocation } from '@/utils/geolocation'
import PinMarker from '@/components/home/PinMarker.vue'
import { dispatch } from '@/state'

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    PinMarker,
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15]
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15]
    },
  },
  data() {
    return {
      center: [53, -2],
      zoom: 4,
      bounds: null,
      iconSize: 48,
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
      ...this.mapState('pins'),
    }
  },
  watch: {
    zoom: function(val) {
      console.log(`zoom = ${val}`)
      if (val < 6) {
        this.iconSize = 48
      } else if (val >= 6 && val < 9) {
        this.iconSize = 64
      } else if (val >= 9 && val < 12) {
        this.iconSize = 96
      } else if (val >= 12 && val < 16) {
        this.iconSize = 128
      } else if (val >= 16) {
        this.iconSize = 256
      }
    },
  },
  methods: {
    basemapTileClass() {
      return 'basemap-tiles'
    },
    zoomUpdated(zoom) {
      console.debug('zoomUpdated')
      this.zoom = zoom
      if (this.zoom !== this.pins.zoom) {
        this.updateContextZoom(zoom)
      }
    },
    centerUpdated({ lat, lng }) {
      const center = [lat, lng]
      console.debug('centerUpdated')
      this.center = center
      this.updateContextCenter(center)
    },
    updateContextCenter: throttle(function updateContextCenter(center) {
      dispatch.pins.updateContext({ center, zoom: this.zoom })
    }, 300),
    updateContextZoom: throttle(function updateContextZoom(zoom) {
      dispatch.pins.updateContext({ zoom, center: this.center })
    }, 300),
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
    centerAt([lat, lng]) {
      this.zoom = 7
      this.center = [lat, lng]
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
    this.$subscribeTo(interval(60000), () => {
      this.sessionLength += 1
      this.printSessionLength()
    })

    // this.$subscribeTo(interval(3333), () => {
    //   console.debug(
    //     `newPin.position =\t${this.newPin.position.lat} ${
    //       this.newPin.position.lng
    //     }`,
    //   )
    //   if (this.$refs.newPinRef) {
    //     const { $markerObject } = this.$refs.newPinRef
    //     const { position } = $markerObject
    //     const lat = position.lat()
    //     const lng = position.lng()
    //     console.log(`ref pos:\t${lat} ${lng}`)
    //   }
    // })

    getGeoLocation().then(
      ({ lat, lng }) => {
        const [currentLng, currentLat] = this.center
        const latitude = lat || currentLat
        const longitude = lng || currentLng
        this.center = [latitude, longitude]
      },
      error => {
        console.error('geolocation get error', error)
      },
    )
    dispatch.pins.fetchAll()
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
