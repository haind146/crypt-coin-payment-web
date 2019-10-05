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
                    :items="applications"
                    label="applications"
                  />
                </v-col>
                <v-col cols="8">
                  <v-row
                    align="center"
                    justify="space-around"
                  >
                    <v-switch
                      v-model="disabled"
                      class="ma-2"
                      label="Success"
                    />
                    <v-switch
                      v-model="readonly"
                      class="ma-2"
                      label="Error"
                    />
                    <v-switch
                      v-model="chips"
                      class="ma-2"
                      label="In block"
                    />
                  </v-row>
                </v-col>
                <v-col cols="2">
                  <v-select
                    :items="applications"
                    label="payment method"
                  />
                </v-col>
              </v-row>
            </v-container>
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
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Invoice ID',
            align: 'left',
            sortable: false,
            value: 'invoice_id',
          },
          { text: 'Status', value: 'status' },
          { text: 'Amount', value: 'amount' },
          { text: 'Received Amount', value: 'received_amount' },
          { text: 'Experied time', value: 'experied_time' },
          { text: 'Payment method', value: 'payment_method' },
        ],
        invoices: [
          {
            invoice_id: 1,
            status: 1,
            amount: 0.2,
            received_amount: 0.2,
            experied_time: '20:00:00',
            payment_method: 'BTC',
          },
          {
            invoice_id: 1,
            status: 1,
            amount: 0.2,
            received_amount: 0.2,
            experied_time: '20:00:00',
            payment_method: 'BTC',
          },
          {
            invoice_id: 1,
            status: 1,
            amount: 0.2,
            received_amount: 0.2,
            experied_time: '20:00:00',
            payment_method: 'BTC',
          },
          {
            invoice_id: 1,
            status: 1,
            amount: 0.2,
            received_amount: 0.2,
            experied_time: '20:00:00',
            payment_method: 'BTC',
          },
          {
            invoice_id: 1,
            status: 1,
            amount: 0.2,
            received_amount: 0.2,
            experied_time: '20:00:00',
            payment_method: 'BTC',
          },
        ],
        transactions_header: [
          {
            text: 'Transaction ID',
            align: 'left',
            sortable: false,
            value: 'txId',
          },
          { text: 'from', value: 'from' },
          { text: 'to', value: 'to' },
          { text: 'value', value: 'value' },
          { text: 'block number', value: 'blockNumber' },
          { text: 'block hash', value: 'blockHash' },
          { text: 'invoice id', value: 'invoiceId' },
        ],

        transactions: [
          {
            txId: '78ash3h4uifds9lkojwrwekbriufdsiufhdsjif',
            from: '0xsajdhsajkfhjkh32j4h32jk4h32',
            to: '0xkjshfkjdshfjdksnfb',
            value: 'dsfdsfdsfdsf',
            blockNumber: 32432432,
            blockHash: 2314324324,
            invoiceId: 324324324,
          },
        ],
        applications: [
          'app 1',
          'app 2',
          'app 3',
          'app 4',
          'app 5',
        ],
      }
    },
  }
</script>
