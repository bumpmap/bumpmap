<template>
  <LMarker
    @click="onClick(pin.coordinates)"
    :lat-lng="pin.coordinates"
    :riseOnHover="true"
    :riseOffset="1000"
  >
    <LIcon :icon-size="size" :icon-anchor="anchor">
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
import { LMarker, LIcon } from 'vue2-leaflet'

export default {
  name: 'PinMarker',
  props: ['pin', 'onClick', 'size', 'anchor', 'served', 'imageStyle'],
  components: {
    LMarker,
    LIcon,
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
}
</style>
