<template>
  <div class="flex flex-col m-8">
    <div class="w-full">
      <h1 class="text-5xl left">Podawanie sygnału</h1>
      <hr />
      <div class="block my-8">
        <div
          class="inline-flex items-center align-middle justify-center self-center mb-8 mx-4"
        >
          <p class="mr-6 text-xl font-bold">Semafor</p>
          <div class="relative">
            <select
              id="grid-state"
              v-model="changeForm.signal"
              class="block appearance-none w-full bg-gray-300 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option v-for="signal in signals" :key="signal.id">
                {{ signal.id }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          class="inline-flex items-center align-middle justify-center self-center mb-8 mx-4"
        >
          <p class="mr-6 text-xl font-bold">Cel</p>
          <div class="relative">
            <select
              id="grid-state"
              v-model="changeForm.point"
              class="block appearance-none w-full bg-gray-300 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option v-for="point in points" :key="point">
                {{ point }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="block">
          <button
            class="ml-4 inline-flex bg-green-500 hover:bg-green-700 text-white text-xl font-bold py-2 px-4 rounded"
            @click="submitChange('allow')"
          >
            Podaj
          </button>
          <button
            class="ml-2 inline-flex bg-red-500 hover:bg-red-700 text-white text-xl font-bold py-2 px-4 rounded"
            @click="submitChange('close')"
          >
            Kasuj
          </button>
        </div>
      </div>
      <h1 class="text-5xl left">Semafory</h1>
      <hr />
      <div class="my-4 flex flex-wrap">
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
              <div v-if="signal.repeaters.length > 0" class="mt-3">
                <p class="text-gray-700 text-base font-semibold">Powtarzacze</p>
                <p
                  v-for="repeater in signal.repeaters"
                  :key="repeater"
                  class="text-gray-700"
                >
                  {{ repeater }}
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
  async asyncData({ $axios }: any) {
    const toAdd = {
      signals: [],
      points: [],
    }
    await $axios.$get('/signals').then((res) => {
      toAdd.signals = res
    })
    await $axios.$get('/points').then((res) => {
      toAdd.points = res
    })
    return toAdd
  },
  data() {
    return {
      signals: [],
      points: [],
      changeForm: {
        signal: '',
        point: '',
      },
    }
  },
  methods: {
    submitChange(to: string) {
      if (to === 'allow') {
        this.$axios
          .$post(`/signals/allow/${this.changeForm.signal}`, {
            to: this.changeForm.point,
          })
          .then(() => {
            this.$axios.$get('/signals').then((res) => {
              this.signals = res
            })
          })
          .catch((err) => console.log(err))
      } else {
        this.$axios
          .$post(`/signals/close/${this.changeForm.signal}`)
          .then(() => {
            this.$axios.$get('/signals').then((res) => {
              this.signals = res
            })
          })
          .catch((err) => console.log(err))
      }
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
