<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>Crypto Currency Payment Gateway</v-toolbar-title>

      <div class="flex-grow-1" />

      <v-toolbar-items>
        <v-btn text>
          About us
        </v-btn>

        <v-btn text>
          <router-link to="/login">
            Login
          </router-link>
        </v-btn>

        <v-btn text>
          Register
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <section>
        <v-parallax
          dark
          src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        >
          <v-row
            align="center"
            justify="center"
          >
            <h1 class="display-2 font-weight-thin mb-4">
              CCP Gateway
            </h1>
            <h4 class="subheading">
              Add cryptocurrency payment method to your application now!
            </h4>
          </v-row>
          <v-row
            align="center"
            justify="center"
          >
            <v-btn>Getting started </v-btn>
          </v-row>
        </v-parallax>
      </section>

      <section>
        <v-row
          class="my-12"
          align="center"
        >
          <v-col
            cols="12"
            sm="12"
            class="my-12"
          >
            <div class="text-center">
              <h2 class="headline">
                Support many type of cryptocurency
              </h2>
            </div>
          </v-col>
          <v-col cols="12">
            <v-container>
              <v-row align="center">
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-card
                    flat
                    class="transparent"
                  >
                    <v-card-text class="text-center">
                      <v-icon
                        x-large
                        class="blue--text text--lighten-2"
                      >
                        mdi-palette
                      </v-icon>
                    </v-card-text>
                    <v-card-title
                      primary-title
                      class="layout justify-center"
                    >
                      <div class="headline text-center">
                        Material Design
                      </div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-card
                    flat
                    class="transparent"
                  >
                    <v-card-text class="text-center">
                      <v-icon
                        x-large
                        class="blue--text text--lighten-2"
                      >
                        mdi-flash
                      </v-icon>
                    </v-card-text>
                    <v-card-title
                      primary-title
                      class="layout justify-center"
                    >
                      <div class="headline">
                        Fast development
                      </div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-card
                    flat
                    class="transparent"
                  >
                    <v-card-text class="text-center">
                      <v-icon
                        x-large
                        class="blue--text text--lighten-2"
                      >
                        mdi-wrench
                      </v-icon>
                    </v-card-text>
                    <v-card-title
                      primary-title
                      class="layout justify-center"
                    >
                      <div class="headline text-center">
                        Completely Open Sourced
                      </div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </section>

      <section>
        <v-parallax
          src=""
          height="400"
        >
          <v-row
            justify="center"
          >
            <div class="headline light-blue--text mb-4 text-center">
              Register now!
            </div>
          </v-row>
          <v-row align="center">
            <v-col
              cols="12"
              md="4"
            />
            <v-col
              cols="12"
              md="4"
            >
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="name"
                  color="cyan lighten-5"
                  :counter="10"
                  :rules="nameRules"
                  label="Name"
                  required
                />

                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                />

                <v-text-field
                  label="Phone number"
                  v-model="phone"
                  required
                />

                <v-checkbox
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree to continue!']"
                  label="Do you agree?"
                  required
                />

                <v-btn
                  @click="submitInfo"
                  color="blue white--text"
                  class="mr-4"
                  justify="center"
                >
                  Register
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-parallax>
      </section>

      <section>
        <v-container>
          <v-row
            justify="center"
            class="my-12"
          >
            <v-col
              cols="12"
              sm="4"
            >
              <v-card
                flat
                class="transparent"
              >
                <v-card-title
                  primary-title
                  class="layout justify-center"
                >
                  <div class="headline">
                    Company info
                  </div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                  Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                </v-card-text>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              offset-sm="1"
            >
              <v-card
                flat
                class="transparent"
              >
                <v-card-title
                  primary-title
                  class="layout justify-center"
                >
                  <div class="headline">
                    Contact us
                  </div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                </v-card-text>
                <v-list class="transparent">
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">
                        mdi-phone
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>777-867-5309</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">
                        mdi-map-marker
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Chicago, US</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">
                        mdi-email
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>john@vuetifyjs.com</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <v-footer color="blue darken-2">
        <v-row align="center">
          <v-col cols="12" />
        </v-row>
      </v-footer>
    </v-content>
  </div>
</template>

<script>
  import { leaveInfo } from '@/services/users.js'
  export default {
    data () {
      return {
        title: 'Coin Payment Gateway',
        name: '',
        email: '',
        phone: '',
      }
    },
    methods: {
      async submitInfo () {
        await leaveInfo(this.name, this.email, this.phone)
      },
    },
  }
</script>
