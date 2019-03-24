<template>
  <AuthForm>
    <q-card-section class="summary">
      <AuthLogo/>
      <h2>Join the Conversation</h2>
      <p>Available: {{this.available}}</p>
      <p>Unavailable: {{this.unavailable}}</p>
    </q-card-section>
    <q-card-section>
      <form @submit.prevent="signup" @keyup="validateForm">
        <div class="field">
          <q-input
            dark
            standout
            bottom-slots
            class="q-my-lg grey-text text-lighten-4"
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
            class="q-my-lg grey-text text-lighten-4"
            type="text"
            name="alias"
            label="Alias"
            @focus="dirty.alias = true"
            @blur="dirty.alias = !!formData.alias"
            v-stream:change="{ subject: alias$ }"
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
                    v-if="formData.alias && !errors.alias && contains(formData.alias)(available)"
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
            class="q-my-lg grey-text text-lighten-4"
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
            class="q-my-lg grey-text text-lighten-4"
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
  </AuthForm>
</template>


<script>
import {
  debounce as rxDebounce,
  distinctUntilChanged,
  pluck as rxPluck,
} from 'rxjs/operators'
import { find, propEq, contains, startsWith, endsWith, pluck } from 'rambda'
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
      checkingAlias: false,
      checked: [],
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
    available: function() {
      if (this.checked && this.checked.length) {
        const available = this.checked.filter(x => x.available)
        if (available && available.length) {
          return pluck('alias')(available)
        }
      }
      return []
    },
    unavailable: function() {
      if (this.checked && this.checked.length) {
        const unavailable = this.checked.filter(x => !x.available)
        if (unavailable && unavailable.length) {
          return pluck('alias')(unavailable)
        }
      }
      return []
    },
  },
  domStreams: ['alias$'],
  mounted() {
    this.$subscribeTo(this.alias$, alias => {
      console.log('alias$ subscription. alias = ', alias)
    })
  },
  methods: {
    contains,
    async checkAlias(alias) {
      this.checkingAlias = true
      const cached = find(propEq('alias', alias))(this.checked)
      if (cached) {
        this.checkingAlias = false
        return cached
      }

      const slug = toSlug(alias)
      const ref = db.collection('users').doc(slug)
      const doc = await ref.get()
      const available = !doc.exists
      const result = { alias, available }
      this.checked = [...this.checked, result]
      this.checkingAlias = false
      return result
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
          'Please choose an alias/username. You will be able to post anonymously.'
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
      } else {
        console.debug('validateForm: checking if alias is available.')
        const ALREADY_TAKEN_MSG = 'Sorry, that Alias has already been taken.'
        const cached = find(propEq('alias', alias))(this.checked)
        if (cached && cached.available) {
          this.errors.alias = null
        } else if (cached && !cached.available) {
          this.errors.alias = ALREADY_TAKEN_MSG
          result = false
        } else if (!cached) {
          console.debug('no cached information for alias.')
          const response = await this.checkAlias(alias)
          console.debug('response:', response)
          const { available } = response
          if (!available) {
            console.debug('alias is unavailable. resetting this.errors.alias')
            this.errors.alias = ALREADY_TAKEN_MSG
            result = false
          } else {
            console.debug('alias is available. resetting this.errors.alias')
            this.errors.alias = null
          }
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
