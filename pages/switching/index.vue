<template>
  <div class="flex flex-col m-8">
    <div class="w-full flex items-center justify-around">
      <Panel ref="panel" color="#3498db"></Panel>
    </div>
    <div class="inline-flex w-full">
      <h1 class="text-5xl">Manewry</h1>
    </div>
    <hr />
    <div class="my-4 flex flex-wrap">
      <div v-for="entry in queue.entries()" :key="entry[0]" class="m-4 block">
        <div class="w-auto rounded overflow-hidden shadow-lg bg-indigo-200 p-5">
          <div>
            <div class="font-bold text-3xl font-black mb-2">
              {{ cache.get(entry[0]).from }} →
              {{ cache.get(entry[0]).to }}
            </div>
            <h1 class="text-gray-700 text-xl font-semibold">Kroki</h1>
            <p v-for="step in entry[1]" :key="step[0]" class="text-lg">
              {{ step.join(' → ') }}
            </p>
          </div>
          <div class="flex justify-between mt-8">
            <button
              class="ml-2 bg-gray-500 hover:bg-gray-700 text-white text-lg font-bold py-2 px-4 rounded"
              @click="show(entry[1][0])"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              class="inline-flex bg-green-500 hover:bg-green-700 text-white text-lg font-bold py-2 px-4 rounded"
              @click="next(entry[0])"
            >
              Następny
            </button>
            <button
              class="ml-2 inline-flex bg-red-500 hover:bg-red-700 text-white text-lg font-bold py-2 px-4 rounded"
            >
              Anuluj
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Panel from '~/components/Panel.vue'

export default Vue.extend({
  components: {
    Panel,
  },
  async asyncData({ $axios }: any) {
    const toAdd = {
      queue: new Map<number, string>(),
      cache: new Map<number, string>(),
    }
    await $axios.$get('/queue').then((res) => {
      toAdd.queue = new Map(Object.entries(res.queue)) as any
      toAdd.cache = new Map(Object.entries(res.cache)) as any
    })
    return toAdd
  },
  data() {
    return {
      queue: new Map(),
      cache: new Map(),
    }
  },
  methods: {
    async fetchSteps() {
      await this.$axios.$get('/queue').then((res) => {
        this.queue = new Map(Object.entries(res.queue)) as any
        this.cache = new Map(Object.entries(res.cache)) as any
      })
    },
    next(id: number): void {
      this.$axios.$post(`/steps/${id}/next`).catch(() => {})
      this.fetchSteps()
    },
    show(path: string[]) {
      // @ts-ignore
      this.$refs.panel.updatePath(path)
      // @ts-ignore
      this.$refs.panel.refresh()
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
