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

          <div v-if="pins.addMode">
            <LMarker :lat-lng="pins.newPin.data.coordinates" @click="clickNewPinMarker">
              <LIcon :icon-size="newPinMarker.size" :icon-anchor="newPinMarker.anchor">
                <div v-bind:class="pins.newPin.data.color" class="bumpmap-marker newpin">
                  <svg
                    @click="clickNewPinMarker"
                    class="marker-bg"
                    width="315px"
                    height="411px"
                    viewBox="0 0 315 411"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->
                    <defs>
                      <path
                        d="M135.027809,0 C60.453854,0 0,52.3617656 0,116.953938 C0,214.622712 134.546503,388.345129 135.027809,388.329689 C135.601811,388.31116 270.053835,213.078664 270.053835,116.953938 C270.053835,52.3617656 209.601764,0 135.027809,0 Z"
                        id="path-1"
                      ></path>
                      <filter
                        x="-7.2%"
                        y="-4.2%"
                        width="114.4%"
                        height="110.0%"
                        filterUnits="objectBoundingBox"
                        id="filter-2"
                      >
                        <feMorphology
                          radius="1"
                          operator="dilate"
                          in="SourceAlpha"
                          result="shadowSpreadOuter1"
                        ></feMorphology>
                        <feOffset dx="0" dy="3" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur
                          stdDeviation="5"
                          in="shadowOffsetOuter1"
                          result="shadowBlurOuter1"
                        ></feGaussianBlur>
                        <feColorMatrix
                          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.505293252 0"
                          type="matrix"
                          in="shadowBlurOuter1"
                        ></feColorMatrix>
                      </filter>
                      <path
                        d="M256,40 L284,40 C290.075132,40 295,44.9248678 295,51 C295,57.0751322 290.075132,62 284,62 L256,62 L256,91 C256,97.0751322 251.075132,102 245,102 C238.924868,102 234,97.0751322 234,91 L234,62 L204,62 C197.924868,62 193,57.0751322 193,51 C193,44.9248678 197.924868,40 204,40 L234,40 L234,11 C234,4.92486775 238.924868,1.11598369e-15 245,0 C251.075132,-1.11598369e-15 256,4.92486775 256,11 L256,40 Z"
                        id="path-3"
                      ></path>
                      <filter
                        x="-12.7%"
                        y="-10.8%"
                        width="125.5%"
                        height="125.5%"
                        filterUnits="objectBoundingBox"
                        id="filter-4"
                      >
                        <feMorphology
                          radius="1"
                          operator="dilate"
                          in="SourceAlpha"
                          result="shadowSpreadOuter1"
                        ></feMorphology>
                        <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur
                          stdDeviation="3"
                          in="shadowOffsetOuter1"
                          result="shadowBlurOuter1"
                        ></feGaussianBlur>
                        <feColorMatrix
                          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
                          type="matrix"
                          in="shadowBlurOuter1"
                        ></feColorMatrix>
                      </filter>
                    </defs>
                    <g
                      id="with-plus"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g id="add-marker" transform="translate(12.000000, 9.000000)">
                        <g id="marker-body" fill-rule="nonzero">
                          <use
                            fill="black"
                            fill-opacity="1"
                            filter="url(#filter-2)"
                            xlink:href="#path-1"
                          ></use>
                          <use fill="#E01A4F" xlink:href="#path-1"></use>
                        </g>
                        <circle
                          id="marker-core"
                          fill="#000000"
                          opacity="0.498721168"
                          style="mix-blend-mode: multiply;"
                          cx="135.5"
                          cy="140.5"
                          r="79.5"
                        ></circle>
                        <g id="add-icon">
                          <use
                            fill="black"
                            fill-opacity="1"
                            filter="url(#filter-4)"
                            xlink:href="#path-3"
                          ></use>
                          <use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-3"></use>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </LIcon>
            </LMarker>
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
    newPinMarker() {
      const servedSize = [this.iconSize, this.iconSize * 1.15]
      const servedAnchor = [this.iconSize / 2, this.iconSize * 1.15]
      return {
        size: [servedSize[0], servedSize[1]],
        anchor: [servedAnchor[0], servedAnchor[1]],
      }
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
    imageStyle(marker) {
      const diameter = 0.85 * this.dynamicSize[0]
      return {
        top: '0px',
        width: `${diameter}px`,
        height: `${diameter}px`,
        backgroundImage: `url(${marker.image ? marker.image : ''})`,
      }
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
