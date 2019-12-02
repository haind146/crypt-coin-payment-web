<template>
  <v-content>
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card class="elevation-12">
            <v-toolbar
              color="blue"
              dark
              flat
            >
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  label="Username"
                  name="login"
                  :rules="emailRules"
                  prepend-icon="mdi-account"
                  type="text"
                />

                <v-text-field
                  id="password"
                  v-model="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                />
                <p
                  v-if="invalid"
                  class="red--text"
                >
                  Email or password invalid
                </p>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1" />
              <v-btn
                color="blue white--text"
                @click="login"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
  const axios = require('axios')
  const host = process.env.VUE_APP_SERVER_URL
  export default {
    props: {
      source: String,
    },
    data: () => ({
      invalid: false,
      drawer: null,
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),
    mounted () {
      console.log($cookies.get('jwt_token'))
    },
    methods: {
      login: async function () {
        if (this.email === '' || this.password === '') {
          return
        }
        const result = await axios.post(host + '/api/user/login', {
          email: this.email,
          password: this.password,
        })
        console.log(result)
        if (result.data.status) {
          $cookies.set('jwt_token', result.data.account.Token)
          this.$router.push('/partner')
        } else {
          this.invalid = true
        }
      },
    },
  }
</script>
