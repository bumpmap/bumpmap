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
          v-for="(m, index) in pins"
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
        :worldCopyJump="true"
      >
        <div class="basetiles">
          <LTileLayer :url="baseUrl"></LTileLayer>
        </div>

        <div v-if="processedPins && processedPins.length">
          <LMarker
            v-for="(pin, index) in processedPins"
            :key="index"
            @click="centerAt(pin.position)"
            :lat-lng="pin.coordinates"
          >
            <LIcon
              class="bumpmap-marker-wrapper"
              :icon-size="dynamicSize"
              :icon-anchor="dynamicAnchor"
            >
              <div>{{pin.distance}}</div>
              <div class="bumpmap-marker" v-bind:class="pin.color">
                <img class="marker-bg" :src="pin.background">
                <div class="marker-image" v-bind:style="markerImageStyle(pin)"/>
              </div>
            </LIcon>
          </LMarker>
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
import { map } from 'rambda'
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet'
import styles from './mapstyles'
import { getGeoLocation } from '@/utils/geolocation'
import { dispatch } from '@/state'

export default {
  name: 'GMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },
  computed: {
    processedPins() {
      const { all } = this.pins
      if (all) {
        return map(pin => {
          const { coordinates } = pin
          const [pinX, pinY] = coordinates
          const [x, y] = this.center
          const dx = pinX - x
          const dy = pinY - y
          const distance = Math.hypot(dx, dy)

          return { ...pin, distance }
        })(all)
      } else {
        return []
      }
    },
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
      zoom: 6,
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
    markerImageStyle(marker) {
      const diameter = 0.85 * this.iconSize
      return {
        top: '0px',
        width: `${diameter}px`,
        height: `${diameter}px`,
        backgroundImage: `url(${marker.image ? marker.image : ''})`,
      }
    },
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
    console.log('fake pins: ', this.pins)
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
  .marker-bg {
    height: 100%;
  }
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

  .bumpmap-marker {
    // transform: translateX(-50%) translateY(-50%);
    display: flex;
    justify-content: center;
    position: relative;
    height: 100%;
    text-align: center;
    transition: all 1s ease-in-out;
  }
  .leaflet-marker-icon {
    // transform: translateX(-50%) translateY(-50%);
  }

  .marker-title {
    display: inline-block;
    font-size: 2em;
    width: 100px;
    position: relative;
    top: -30px;
    text-align: center;
    transition: all 1s ease-in-out;
  }

  .marker-bg {
    position: relative;
    z-index: 5;
    display: inline-block;
    height: 100%;
    margin: 0 auto;
    transition: all 1s ease-in-out;
  }

  .purple .marker-image {
    box-shadow: 0 0 0 2pt rgba(68, 53, 91, 1);
  }
  .white .marker-image {
    box-shadow: 0 0 0 2pt rgba(255, 255, 255, 1);
  }
  .sky .marker-image {
    box-shadow: 0 0 0 2pt rgba(54, 173, 216, 1);
  }
  .blue .marker-image {
    box-shadow: 0 0 0 2pt rgba(45, 112, 249, 1);
  }
  .black .marker-image {
    box-shadow: 0 0 0 2pt rgba(34, 30, 34, 1);
  }
  .darkgrey .marker-image {
    box-shadow: 0 0 0 2pt rgba(76, 91, 92, 1);
  }
  .lightgrey .marker-image {
    box-shadow: 0 0 0 2pt rgba(218, 219, 219, 1);
  }
  .yellow .marker-image {
    box-shadow: 0 0 0 2pt rgba(249, 200, 14, 1);
  }
  .red .marker-image {
    box-shadow: 0 0 0 2pt rgba(224, 26, 79, 1);
  }
  .orange .marker-image {
    box-shadow: 0 0 0 2pt rgba(244, 96, 54, 1);
  }
  .green .marker-image {
    box-shadow: 0 0 0 2pt rgba(151, 219, 79, 1);
  }

  .marker-image {
    display: inline-block;
    z-index: 6;
    border-radius: 100%;
    margin: 0 auto;
    background-size: cover;
    background-position: center;
    top: 0;
    position: absolute;
  }

  .leaflet-control-attribution.leaflet-control {
    display: none !important;
  }
}
.map-page {
  position: static;
}
</style>
