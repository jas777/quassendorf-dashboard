/* eslint-disable prettier/prettier */
<template>
  <div class="flex flex-col m-8">
    <div class="w-full">
      <div class="inline-flex w-full">
        <h1 class="text-5xl">Oświetlenie</h1>
      </div>
      <hr />
      <div class="my-4 flex flex-wrap">
        <div v-for="node in nodes" :key="node.id" class="m-4 block">
          <div
            class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 cursor-pointer select-none"
            @click="toggle(node.name)"
          >
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">{{ node.name }}</div>
              <h1 class="text-gray-700 text-base font-semibold">Status</h1>
              <p v-if="node.active" class="font-semibold text-green-400">
                Aktywne
              </p>
              <p v-else class="font-semibold text-red-400">Nieaktywne</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  asyncData({ $axios }) {
    return $axios
      .get('/lighting')
      .then((res) => {
        return { nodes: res.data }
      })
      .catch(() => {
        return {}
      })
  },
  data() {
    return {
      switches: [],
      nodes: [],
    }
  },
  methods: {
    toggle(lightNode: string) {
      const node = (this as any).nodes.find((n: any) => n.name === lightNode)

      this.$axios
        .post(`/lighting/${node.name}/${node.active ? 'off' : 'on'}`)
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err))
      // TODO: Generics
      this.$axios.get('/lighting').then((res) => {
        this.nodes = res.data
      })
    },
  },
})
</script>

<style>
hr {
  height: 1px;
  background-color: black;
}
</style>
