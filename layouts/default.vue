<template>
  <div>
    <DashboardNavbar />
    <Nuxt />
  </div>
</template>

<script>
import Vue from 'vue'
import DashboardNavbar from '~/components/navbar/Navbar'

export default Vue.extend({
  components: {
    DashboardNavbar,
  },
})
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
