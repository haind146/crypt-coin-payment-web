<template>
  <v-container>
    <v-card
      width="full"
      style="max-height: 800px"
    >
      <v-row
        style="height: 800px"
        no-gutters
      >
        <v-col
          class="blue-grey lighten-5"
          cols="3"
        >
          <div style="height: 150px; padding: 1em">
            <v-row justify="center">
              <v-avatar
                color="teal"
                size="68"
              >
                <span class="white--text headline">{{ currentApplication + 1 }}</span>
              </v-avatar>
              <br>
            </v-row>
            <v-row
              justify="center"
              style="margin: 1em"
            >
              <h4 class="subheading">
                {{ applications[currentApplication].name }}
              </h4>
            </v-row>
          </div>
          <v-list
            class="overflow-y-auto blue-grey lighten-5"
            height="650px"
          >
            <v-list-item
              v-for="(app, i) in applications"
              :key="i"
              style="padding: 1em"
              @click="currentApplication=i"
            >
              <v-avatar
                color="teal"
                size="42"
              >
                <span class="white--text headline">{{ i + 1 }}</span>
              </v-avatar>
              <span style="margin: 0 1em 0 1em">{{ app.name }}</span>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col
          cols="9"
          style="padding-top: 2em"
        >
          <v-row no-gutters>
            <v-col
              class="align"
              cols="2"
            >
              <v-avatar
                size="80"
                style="border-radius: 50%; border: 1px solid #c0c1c2;"
              >
                <v-icon
                  x-large
                  class="headline black--text"
                >
                  mdi-bitcoin
                </v-icon>
              </v-avatar>
            </v-col>
            <v-col
              cols="6"
              style="margin-top: 0.5em"
            >
              <h2 class="headline">
                {{ balance }} BTC
              </h2>
              <h3 class=".subtitle-1">
                {{ balanceUsd.toFixed(4) }} USD
              </h3>
            </v-col>
            <v-col
              class="align"
              style="padding: 0.8em 1em 0 0"
              cols="4"
            >
              <v-btn
                large
                outlined
                @click="dialog = true"
              >
                Withdraw
              </v-btn>
            </v-col>
          </v-row>
          <v-row style="margin: 4em 1em 1em 1em">
            <h4 class="subtitle-1">
              History
            </h4>
          </v-row>
          <v-divider />
          <v-row no-gutters>
            <v-data-table
              style="width: 100%"
              :headers="headers"
              :items="transactions"
              :single-expand="singleExpand"
              :expanded.sync="expanded"
              item-key="name"
              show-expand
              class="overflow-y-auto"
            >
              <template v-slot:expanded-item="{ headers }">
                <td :colspan="headers.length">
                  Peek-a-boo!
                </td>
              </template>
            </v-data-table>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <overlay-loading :loading="loading" />
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <v-card>
        <v-card-title class="light-green darken-3 white--text">
          Withdraw
        </v-card-title>
        <v-container>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="recipientAddress"
              :rules="addressRules"
              label="Recipient address"
              required
            />
          </v-col>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="prvateKeyPassword"
              :rules="passwordRules"
              label="Private Key Password"
              type="password"
              required
            />
          </v-col>
        </v-container>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn
            text
            color="primary"
            @click="() => {dialog = false}"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="sweepMoney"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
          v-model="noticeDialog"
          width="500"
        >
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Notice
            </v-card-title>

            <v-card-text>{{noticeMessage}}</v-card-text>

            <v-divider />

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                text
                @click="noticeDialog = false"
              >
                CLOSE
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </v-container>
</template>

<style>

</style>

