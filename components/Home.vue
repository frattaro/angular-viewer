<script>
import Issues from './Issues'

export default {
  components: {
    Issues
  }
}
</script>

<template>
  <v-app>
    <VContent
      id="main"
      class="pt-0 home"
    >
      <VAppBar
        class="home__toolbar title"
        color="grey lighten-3"
        app
        flat
      >
        <img
          src="../assets/angular.png"
          height="40"
        >
        Angular Issue Viewer
      </VAppBar>
      <div class="home__content">
        <Issues />
      </div>
      <VFooter
        class="home__footer"
        height="auto"
      />
    </VContent>
  </v-app>
</template>

<style>
  .home__content {
    margin-top: 64px
  }
</style>
