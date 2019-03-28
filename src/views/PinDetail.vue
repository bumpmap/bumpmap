<template>
  <q-page>
    <div v-if="ready && pin && pin.id" class="pin-detail">
      <div class="row q-ma-md">
        <div class="op-image-container col col-xs-12 col-md-6 col-lg-4 q-pa-sm">
          <img class="op-image" :src="pin.image" alt="pin.topic">
        </div>
        <div class="col col-xs-12 col-md-6 col-lg-8">
          <q-card bordered class="q-pa-xs q-ma-sm">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar-framework.org/img/avatar2.jpg">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="topic">{{pin.topic}}</q-item-label>
                <q-item-label caption class="author">~{{pin.author}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-card-section class="op-body q-my-lg q-pa-lg">{{pin.body}}</q-card-section>

            <q-card-section>
              <div class="column">
                <q-chat-message
                  v-if="user.exists"
                  name="user.data.alias"
                  avatar="https://cdn.quasar-framework.org/img/avatar1.jpg"
                  :text="['this is awesome']"
                  stamp="7 minutes ago"
                  sent
                  size="12"
                  bg-color="amber-7"
                />
                <q-chat-message
                  name="Anonymous"
                  avatar="https://cdn.quasar-framework.org/img/avatar5.jpg"
                  :text="['loooooool so funny XD']"
                  stamp="4 minutes ago"
                  text-color="white"
                  bg-color="primary"
                  size="10"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { dispatch } from '@/state'

export default {
  name: 'PinDetail',
  data() {
    return {
      ready: false,
      pin: {
        topic: '',
        id: '',
      },
      ...this.mapState('pins', 'user'),
    }
  },
  watch: {
    $route: function() {
      const pinId = this.$route.params.pinId
      this.pin = { ...this.pins.library[pinId] }
    },
  },
  async beforeRouteEnter(to, from, next) {
    await dispatch.pins.fetchPin(to.params.pinId)
    next()
    return
  },
  created() {
    const pinId = this.$route.params.pinId
    this.pin = { ...this.pins.library[pinId] }
    this.ready = true
  },
}
</script>

<style lang="scss">
.pin-detail {
  // text-transform: uppercase;
  overflow: auto;
  .topic {
    font-size: 1.5em;
    font-weight: 500;
    @media screen and (max-width: 420px) {
      font-size: 1em;
    }
  }
  .author {
    font-size: 1.1em;
    font-weight: 200;
  }
  .op-image {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    display: block;
  }
  .op-image-container,
  .op-image {
    border-radius: 5px;
  }
  .op-body {
    font-size: 1.1em;
  }
}
</style>
