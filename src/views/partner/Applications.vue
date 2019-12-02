<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="invoices"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-container>
              <v-row>
                <v-col cols="2">
                  <v-select
                    v-model="selectedApp"
                    :items="appName"
                    label="applications"
                  />
                </v-col>
                <v-col cols="8">
                  <v-row
                    align="center"
                    justify="space-around"
                  >
                    <v-switch
                      class="ma-2"
                      label="Success"
                    />
                    <v-switch
                      class="ma-2"
                      label="Error"
                    />
                    <v-switch
                      class="ma-2"
                      label="In block"
                    />
                  </v-row>
                </v-col>
                <v-col cols="2">
                  <v-btn @click="dialog=true">
                    Add Order
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
              small
              @click="updateOrder(item)"
            >
              mdi-details
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="transactions_header"
          :items="transactions"
          :items-per-page="5"
          class="elevation-1"
        />
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <v-card>
        <v-card-title class="light-green darken-3 white--text">
          Add Order
        </v-card-title>
        <v-container v-if="step === 1">
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="partnerOrderId"
                prepend-icon="mdi-instapaper"
                placeholder="Order ID"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="orderAmount"
                type="number"
                prepend-icon="mdi-cash"
                label="Amount"
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
            :disabled="!partnerOrderId || !orderAmount"
            @click="addOrder"
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
    <overlay-loading :loading="loading" />
  </v-container>
</template>
<script>
  import Loading from '@/components/Loader.vue'
  import { getApplicationsList, createOrder, getOrdersList, getTransactionsByOrder } from '@/services/apis'
  export default {
    components: {
      'overlay-loading': Loading,
    },

    data () {
      return {
        dialog: false,
        step: 1,
        loading: false,
        partnerOrderId: '',
        orderAmount: 0,
        headers: [
          {
            text: 'Invoice ID',
            align: 'left',
            sortable: false,
            value: 'ID',
          },
          { text: 'Status', value: 'status' },
          { text: 'Amount', value: 'amount' },
          { text: 'ReceiveAddress', value: 'ReceiveAddress' },
          { text: 'Received Amount', value: 'receive' },
          { text: 'Experied time', value: 'expired_time' },
          { text: 'Actions', value: 'action', sortable: false },
        ],
        invoices: [],
        transactions_header: [
          {
            text: 'Transaction ID',
            align: 'left',
            sortable: false,
            value: 'TransactionHash',
          },
          { text: 'value', value: 'value' },
          { text: 'block number', value: 'block_number' },
          { text: 'block hash', value: 'block_hash' },
        ],

        transactions: [],
        applications: [],
        appName: [],
        selectedApp: '',
      }
    },

    watch: {
      selectedApp: function (appName) {
        this.getOrders(this.getApplicationId(appName))
      },
    },
    async mounted () {
      this.loading = true
      try {
        const appList = await getApplicationsList()
        if (appList.status) {
          this.applications = appList.data
          appList.data.forEach(item => this.appName.push(item.name))
          this.selectedApp = this.appName[0]
        } else {
          this.$router.push('/login')
        }
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    },
    methods: {
      async addOrder () {
        this.loading = true
        try {
          const appId = this.getApplicationId(this.selectedApp)
          const result = await createOrder(this.partnerOrderId, this.orderAmount, appId)
          this.step = 2
          this.message = result.message
          if (result.status) {
            this.invoices.push(result.order)
          }
        } catch (e) {
          this.step = 2
          this.message = e.message
        }
        this.loading = false
      },
      getApplicationId (name) {
        let appId
        this.applications.forEach(item => {
          if (item.name === name) {
            appId = item.ID
          }
        })
        return appId
      },
      async getOrders (appId) {
        try {
          const result = await getOrdersList(appId)
          this.invoices = result.data
          console.log(this.invoices)
        } catch (e) {
          console.log(e)
        }
      },
      async updateOrder (order) {
        this.loading = true
        try {
          const result = await getTransactionsByOrder(order.ID)
          this.transactions = result.data
          let receiveAmount = 0
          for (let i = 0; i< this.transactions.length; i++) {
            receiveAmount += this.transactions[i].value
          }
          order.receive = receiveAmount
        } catch (e) {
          console.log(e)
        }
        this.loading = false
      },
    },
  }
</script>
