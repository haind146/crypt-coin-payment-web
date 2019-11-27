<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>Crypto Currency Payment Gateway</v-toolbar-title>

      <div class="flex-grow-1" />

      <v-toolbar-items>
        <v-btn text>About us</v-btn>

        <v-btn text>
          <router-link to="/login">Login</router-link>
        </v-btn>

        <v-btn text>Register</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <section>
        <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
          <v-row align="center" justify="center">
            <h1 class="display-2 font-weight-thin mb-4">CCP Gateway</h1>
            <h4 class="subheading">Add cryptocurrency payment method to your application now!</h4>
          </v-row>
          <v-row align="center" justify="center">
            <v-btn>Getting started</v-btn>
          </v-row>
        </v-parallax>
      </section>

      <section>
        <v-row class="my-12" align="center">
          <v-col cols="12" sm="12" class="my-12">
            <div class="text-center">
              <h2 class="headline">Support many type of cryptocurency</h2>
            </div>
          </v-col>
          <v-col cols="12">
            <v-container>
              <v-row align="center">
                <v-col cols="12" md="4">
                  <v-card flat class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="blue--text text--lighten-2">mdi-palette</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center">Material Design</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card flat class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="blue--text text--lighten-2">mdi-flash</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Fast development</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card flat class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="blue--text text--lighten-2">mdi-wrench</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center">Completely Open Sourced</div>
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
        <v-parallax src height="400">
          <v-row justify="center">
            <div class="headline light-blue--text mb-4 text-center">Register now!</div>
          </v-row>
          <v-row align="center">
            <v-col cols="12" md="4" />
            <v-col cols="12" md="4">
              <v-form ref="form" lazy-validation v-model="valid">
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  color="cyan lighten-5"
                  :counter="10"
                  label="Name"
                  required
                />

                <v-text-field v-model="email" label="E-mail" :rules="emailRules" required />

                <v-text-field label="Phone number" v-model="phone" :rules="phoneRules" required />

                <v-checkbox
                  :rules="[v => !!v || 'You must agree to continue!']"
                  label="Do you agree?"
                  required
                />

                <v-btn
                  :disabled="!valid"
                  @click="submitInfo"
                  color="blue white--text"
                  class="mr-4"
                  justify="center"
                >Register</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-parallax>
      </section>

      <div class="text-center">
        <v-dialog v-model="successDialog" width="500">

          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Notice</v-card-title>

            <v-card-text>We have receipt your information and will contact you soon!</v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="successDialog = false">CLOSE</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <div class="text-center">
        <v-dialog v-model="failDialog" width="500">

          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Notice</v-card-title>

            <v-card-text>{{errorMessage}}</v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="failDialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <section>
        <v-container>
          <v-row justify="center" class="my-12">
            <v-col cols="12" sm="4">
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                  Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4" offset-sm="1">
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.</v-card-text>
                <v-list class="transparent">
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-phone</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>777-867-5309</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-map-marker</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Chicago, US</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-email</v-icon>
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
const axios = require("axios");
const host = process.env.VUE_APP_SERVER_URL;

export default {
  data() {
    return {
      title: "Coin Payment Gateway",
      name: "",
      email: "",
      phone: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      phoneRules: [
        v => !!v || "Phone number is required",
        v =>
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v) ||
          "Phone must be valid"
      ],
      valid: true,
      successDialog: false,
      failDialog: false,
      errorMessage: ""
    };
  },
  methods: {
    async submitInfo() {
      const result = await axios.post(host + "/api/user/register", {
        email: this.email,
        phone: this.phone,
        name: this.name
      });
      if (result.data.status) {
        this.successDialog = true
      } else {
        this.failDialog = true
        this.errorMessage = result.data.message
      }
    }
  }
};
</script>
