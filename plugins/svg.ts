// @ts-ignore
import { SVG } from '@svgdotjs/svg.js'
import { defineNuxtPlugin } from '@nuxt/bridge/dist/runtime'

export default defineNuxtPlugin((nuxtApp) => {
  // Inject $hello(msg) in Vue, context and store.
  nuxtApp.provide('svg', SVG)
})
