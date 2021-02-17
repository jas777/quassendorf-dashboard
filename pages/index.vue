<template>
  <div class="flex flex-col m-8">
    <div class="w-full">
      <h1 class="text-5xl left">Aktywne manewry</h1>
      <hr />
      <div class="my-4">
        <div v-for="step in steps" :key="step.id" class="m-4">
          <div class="max-w-sm rounded overflow-hidden shadow-lg bg-indigo-200">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">
                {{ step.from }} → {{ step.to }}
              </div>
              <h1 class="text-gray-700 text-base font-semibold">Przez</h1>
              <p>{{ step.through.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <h1 class="text-5xl left">Stan semaforów</h1>
      <hr />
      <div class="my-4 inline-flex">
        <div v-for="signal in signals" :key="signal.id" class="m-4">
          <div class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Semafor {{ signal.id }}</div>
              <h1 class="text-gray-700 text-base font-semibold">
                Podawany sygnał
              </h1>
              <p v-if="signal.aspect == 0" class="font-semibold text-green-400">
                Wolna droga
              </p>
              <p v-if="signal.aspect == 1" class="font-semibold text-green-400">
                Wolna droga (40km/h)
              </p>
              <p
                v-if="signal.aspect == 2"
                class="font-semibold text-yellow-600"
              >
                Wolna droga, następny stój
              </p>
              <p v-if="signal.aspect == 3" class="font-semibold text-red-400">
                Stój!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full">
        <h1 class="text-5xl left">Stan rozjazdów</h1>
        <hr />
        <div class="my-4 inline-flex flex-wrap">
          <div v-for="s in switches" :key="s.id" class="m-4">
            <div class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200">
              <div class="px-6 inline">
                <div class="font-bold text-2xl mb-2 inline">
                  {{ s.id }}
                </div>
                <p
                  v-if="s.state == 0"
                  class="font-semibold text-red-400 inline font-extrabold text-3xl"
                >
                  -
                </p>
                <p
                  v-if="s.state == 1"
                  class="font-semibold text-green-400 inline font-extrabold text-3xl"
                >
                  +
                </p>
              </div>
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
      .get('/switches')
      .then((res) => {
        return { switches: res.data }
      })
      .catch(() => {
        return { switches: [] }
      })
  },
  data() {
    return {
      steps: [
        {
          id: 1,
          from: 'PT1',
          to: 'BWRB',
          through: ['1', '2', '3', '4'],
        },
      ],
      signals: [
        {
          id: 1,
          aspect: 0,
        },
        {
          id: 2,
          aspect: 1,
        },
        {
          id: 3,
          aspect: 2,
        },
        {
          id: 4,
          aspect: 3,
        },
      ],
      switches: [
        {
          id: 1,
          state: 1,
        },
        {
          id: 2,
          state: 0,
        },
        {
          id: 3,
          state: 1,
        },
        {
          id: 4,
          state: 0,
        },
        {
          id: 5,
          state: 0,
        },
        {
          id: 6,
          state: 1,
        },
      ],
    }
  },
})
</script>

<style>
hr {
  height: 1px;
  background-color: black;
}
</style>
