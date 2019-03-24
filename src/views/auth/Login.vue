<template>
  <AuthForm>
    <q-card dark class="q-pa-md card-panel" bordered>
      <q-card-section class="summary">
        <AuthLogo/>
        <h2>Welcome Back!</h2>
      </q-card-section>
      <q-card-section>
        <form @submit.prevent="login" @keyup="validateForm">
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
            <q-btn
              rounded
              :outline="!valid"
              :loading="submitting"
              :color="valid ? 'green' : 'grey'"
              size="xl"
              class="full-width"
              @click.prevent="login"
              type="submit"
              :disable="!valid"
              :label="valid ? `Let's Go` : `Login` "
            >
              <template v-slot:loading>
                <q-spinner/>
              </template>
            </q-btn>
            <p class="error-text text-red" v-if="errors.login">{{errors.login}}</p>
          </div>
        </form>
      </q-card-section>
    </q-card>
  </AuthForm>
</template>


<script>
import debounce from 'lodash/debounce'
// import db from '@/firebase/init'
import firebase from 'firebase'
import { EMAIL, PASSWORD } from '@/utils/regex-patterns'
import AuthLogo from '@/components/auth/auth-logo.vue'
import AuthForm from '@/components/auth/auth-form.vue'

export default {
  name: 'Login',
  components: { AuthLogo, AuthForm },
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
      submitting: false,
      valid: false,
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
      this.valid = result
      return result
    },
    async login() {
      const { email, password } = this.formData

      const valid = this.validateForm()

      if (valid && !this.submitting) {
        this.submitting = true
        console.debug('Logging in.', this.formData)
        try {
          const cred = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
          const { user } = cred
          console.debug(`logged in as user ${user.uid}`)
          this.submitting = false
          this.$router.push({ name: 'Explorer' })
        } catch (error) {
          alert('could not login!')
          console.error(error)
          this.errors.email = null
          this.errors.password = null
          this.errors.login = error.message
          this.submitting = false
        }
      } else if (!submitting) {
        console.error('already submitting')
      } else {
        console.error('Cannot log in', this.errors)
      }
    },
  },
}
</script>


<style lang="scss">
</style>
