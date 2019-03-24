<template>
  <AuthForm>
    <q-card dark class="q-pa-md card-panel" bordered>
      <q-card-section class="summary">
        <AuthLogo/>
        <h2>Join the Conversation</h2>
      </q-card-section>
      <q-card-section>
        <form @submit.prevent="signup" @keyup="validateForm">
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
              @change="generateAlias(formData.email)"
              @keyup="generateAlias(formData.email)"
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
              class="grey-text text-lighten-4"
              type="text"
              name="alias"
              label="Alias"
              @focus="dirty.alias = true"
              @blur="dirty.alias = !!formData.alias"
              @change="validateForm"
              v-model="formData.alias"
              autocomplete="off"
            >
              <template v-slot:hint>
                <transition name="bounce">
                  <p class="text-red" v-if="errors.alias">{{errors.alias}}</p>
                </transition>
              </template>

              <template v-slot:prepend>
                <q-icon name="fas fa-user"/>
              </template>

              <template v-slot:append>
                <q-spinner v-if="checkingAlias"/>
                <div v-if="!checkingAlias">
                  <transition name="fade">
                    <q-icon v-if="formData.alias && errors.alias" color="red" name="fas fa-ban"/>
                  </transition>
                  <transition name="fade">
                    <q-icon
                      color="green"
                      v-if="formData.alias && !errors.alias && availableAlias === formData.alias"
                      name="fas fa-check"
                    />
                  </transition>
                </div>
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
          <div class="field">
            <q-input
              dark
              standout
              bottom-slots
              label="Confirm Password"
              class="grey-text text-lighten-4"
              type="password"
              name="password"
              v-model="formData.confirm"
              autocomplete="off"
            >
              <template v-slot:hint>
                <transition name="bounce">
                  <p class="text-red" v-if="errors.confirm">{{errors.confirm}}</p>
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
              :outline="!status.valid"
              type="submit"
              :loading="status.sending"
              :color="status.valid ? 'green' : 'grey'"
              :disable="!status.valid"
              size="xl"
              class="full-width"
              @click.prevent="signup"
            >
              {{buttonText}}
              <template v-slot:loading>
                <q-spinner/>
              </template>
            </q-btn>
            <p class="error-text text-red" v-if="errors.signup">{{errors.signup}}</p>
          </div>
        </form>
      </q-card-section>
    </q-card>
  </AuthForm>
</template>


<script>
import { contains, startsWith, endsWith } from 'rambda'
import debounce from 'lodash/debounce'
import { toSlug } from '@/utils/alias'
import { db } from '@/firebase/init'
import firebase from 'firebase'
import { EMAIL, ALIAS, PASSWORD } from '@/utils/regex-patterns'
import AuthLogo from '@/components/auth/auth-logo.vue'
import AuthForm from '@/components/auth/auth-form.vue'

