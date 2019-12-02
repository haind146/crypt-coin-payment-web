<template>
  <v-card
    style="margin-top: 4em"
    class="mx-auto"
    max-width="600"
    outlined
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          Import your Private Key
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-text-field
        v-model="mnenomic"
        label="Mnenomic code"
        required
      />
    </v-card-text>
    <v-card-text>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        type="password"
        required
      />
    </v-card-text>
    <v-card-text>
      <v-text-field
        v-model="password_confirm"
        label="Re-enter Password"
        :rules="confirmPassRules"
        type="password"
        required
      />
    </v-card-text>

    <v-card-actions>
      <v-btn
        :disabled="!mnenomic || !password || !password_confirm"
        text
        @click="confirm"
      >
        Confirm
      </v-btn>
    </v-card-actions>
    <overlay-loading :loading="loading" />
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Notice
          </v-card-title>
          <br>

          <v-card-text>
            {{ dialogMessage }}
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
  import Loading from '@/components/Loader.vue'
  import { importExtendPublicKey } from '@/services/apis'
  const CryptoJS = require('crypto-js')
  const hdkey = require('hdkey')
  const bip39 = require('bip39')
  export default {
    components: {
      'overlay-loading': Loading,
    },
    data: () => ({
      mnenomic: '',
      password: '',
      password_confirm: '',
      dialog: false,
      dialogMessage: '',
      passwordRules: [v => !!v || 'Password required'],
      confirmPassRules: [
        v => !!v || 'Confirm password required',
      ],
      loading: false,
    }),
    methods: {
      async confirm () {
        const isValidMnemonic = bip39.validateMnemonic(this.mnenomic)
        if (!isValidMnemonic) {
          this.dialogMessage = 'Invalid mnemonic'
          this.dialog = true
          return
        }
        if (this.password !== this.password_confirm) {
          this.dialogMessage = 'Password is not match'
          this.dialog = true
          return
        }
        const seed = await bip39.mnemonicToSeed(this.mnenomic)
        const masterPrivateKey = hdkey.fromMasterSeed(seed)
        const publicExtendedKey = masterPrivateKey.derive('m/44/1').publicExtendedKey
        this.loading = true
        try {
          const result = await importExtendPublicKey(publicExtendedKey)
          this.loading = false
          this.dialogMessage = result.message
          this.dialog = true
          if (result.status) {
            const cipherMasterKey = CryptoJS.AES.encrypt(masterPrivateKey.privateExtendedKey.toString(), this.password)
            $cookies.set('master_key', cipherMasterKey.toString())
          }
        } catch (e) {
          this.loading = true
          this.dialogMessage = e.message
          this.dialog = false
        }
      },
    },
  }
</script>
