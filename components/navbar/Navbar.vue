<template>
  <div class="antialiased font-sans">
    <header
      class="flex flex-wrap justify-between p-4 bg-transparent items-baseline"
    >
      <div class="flex mr-8 flex-no-shrink">
        <NuxtLink
          to="/"
          class="text-xl tracking-tight transition-colors text-2xl text-black font-bold transition-300 align-middle"
        >
          <img src="/Balkenkreuz.svg" width="48px" class="inline mr-3" />
          Quassendorf
        </NuxtLink>
      </div>
      <div class="block sm:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-white border-cfaqua hover:text-primary hover:border-greyple"
          @click="toggle"
        >
          <svg
            class="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        :class="open ? 'block' : 'hidden'"
        class="flex-grow w-full sm:flex sm:items-center sm:w-auto text-2xl"
      >
        <div class="text-sm sm:flex-grow buttons">
          <NuxtLink
            to="/switches"
            class="block mt-4 mr-8 align-baseline text-xl p-1 px-2 no-underline menu-element wbm sm:inline-block sm:mt-0 hover:text-white hover:bg-black transition-all duration-500"
            @click="startLoading"
          >
            <div>rozjazdy</div>
          </NuxtLink>
          <a
            href="/signals"
            class="block mt-4 mr-8 align-baseline text-xl p-1 px-2 no-underline menu-element wbm sm:inline-block sm:mt-0 hover:text-white hover:bg-black transition-all duration-500"
          >
            semafory
          </a>
          <NuxtLink
            to="/switching"
            class="block mt-4 mr-8 align-baseline text-xl p-1 px-2 no-underline menu-element wbm sm:inline-block sm:mt-0 hover:text-white hover:bg-black transition-all duration-500"
            @click="startLoading"
          >
            <div>manewry</div>
          </NuxtLink>
          <NuxtLink
            to="/lighting"
            class="block mt-4 mr-8 align-baseline text-xl p-1 px-2 no-underline menu-element wbm sm:inline-block sm:mt-0 hover:text-white hover:bg-black transition-all duration-500"
            @click="startLoading"
          >
            <div>oświetlenie</div>
          </NuxtLink>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'DashboardNavbar',
  data() {
    return {
      open: false,
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    startLoading() {
      this.$nuxt.$loading.start()
    },
  },
}
</script>

<style>
header {
  align-items: end;
}
</style>
