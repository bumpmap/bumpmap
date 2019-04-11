<template>
  <LMarker
    @click="handleClick"
    :lat-lng="pin.coordinates"
    :riseOnHover="true"
    :riseOffset="1000"
    ref="marker"
    @mouseover="mouseOver($event)"
  >
    <LPopup
      :autoclose="false"
      v-if="pin.topic"
      class="pin-popup-content"
      :permanent="true"
      @mouseover="mouseOver($event)"
      :keep-in-view="true"
      :keepInView="true"
    >
      <router-link :to="{name: 'PinDetail', params: {pinId: pin.id}}">{{pin.topic}}</router-link>
    </LPopup>
    <div v-if="!focused">
      <LTooltip
        :opacity="0.5"
        class="pin-tooltip-content"
        @mouseover="mouseOver($event)"
        ref="tooltip"
      >
        <span v-if="!focused" class="pin-tooltip-topic">{{pin.topic}}</span>
      </LTooltip>
    </div>

    <LIcon
      :icon-size="adjustedSize"
      :icon-anchor="adjustedAnchor"
      :popup-anchor="adjustedPopupAnchor"
      :tooltip-anchor="adjustedTooltipAnchor"
      @mouseover="mouseOver($event)"
    >
      <div class="bumpmap-marker" v-bind:class="[pin.color, explorer.addMode ? 'unfocused' : '']">
        <div class="marker-image" v-bind:style="imageStyle(pin)"/>
        <svg
          class="marker-bg"
          version="1.1"
          viewBox="0 0 294 411"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path
              id="a"
              d="m147.03 9c-74.574 0-135.03 52.362-135.03 116.95 0 97.669 134.55 271.39 135.03 271.38 0.574-0.018529 135.03-175.25 135.03-271.38 0-64.592-60.452-116.95-135.03-116.95z"
            ></path>
            <filter id="b" x="-7.2%" y="-4.2%" width="114.4%" height="110%">
              <feMorphology
                in="SourceAlpha"
                operator="dilate"
                radius="1"
                result="shadowSpreadOuter1"
              ></feMorphology>
              <feOffset dx="0" dy="3" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
              <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="5"></feGaussianBlur>
              <feColorMatrix
                in="shadowBlurOuter1"
                values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.505293252 0"
              ></feColorMatrix>
            </filter>
          </defs>
          <g fill="none" filrule="evenodd">
            <g filrule="nonzero">
              <use fill="black" filter="url(#b)" xlink:href="#a"></use>
              <use class="bumpmap-marker-body" xlink:href="#a"></use>
            </g>
          </g>
        </svg>
      </div>
    </LIcon>
  </LMarker>
</template>

<script>
import { LMarker, LIcon, LPopup, LTooltip } from 'vue2-leaflet'

export default {
  name: 'PinMarker',
  props: ['pin', 'onClick', 'size', 'anchor', 'served', 'focused'],
  components: {
    LMarker,
    LIcon,
    LPopup,
    LTooltip,
  },
  watch: {
    focused: function(val) {
      console.debug(`focused changed to ${val}`)
    },
  },
  computed: {
    adjustedSize() {
      return this.calculateAdjustedSize()
    },
    adjustedAnchor() {
      return this.calculateAdjustedAnchor()
    },
    adjustedPopupAnchor() {
      const proportion = this.calculateProportion()
      const [anchorX, anchorY] = this.calculateAdjustedAnchor()
      const [sizeX, sizeY] = this.calculateAdjustedSize()
      return [-1, 0 - 1.1 * sizeY]
    },
    adjustedTooltipAnchor() {
      const proportion = this.calculateProportion()
      const [anchorX, anchorY] = this.calculateAdjustedAnchor()
      const [sizeX, sizeY] = this.calculateAdjustedSize()
      return [0.66 * sizeX, 0 - sizeY]
    },
  },
  methods: {
    clickMarkerImage(event) {
      console.log('clickMarkerImage')
    },
    mouseOver(event) {
      if (this.focused || this.explorer.addMode) {
        this.$refs.marker.mapObject.closeTooltip()
      }
    },
    mouseEnter(event) {
      console.debug('mouseEnter', event)
    },
    mouseLeave(event) {
      console.debug('mouseLeave', event)
    },
    handleClick() {
      console.log('PinMarker.handleClick()')
      this.onClick(this.pin)
      this.$nextTick(() => {
        this.$refs.marker.mapObject.closeTooltip()
      })

      if (this.pin.focused) {
        console.log('pin already focused. navigating to detail page')
        this.$router.push({ name: 'PinDetail', params: { pinId: this.pin.id } })
      }
    },
    openTooltip() {
      this.$refs.marker.mapObject.openTooltip()
    },
    closeTooltip() {
      this.$refs.marker.mapObject.closeTooltip()
    },
    calculateProportion() {
      const focusRatio = this.pin.focused ? 3 : 1
      return focusRatio * (0.25 + this.pin.size / 1500)
    },
    calculateAdjustedSize() {
      const proportion = this.calculateProportion()
      const [baseX, baseY] = this.size
      const adjusted = [baseX * proportion, baseY * proportion]
      return adjusted
    },
    calculateAdjustedAnchor() {
      const proportion = this.calculateProportion()
      const [baseX, baseY] = this.anchor
      const adjusted = [baseX * proportion, baseY * proportion]
      return adjusted
    },
    imageStyle(marker) {
      const diameter = 0.85 * this.adjustedSize[0]
      return {
        top: '0px',
        width: `${diameter}px`,
        height: `${diameter}px`,
        backgroundImage: `url(${marker.image ? marker.image : ''})`,
      }
    },
  },
  data() {
    return this.mapState('explorer')
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.marker.mapObject.on('mouseover', this.mouseOver, {
        capture: true,
        passive: false,
      })
    })
  },
}
</script>

