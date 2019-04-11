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
          @click="clickMap"
          :worldCopyJump="true"
          :minZoom="4"
          :maxZoom="16"
          :noBlockingAnimations="true"
          :no-blocking-animations="true"
          ref="map"
        >
          <div class="basetiles">
            <LTileLayer :url="baseUrl"></LTileLayer>
          </div>

          <div v-if="pins.filtered && pins.filtered.length">
            <PinMarker
              :served="true"
              v-for="pin in pins.filtered"
              :focused="pin.focused"
              :key="pin.id"
              :pin="pin"
              :onClick="clickMarker"
              :size="dynamicSize"
              :anchor="dynamicAnchor"
            ></PinMarker>
            <!-- <LMarker
              ref="newPinRef"
              :position="newPin.position"
              :clickable="true"
              :draggable="true"
              @click="centerAt(newPin.position)"
            />-->
          </div>

          <PinMarker
            :served="false"
            v-if="pins.addMode"
            focused="true"
            :pin="pins.newPin.data"
            :onClick="clickNewPinMarker"
            :size="dynamicSize"
            :anchor="dynamicAnchor"
          ></PinMarker>
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
import { store, dispatch } from '@/state'

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
      ...this.mapState('pins', 'explorer'),
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
  created() {
    const { pins } = store.getState()
    const { zoom, center } = pins
    this.center = center
    this.zoom = zoom
  },
  methods: {
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
    centerAt(coords) {
      console.log(`centerAt(${coords})`)
      this.setView(coords, this.calculateZoomIn())
    },
    setView(center, zoom, options) {
      console.debug(`setView('${center}', '${zoom}', '${options})'`)
      this.$refs.map.mapObject.setView(center, zoom, options)
    },
    printSessionLength() {
      console.debug(`map session length: ${this.sessionLength} minute`)
    },
    zoomIn() {
      console.debug('zoomIn')
      this.zoom = calculateZoomIn()
    },
    calculateZoomIn() {
      console.debug('zoomIn')
      if (this.zoom < 7) {
        return 7
      } else if (this.zoom < 16) {
        return this.zoom + 1
      } else {
        return this.zoom
      }
    },
    clickMap({ originalEvent, latlng, cointerPoint, layerPoint, target }) {
      console.debug('clickMap', latlng)

      dispatch.pins.updateContext({ focus: false })
    },
    clickMarker(pin) {
      if (!pin.focused) {
        const zoom = this.calculateZoomIn()
        this.centerAt(pin.coordinates)
        dispatch.pins.updateContext({
          zoom,
          focus: pin.id,
          center: pin.coordinates,
        })
      }
      console.debug(`clickMarker(${pin.id})`, pin)
    },
    clickNewPinMarker(...args) {
      console.debug(`clickNewPinMarker`, args)
    },
  },
  mounted() {
    this.$subscribeTo(interval(60000), () => {
      this.sessionLength += 1
      this.printSessionLength()
    })

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
