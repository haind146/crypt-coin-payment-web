<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row justify="center">
      <v-col cols="12">
        <material-card
          color="green"
          title="Invoices"
          text="List all new invoices"
        >
          <v-data-table
            :headers="headers"
            :items="items"
            hide-default-footer
          />
        </material-card>
      </v-col>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="6"
        />
      </div>

      <v-col cols="12">
        <material-card
          color="green"
          flat
          full-width
          title="Transactions"
          text="Here is a subtitle for this table"
        >
          <v-data-table
            :headers="headers"
            :items="items.slice(0, 7)"
            hide-default-footer
          />
        </material-card>
      </v-col>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="6"
        />
      </div>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      headers: [
        {
          sortable: false,
          text: 'Name',
          value: 'name',
        },
        {
          sortable: false,
          text: 'Country',
          value: 'country',
        },
        {
          sortable: false,
          text: 'City',
          value: 'city',
        },
        {
          sortable: false,
          text: 'Salary',
          value: 'salary',
          align: 'right',
        },
      ],
      items: [
        {
          name: 'Dakota Rice',
          country: 'Niger',
          city: 'Oud-Tunrhout',
          salary: '$35,738',
        },
        {
          name: 'Minerva Hooper',
          country: 'Curaçao',
          city: 'Sinaai-Waas',
          salary: '$23,738',
        }, {
          name: 'Sage Rodriguez',
          country: 'Netherlands',
          city: 'Overland Park',
          salary: '$56,142',
        }, {
          name: 'Philip Chanley',
          country: 'Korea, South',
          city: 'Gloucester',
          salary: '$38,735',
        }, {
          name: 'Doris Greene',
          country: 'Malawi',
          city: 'Feldkirchen in Kārnten',
          salary: '$63,542',
        }, {
          name: 'Mason Porter',
          country: 'Chile',
          city: 'Gloucester',
          salary: '$78,615',
        },
      ],
    }),
  }
</script>
