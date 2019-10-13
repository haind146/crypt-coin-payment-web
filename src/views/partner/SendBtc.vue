<template>
  <v-container>
    <v-row align="center">
      <v-col
        cols="12"
        md="6"
        offset-md="3"
        align-self="center"
      >
        <v-stepper
          class="elevation-0"
          :value="step"
        >
          <v-stepper-header>
            <v-stepper-step step="1">
              Set output
            </v-stepper-step>

            <v-divider />

            <v-stepper-step step="2">
              Review
            </v-stepper-step>

            <v-divider />

            <v-stepper-step step="3">
              Confirm
            </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
        <v-card
          width="100%"
          min-height="400px"
        >
          <h1
            class="headline text-center"
            style="padding: 0.5em"
          >
            Create Transaction
          </h1>
          <v-divider />
          <br>
          <div v-if="step==1">
            <v-form
              ref="form"
              v-model="valid"
              style="padding: 0.5em"
              lazy-validation
            >
              <div style="min-height: 250px">
                <v-row v-for="i in numberOfOutputs">
                  <v-col
                    cols="12"
                    md="8"
                  >
                    <v-text-field
                      v-model="name"
                      label="Recipient address"
                      required
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="name"
                      label="Value"
                      required
                    />
                  </v-col>
                </v-row>
              </div>

              <br>

              <v-btn
                color="light-blue lighten-2 white--text"
                class="mr-4"
                @click="numberOfOutputs++"
              >
                Add Output
              </v-btn>

              <v-btn
                color="orange lighten-2 white--text"
                class="mr-4"
                @click="numberOfOutputs--"
              >
                Remove output
              </v-btn>

              <v-btn
                color="light-green darken-1 white--text"
                @click="step=2"
              >
                Continue
              </v-btn>
            </v-form>
          </div>
          <div v-if="step==2" style="padding: 1em">
            <v-simple-table
              :dense="dense"
              :fixed-header="fixedHeader"
              :height="height"
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Address
                    </th>
                    <th class="text-left">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in outputs"
                    :key="item.address"
                  >
                    <td>{{ item.address }}</td>
                    <td>{{ item.value }}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>123456</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <br>
            <v-btn
              color="orange lighten-2 white--text"
              class="mr-4"
              @click="step=1"
            >
              Back
            </v-btn>
            <v-btn
              color="blue lighten-2 white--text"
              class="mr-4"
              @click="step=3"
            >
              Continue
            </v-btn>
          </div>
          <div v-if="step==3" style="padding: 1em">
            <div style="min-height: 250px">
              <h2 class="subtitle-1">Type your password to sign transaction:</h2>
              <v-text-field
                v-model="name"
                label="Password"
                type="password"
              />
            </div>
            <v-btn
              color="orange lighten-2 white--text"
              class="mr-4"
              @click="step=2"
            >
              Back
            </v-btn>
            <v-btn
              color="blue lighten-2 white--text"
              class="mr-4 text-center"
            >
              Confirm
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    components: {},
    data: () => ({
      step: 1,
      numberOfOutputs: 1,
      outputs: [
        {
          address: '21jk123h24h328794h328uihrff',
          value: 0.123,
        },
        {
          address: '21jk123h24h328794h328uihrff',
          value: 0.123,
        },
        {
          address: '21jk123h24h328794h328uihrff',
          value: 0.123,
        },
      ],
    }),
  }
</script>
