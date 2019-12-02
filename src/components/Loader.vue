<template>
  <v-dialog
    v-model="loading"
    fullscreen
    full-width
  >
    <v-container
      class="fill-height"
      fluid
      style="background-color: rgba(255, 255, 255, 0.5);"
    >
      <v-row
        justify="center"
        align="center"
      >
        <v-progress-circular
          indeterminate
          size="64"
        />
      </v-row>
    </v-container>
  </v-dialog>
</template>
<script>
  export default {
    name: 'Loading',
    props: {
      loading: {
        type: Boolean,
        default: () => false,
      },
    },
  }
</script>
