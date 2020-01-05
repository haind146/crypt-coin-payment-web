<template>
  <div id="inspire">
    <partner-drawer :drawer="drawer" />
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <span class="hidden-sm-and-down">CCP Payment</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <div class="flex-grow-1" />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          />
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container
        fluid
      >
        <router-view />
      </v-container>
    </v-content>
    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="800px"
    >
      <v-card>
        <v-card-title class="light-green darken-3 white--text">
          Create Application
        </v-card-title>
        <v-container v-if="step === 1">
          <v-row>
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <v-row align="center">
                <v-avatar
                  size="40px"
                  class="mr-4"
                >
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  v-model="appName"
                  placeholder="Application name"
                />
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-select
                prepend-icon="mdi-bank"
                :items="payment_methods"
                label="Payment method"
              />
            </v-col>
            <!--            <v-col cols="12">-->
            <!--              <v-text-field-->
            <!--                prepend-icon="mdi-watermark"-->
            <!--                placeholder="Mnemonic seed"-->
            <!--              />-->
            <!--            </v-col>-->
          </v-row>
        </v-container>
        <v-container v-if="step === 2">
          <p>{{ message }}</p>
        </v-container>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn
            v-if="step===1"
            text
            color="primary"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            v-if="step===1"
            text
            :disabled="!appName"
            @click="createApp"
          >
            Save
          </v-btn>
          <v-btn
            v-if="step===2"
            text
            color="primary"
            @click="() => {dialog = false; step=1}"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { createApplication } from '@/services/apis'
  export default {
    components: {
      PartnerDrawer: () => import('@/components/core/PartnerDrawer'),
    },
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'mdi-view-grid', text: 'Applications', to: '/partner' },
        { icon: 'mdi-wallet', text: 'My Wallet', to: '/wallet' },
        {
          icon: 'mdi-menu-up',
          'icon-alt': 'mdi-menu-down',
          text: 'Labels',
          model: true,
          children: [
            { icon: 'mdi-plus', text: 'Create label' },
          ],
        },
      ],
      message: '',
      step: 1,
      appName: '',
      payment_methods: [
        'BTC', 'ETH',
      ],
    }),
    async mounted () {
      const masterKey = $cookies.get('master_key')
      if (!masterKey) {
        this.$router.push('/private-key')
      }
    },
    methods: {
      async createApp () {
        try {
          const result = await createApplication(this.appName)
          console.log(result)
          this.step = 2
          this.message = result.message
        } catch (e) {
          console.log(e)
          this.step = 2
          this.message = e.message
        }
      },
    },
  }
</script>
