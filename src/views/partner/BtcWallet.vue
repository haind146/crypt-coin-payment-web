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
                <span class="white--text headline">1</span>
              </v-avatar>
              <br>
            </v-row>
            <v-row
              justify="center"
              style="margin: 1em"
            >
              <h4 class="subheading">
                Application 1
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
            >
              <v-avatar
                color="teal"
                size="42"
              >
                <span class="white--text headline">{{ i }}</span>
              </v-avatar>
              <span style="margin: 0 1em 0 1em">{{ app.balance }}</span>
              <v-icon>mdi-bitcoin</v-icon>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col
          cols="9"
          style="padding-top: 2em"
        >
          <v-row no-gutters>
            <v-col
              align="center"
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
                {{ balanceUsd }} USD
              </h3>
            </v-col>
            <v-col
              align="right"
              style="padding: 0.8em 1em 0 0"
              cols="4"
            >
              <v-btn
                large
                outlined
                to="/partner/wallet/btc/send"
              >
                Send
              </v-btn>
            </v-col>
          </v-row>
          <v-row style="margin: 4em 1em 1em 1em">
            <h4 class="subtitle-1">History</h4>
          </v-row>
          <v-divider></v-divider>
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
                <td :colspan="headers.length">Peek-a-boo!</td>
              </template>
            </v-data-table>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style>

</style>

<script>
  export default {
    data: () => ({
      dialog: false,
      balance: 1.1235,
      balanceUsd: 20000000,
      applications: [
        {
          name: 'app 1',
          balance: 0.321,
        },
        {
          name: 'app 2',
          balance: 0.2314324,
        },
        {
          name: 'app 3',
          balance: 0.32432432,
        },
        {
          name: 'app 3',
          balance: 0.32432432,
        },
      ],
      expanded: [],
      singleExpand: false,
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
    }),
  }
</script>
