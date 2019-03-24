<template>
  <div class="auth-form">
    <q-page>
      <div class="absolute-center">
        <q-card dark class="q-pa-md card-panel" bordered>
          <slot></slot>
        </q-card>
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  name: 'AuthForm',
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.auth-form {
  /* Change the white to any color ;) */
  input:-webkit-autofill,
  input:-webkit-autofill:hover {
    transition: background-color 0s 50000s;
    -webkit-text-fill-color: white !important;
  }
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: black !important;
  }
  .summary {
    text-align: center;
  }

  // top: 10px;
  width: 100%;
  height: 100%;
  overflow: auto;
  .q-card__section:first-of-type {
    padding: 0;
  }
  .card-panel {
    background-color: rgba(255, 255, 255, 0.05);
    width: 90vw;
    max-width: 600px;
    border-radius: 20px;
  }

  .field {
    padding-left: 1em;
    padding-right: 1em;
  }

  h2 {
    font-size: 1.5em;
    font-weight: 400;
    margin: 0 auto;
    @media screen and (max-width: 420px) {
      font-size: 1.1em;
      margin: 0;
    }
  }

  .error-text {
    font-size: 0.8em;
    font-weight: 500;
    margin: 0;
    opacity: 0.9;
  }
}
</style>
