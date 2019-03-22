<template>
  <!-- <div class="auth-form">
    <div class="container">
      <form @submit.prevent="login" class="card-panel">
        <AuthLogo/>
        <h2 class="grey-text text-lighten-3 center">Login</h2>
        <p class="center grey-text text-lighten-2">Welcome back!</p>
        <div class="field">
          <q-input dark
            class="grey-text text-lighten-4"
            type="email"
            name="email"
            v-model="formData.email"
          >
          <p class="error-text red-text" v-if="errors.email">{{errors.email}}</p>
        </div>
        <div class="field">
          <q-input dark
            class="grey-text text-lighten-4"
            type="password"
            name="password"
            v-model="formData.password"
            autocomplete="off"
          >
          <p class="error-text red-text" v-if="errors.password">{{errors.password}}</p>
        </div>
        <div class="field center">
          <button
            class="btn-large waves-effect waves-light green darken-3"
            @click.prevent="login"
          >Let's Go</button>
          <p class="error-text red-text" v-if="errors.login">{{errors.login}}</p>
        </div>
      </form>
    </div>
  </div>-->

  <q-page>
    <div class="auth-form">
      <q-card dark class="card-panel" bordered>
        <q-card-section class="summary">
          <AuthLogo/>
          <h2>Welcome Back!</h2>
        </q-card-section>
        <q-card-section>
          <form @submit.prevent="login">
            <div class="field">
              <q-input
                dark
                standout
                bottom-slots
                class="grey-text text-lighten-4"
                type="email"
                name="email"
                label="Email"
                v-model="formData.email"
              >
                <template v-slot:hint>
                  <transition name="bounce">
                    <p class="text-red" v-if="errors.email">{{errors.email}}</p>
                  </transition>
                </template>

                <template v-slot:prepend>
                  <q-icon name="fas fa-envelope"/>
                </template>
              </q-input>
            </div>
            <div class="field">
              <q-input
                dark
                standout
                bottom-slots
                label="Password"
                class="grey-text text-lighten-4"
                type="password"
                name="password"
                v-model="formData.password"
                autocomplete="off"
              >
                <template v-slot:hint>
                  <transition name="bounce">
                    <p class="text-red" v-if="errors.password">{{errors.password}}</p>
                  </transition>
                </template>

                <template v-slot:prepend>
                  <q-icon name="fas fa-key"/>
                </template>
              </q-input>
            </div>
            <div class="field center">
              <q-btn color="green" size="xl" class="full-width" @click.prevent="login">Let's Go</q-btn>
              <p class="error-text text-red" v-if="errors.login">{{errors.login}}</p>
            </div>
          </form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>


<script>
import debounce from 'lodash/debounce'
// import db from '@/firebase/init'
import firebase from 'firebase'
import { EMAIL, PASSWORD } from '@/utils/regex-patterns'
import AuthLogo from '@/views/auth/AuthLogo'

export default {
  name: 'Login',
  components: { AuthLogo },
  data() {
    return {
      foo: 'bar',
      formData: {
        email: null,
        password: null,
      },
      errors: {
        email: null,
        password: null,
        login: null,
      },
    }
  },
  methods: {
    validateForm() {
      let result = true
      const { email, password } = this.formData
      if (!email || !email.match(EMAIL)) {
        this.errors.email = 'Please enter your email.'
        result = false
      }
      if (!password) {
        this.errors.password = 'Please enter your password.'
        result = false
      }

      return result
    },
    login: debounce(async function $login() {
      const { email, password } = this.formData

      const valid = this.validateForm()

      if (valid) {
        console.debug('Logging in.', this.formData)
        try {
          const cred = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
          const { user } = cred
          console.debug(`logged in as user ${user.uid}`)
          this.$router.push({ name: 'Explorer' })
        } catch (error) {
          alert('could not login!')
          console.error(error)
          this.errors.email = null
          this.errors.password = null
          this.errors.login = error.message
        }
      } else {
        console.error('Cannot log in', this.errors)
      }
    }, 500),
  },
}
</script>


<style lang="scss">
@import './auth-form.scss';
</style>