<style lang="scss">
.map,
.leaflet-map-pane {
  .marker-bg {
    height: 100%;
    pointer-events: none;
  }

  .bumpmap-marker {
    // transform: translateX(-50%) translateY(-50%);
    display: flex;
    justify-content: center;
    position: relative;
    height: 100%;
    text-align: center;
    transition: all 1s ease-in-out;
    opacity: 1;
    &.unfocused {
      transition: all 1s ease-in-out;
      transition: opacity 1s ease-in-out;
      opacity: 0.35;
      filter: blur(3px);
      pointer-events: none;
      * {
        pointer-events: none;
      }
    }
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

  $purple: rgba(68, 53, 91, 1);
  $white: rgba(255, 255, 255, 1);
  $sky: rgba(54, 173, 216, 1);
  $blue: rgba(45, 112, 249, 1);
  $black: rgba(34, 30, 34, 1);
  $darkgrey: rgba(76, 91, 92, 1);
  $lightgrey: rgba(218, 219, 219, 1);
  $yellow: rgba(249, 200, 14, 1);
  $red: rgba(224, 26, 79, 1);
  $orange: rgba(244, 96, 54, 1);
  $green: rgba(151, 219, 79, 1);

  .purple {
    .marker-image {
      box-shadow: 0 0 0 2pt $purple;
    }

    .marker-bg .bumpmap-marker-body {
      fill: $purple;
    }
  }
  .white {
    .marker-image {
      box-shadow: 0 0 0 2pt $white;
    }

    .marker-bg .bumpmap-marker-body {
      fill: $white;
    }
  }
  .sky {
    .marker-image {
      box-shadow: 0 0 0 2pt $sky;
    }

    .marker-bg .bumpmap-marker-body {
      fill: $sky;
    }
  }
  .blue {
    .marker-image {
      box-shadow: 0 0 0 2pt $blue;
    }

    .marker-bg .bumpmap-marker-body {
      fill: $blue;
    }
  }
  .black {
    .marker-image {
      box-shadow: 0 0 0 2pt $black;
    }

    .marker-bg .bumpmap-marker-body {
      fill: $black;
    }
  }
  .darkgrey {
    .marker-image {
      box-shadow: 0 0 0 2pt $darkgrey;
    }

    .marker-bg .bumpmap-marker-body {
      fill: $darkgrey;
    }
  }
  .lightgrey {
    .marker-image {
      box-shadow: 0 0 0 2pt $lightgrey;
    }

    .marker-bg .bumpmap-marker-body {
      fill: $lightgrey;
    }
  }
  .yellow {
    .marker-image {
      box-shadow: 0 0 0 2pt $yellow;
    }

    .marker-bg .bumpmap-marker-body {
      fill: $yellow;
    }
  }
  .red {
    .marker-image {
      box-shadow: 0 0 0 2pt $red;
    }

    .marker-bg .bumpmap-marker-body {
      fill: $red;
    }
  }
  .orange {
    .marker-image {
      box-shadow: 0 0 0 2pt $orange;
    }

    .marker-bg .bumpmap-marker-body {
      fill: $orange;
    }
  }
  .green {
    .marker-image {
      box-shadow: 0 0 0 2pt $green;
    }

    .marker-bg .bumpmap-marker-body {
      fill: $green;
    }
  }

  .marker-image {
    display: inline-block;
    z-index: 10;
    border-radius: 100%;
    margin: 0 auto;
    background-size: cover;
    background-position: center;
    top: 0;
    position: absolute;
    pointer-events: auto;
  }

  .distance {
    position: absolute;
    top: -25px;
    font-weight: 600;
    width: 100%;
    text-align: center;
    text-overflow: hidden;
    margin: 0 auto;
  }

  .pin-popup-content,
  .pin-tooltip-content {
    padding: 10px;
  }
  .pin-popup-content {
    display: flex;
    width: 100%;
    font-size: 1.5em;
    text-align: center;
    justify-content: center;
  }
  .pin-tooltip-content {
    font-size: 1.1em;
    text-align: center;
  }

  .leaflet-popup {
    max-width: 300px;
    width: 80vw;
    text-align: center;
  }

  .leaflet-tooltip {
    background-color: rgba(255, 255, 255, 0);
    border: none;
    box-shadow: none;
    color: rgba(0, 0, 0, 0.8);

    font-weight: 800;
    margin: 0;
    padding: 0;
    &:before {
      margin-left: 0;
      margin-right: 0;
    }
  }

  .pin-tooltip-topic {
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    margin: 0;
  }

  .leaflet-popup a {
    display: flex;
    text-decoration: none;
    font-weight: 500;
    color: #000;
  }
  .leaflet-marker-icon {
    pointer-events: none;
  }
}
</style>
