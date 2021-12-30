import { QuerySelector } from '@svgdotjs/svg.js'

declare module '#app' {
  import { Element } from 'svg.js'

  export interface NuxtApp {
    $svg(selector: QuerySelector): Element
  }
}