export default {
  name: 'join',
  components: {
    AuthLogo,
    AuthForm,
  },
  data() {
    return {
      foo: 'bar',
      formData: {
        email: null,
        password: null,
        confirm: null,
        alias: null,
      },
      dirty: {
        alias: false,
      },
      errors: {
        email: null,
        password: null,
        confirm: null,
        alias: null,
        signup: null,
      },
      status: {
        valid: false,
        sending: false,
      },
      availableAlias: null,
      unavailableAlias: null,
      checkingAlias: false,
    }
  },
  computed: {
    buttonClass: function() {
      return {
        disabled: !this.status.valid,
      }
    },
    buttonText: function() {
      return this.status.valid ? 'ready' : `join`
    },
  },
  methods: {
    async checkAlias(alias) {
      this.checkingAlias = true
      if (this.unavailableAlias === alias) {
        console.log('already know this is unavailable')
        this.checkingAlias = false
        return false
      }
      console.debug('checkAlias?')
      const slug = toSlug(alias)
      const ref = db.collection('users').doc(slug)
      const doc = await ref.get()

      if (doc.exists) {
        this.checkingAlias = false
        this.availableAlias = null
        this.unavailableAlias = alias
        return false
      } else {
        this.checkingAlias = false
        this.availableAlias = alias
        this.unavailableAlias = null
        return alias
      }
    },
    startSending() {
      this.status.sending = true
    },
    stopSending() {
      this.status.sending = false
    },
    generateAlias(email) {
      let result = ''
      if (email && contains('@', email) && !startsWith('@', email)) {
        const [emailHead] = email.split('@')
        result = emailHead
      }
      if (!this.dirty.alias) {
        this.formData.alias = result
      }
      return result
    },
    async validateForm() {
      this.$q.loadingBar.stop()
      let result = true
      const { email, password, confirm, alias } = this.formData
      if (!email) {
        this.errors.email = 'Please enter your email.'
        result = false
      } else if (!email.match(EMAIL)) {
        this.errors.email = 'Please enter a valid email.'
        result = false
      } else {
        this.errors.email = null
      }

      if (!password) {
        this.errors.password = 'Please enter your password.'
        result = false
      } else if (password.length < 8) {
        this.errors.password = 'Please enter at least 8 characters'
        result = false
      } else {
        this.errors.password = null
      }

      if (!confirm) {
        this.errors.confirm = 'Please repeat your chosen password.'
        result = false
      } else if (password !== confirm) {
        this.errors.password =
          'Does not match below! Please enter your password again.'
        this.errors.confirm = 'Does not match above! Please try again.'
        result = false
      } else {
        this.errors.confirm = null
      }

      if (!alias) {
        this.errors.alias =
          'Please choose an alias/username. You will be able to post anonymously and with your chosen username.'
        result = false
      } else if (alias.length < 3) {
        this.errors.alias = 'Please choose an alias with at least 3 characters'
        result = false
      } else if (alias.length > 24) {
        this.errors.alias =
          'Please choose an alias with no more than 24 characters'
        result = false
      } else if (
        startsWith('_')(alias) ||
        startsWith(' ')(alias) ||
        endsWith('_')(alias) ||
        endsWith(' ')(alias)
      ) {
        this.errors.alias = 'Cannot start or end with a space or underscore'
      } else if (
        contains('  ')(alias) ||
        contains('__')(alias) ||
        contains('..')(alias)
      ) {
        this.errors.alias =
          'Cannot use two spaces, dots, or underscores in a row'
      } else if (!alias.match(ALIAS)) {
        this.errors.alias =
          "Only letters, numbers, spaces, dots ('.') and underscores ('_') allowed"
        result = false
      } else if (alias !== this.availableAlias) {
        this.errors.alias = null
        console.debug('alias valid. checking if available')
        await this.checkAlias(alias)
        this.checkingAlias = false
        if (this.availableAlias) {
          this.errors.alias = null
          console.debug('alias is AVAILABLE!')
        } else {
          this.errors.alias = 'Sorry, that Alias has already been taken.'
          console.error('alias is NOT AVAILABLE!')
        }
      }
      this.status.valid = result
      return result
    },
    async signup() {
      if (!this.status.sending) {
        this.$q.loadingBar.start()
        this.startSending()
        const valid = await this.validateForm()
        this.status.valid = valid
        const { email, alias, password } = this.formData

        if (valid && !!email && !!alias && !!password) {
          const slug = toSlug(alias)
          const ref = db.collection('users').doc(slug)
          try {
            const cred = await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
            console.debug('cred', cred)
            console.table(cred)
            const { user } = cred
            console.debug('user', user)
            const newUserData = {
              alias,
              home: null,
              user_id: user.uid,
            }

            console.debug('newUserData:', newUserData)

            const done = await ref.set(newUserData)
            console.debug('done', done)
            this.sending = false
            this.$q.loadingBar.stop()
            this.$router.push({ name: 'Explorer' })
          } catch (e) {
            alert('Signup Error')
            this.stopSending()
            console.error(e)
            this.errors.signup = e.message
            this.status.valid = false
          }
        } else {
          this.stopSending()
          console.error('Cannot signup:', this.errors)
        }

        this.$q.loadingBar.stop()
        return
      } else {
        console.debug('already sending signup form')
        return
      }
    },
  },
}
</script>


<style lang="scss">
</style>