<script>
  import Loading from '@/components/Loader.vue'
  import { getApplicationsList, getApplicationUtxos } from '@/services/apis'
  const CryptoJS = require('crypto-js')
  const BitcoinJs = require('bitcoinjs-lib')
  export default {
    components: {
      'overlay-loading': Loading,
    },
    data: () => ({
      loading: false,
      dialog: false,
      currentApplication: 0,
      noticeMessage: '',
      noticeDialog: false,
      balance: 0,
      balanceUsd: 0,
      applications: [],
      expanded: [],
      singleExpand: false,
      passwordRules: [v => !!v || 'Password required'],
      addressRules: [v => !!v || 'Address required'],
      headers: [
        {
          text: 'Transaction hash',
          align: 'left',
          sortable: false,
          value: 'txId',
        },
        { text: 'Type', value: 'type' },
        { text: 'Amount change', value: 'amountChange' },
        { text: 'Block number', value: 'blockNumber' },
      ],
      transactions: [
        {
          txId: 'Frozen Yogurt',
          type: 159,
          amountChange: 6.0,
          blockNumber: 24,
        },
      ],
      utxos: [],
      recipientAddress: '',
      prvateKeyPassword: '',
    }),
    watch: {
      async currentApplication () {
        this.loading = true
        const utxos = await getApplicationUtxos(this.applications[this.currentApplication].ID)
        this.utxos = utxos.data
        this.balance = 0
        for (const utxo of utxos.data) {
          this.balance += utxo.value
        }
        this.balanceUsd = this.balance * 7192
        this.loading = false
      },
    },
    async mounted () {
      this.loading = true
      const appList = await getApplicationsList()
      this.applications = appList.data
      this.currentApplication = 0
      const utxos = await getApplicationUtxos(this.applications[this.currentApplication].ID)
      this.utxos = utxos.data
      this.balance = 0
      for (const utxo of utxos.data) {
        this.balance += utxo.value
      }
      this.balanceUsd = this.balance * 7192
      this.loading = false
    },
    methods: {
      sweepMoney () {
        const masterkeyEncrypt = $cookies.get('master_key')
        const masterKey = CryptoJS.AES.decrypt(masterkeyEncrypt, this.prvateKeyPassword)
        const masterKeyStr = masterKey.toString(CryptoJS.enc.Utf8)
        try {
          const bip32 = BitcoinJs.bip32.fromBase58(masterKeyStr)
        } catch (e) {
          this.noticeDialog = true
          this.noticeMessage = "Invalid password, can not decrypt private key"
          return
        }
        const psbt = new BitcoinJs.Psbt({ network: BitcoinJs.networks.testnet })
        psbt.setVersion(2) // These are defaults. This line is not needed.
        psbt.setLocktime(0) // These are defaults. This line is not needed.
        const feeEachInput = 200
        let totalValue = 0
        for (let index = 0; index < this.utxos.length; index++) {
          const utxo = this.utxos[index]
          totalValue += parseInt(utxo.value*100000000)
          // if hash is string, txid, if hash is Buffer, is reversed compared to txid
          psbt.addInput({
            hash: utxo.tx_id,
            index: utxo.vout,
            sequence: 0xffffffff, // These are defaults. This line is not needed.
            // non-segwit inputs now require passing the whole previous tx as Buffer
            nonWitnessUtxo: Buffer.from(
              utxo.raw_tx,
              'hex',
            ),
          })
        }
        try {
          psbt.addOutput({
          address: this.recipientAddress,
          value: totalValue - this.utxos.length * feeEachInput,
         })  
        } catch (e) {
          this.noticeDialog = true
          this.noticeMessage = "address not valid"
          return
        }
        
        try {
          for (let index = 0; index < this.utxos.length; index++) {
            const utxo = this.utxos[index]
            const privateKey = bip32.derivePath('m/44/1/' + utxo.address_path)
            const keyPair = BitcoinJs.ECPair.fromPrivateKey(privateKey.privateKey)
            psbt.signInput(index, keyPair)
            psbt.validateSignaturesOfInput(index)
          }
          psbt.finalizeAllInputs()
          console.log(psbt.extractTransaction().toHex())
          this.dialog = false
        } catch (e) {
          this.noticeDialog = true
          this.noticeMessage = e.message
        }
        
      },
    },
  }
</script>
