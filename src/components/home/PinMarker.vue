<template>
  <LMarker
    @click="onClick(pin.coordinates)"
    :lat-lng="pin.coordinates"
    :riseOnHover="true"
    :riseOffset="1000"
    ref="marker"
  >
    <LPopup :autoclose="false" if="pin.topic" class="pin-popup-content" :permanent="true">
      <a href="https://4chan.org">{{pin.topic}}</a>
    </LPopup>
    <LTooltip :opacity="1" if="pin.topic" class="pin-tooltip-content" :open="true">
      <span class="pin-tooltip-topic">{{pin.topic}}</span>
    </LTooltip>
    <LIcon
      :icon-size="adjustedSize"
      :icon-anchor="adjustedAnchor"
      :popup-anchor="adjustedPopupAnchor"
      :tooltip-anchor="adjustedTooltipAnchor"
    >
      <div class="bumpmap-marker" v-bind:class="pin.color">
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
          <g fill="none" fill-rule="evenodd">
            <g fill-rule="nonzero">
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
  props: ['pin', 'onClick', 'size', 'anchor', 'served'],
  components: {
    LMarker,
    LIcon,
    LPopup,
    LTooltip,
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
      return [-1, 0 - (sizeY + 7.5)]
    },
    adjustedTooltipAnchor() {
      const proportion = this.calculateProportion()
      const [anchorX, anchorY] = this.calculateAdjustedAnchor()
      const [sizeX, sizeY] = this.calculateAdjustedSize()
      return [0.66 * sizeX, 0 - 0.75 * sizeY]
    },
  },
  methods: {
    openTooltip() {
      this.$refs.marker.mapObject.openTooltip()
    },
    closeTooltip() {
      this.$refs.marker.mapObject.closeTooltip()
    },
    calculateProportion() {
      return 0.25 + this.pin.size / 1500
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
    return {}
  },
}
</script>

<style lang="scss">
.map,
.leaflet-map-pane {
  .marker-bg {
    height: 100%;
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
    font-size: 2em;
    text-align: center;
    justify-content: center;
  }
  .pin-tooltip-content {
    font-size: 1.5em;
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
}
</style>
