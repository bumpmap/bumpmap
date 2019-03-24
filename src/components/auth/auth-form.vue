<template>
  <div class="auth-form">
    <q-page>
      <slot></slot>
    </q-page>
  </div>
</template>

<script>
export default {
  name: 'AuthForm',
  data() {},
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
  .card-panel {
    background-color: rgba(255, 255, 255, 0.05);
    max-width: 500px;
  }

  .field {
    margin-bottom: 1em;
    padding-left: 1em;
    padding-right: 1em;
  }

  h2 {
    font-size: 1.5em;

    font-weight: 400;
    margin-bottom: 1em;
    margin-top: 1em;
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
