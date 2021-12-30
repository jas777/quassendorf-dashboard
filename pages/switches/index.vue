<template>
  <div class="flex flex-col m-8">
    <modal name="confirmation" height="auto">
      <div class="flex flex-col justify-around h-full">
        <div class="m-5">
          <h1 class="text-3xl font-bold text-gray-700">
            Potwierdź ustawienie przebiegu
          </h1>
          <p class="text-5xl font-black">
            {{ pathChange.from }} → {{ pathChange.to }}
          </p>
        </div>
        <div class="block m-5 justify-between">
          <button
            class="inline-flex bg-green-500 hover:bg-green-700 text-white text-xl font-bold py-2 px-4 rounded"
            @click="
              confirmPath(pathChange.from, pathChange.to, true)
              $modal.hide('confirmation')
            "
          >
            Potwierdzam
          </button>
          <button
            class="ml-2 inline-flex bg-red-500 hover:bg-red-700 text-white text-xl font-bold py-2 px-4 rounded"
            @click="$modal.hide('confirmation')"
          >
            Anuluj
          </button>
        </div>
      </div>
    </modal>
    <modal name="switching-confirmation" height="auto">
      <div class="flex flex-col justify-around h-full">
        <div class="m-5">
          <h1 class="text-3xl font-bold text-gray-700">Potwierdź manewry</h1>
          <p class="text-5xl font-black">
            {{ pathChange.from }} → {{ pathChange.to }}
          </p>
          <p class="text-3xl mt-3">Kroki</p>
          <ul>
            <li
              v-for="step in checkedPath.queue"
              :key="step[0]"
              class="text-lg text-grey-700"
            >
              {{ step.join(' → ') }}
            </li>
          </ul>
        </div>
        <div class="block m-5 justify-between">
          <button
            class="inline-flex bg-green-500 hover:bg-green-700 text-white text-xl font-bold py-2 px-4 rounded"
            @click="
              confirmPath(pathChange.from, pathChange.to, false)
              $modal.hide('switching-confirmation')
            "
          >
            Potwierdzam
          </button>
          <button
            class="ml-2 inline-flex bg-red-500 hover:bg-red-700 text-white text-xl font-bold py-2 px-4 rounded"
            @click="$modal.hide('switching-confirmation')"
          >
            Anuluj
          </button>
        </div>
      </div>
    </modal>
    <div class="w-full flex items-center justify-around">
      <Panel ref="panel" color="#ff0000"></Panel>
    </div>
    <div class="w-full">
      <h1 class="text-5xl">Ustawianie przebiegu</h1>
      <hr />
      <div
        class="inline-flex items-center align-middle justify-center self-center mb-8 mx-4 my-8"
      >
        <p class="mr-6 text-xl font-bold">Od</p>
        <div class="relative">
          <select
            v-model="pathChange.from"
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
      <div
        class="inline-flex items-center align-middle justify-center self-center mb-8 mx-4 my-8"
      >
        <p class="mr-6 text-xl font-bold">do</p>
        <div class="relative">
          <select
            v-model="pathChange.to"
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
          class="ml-4 inline-flex bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded"
          @click="setPath(pathChange.from, pathChange.to)"
        >
          Ustaw
        </button>
        <button
          class="ml-4 inline-flex bg-red-500 hover:bg-red-700 text-white text-xl font-bold py-2 px-4 rounded"
          @click="resetPath()"
        >
          Rozwiąż przebieg
        </button>
      </div>
      <div class="inline-flex w-full">
        <h1 class="text-5xl">Rozjazdy</h1>
        <h1
          class="text-4xl mx-8 self-center md:text-right cursor-pointer select-none bg-red-600 text-white md:right-0 px-4 md:absolute"
          @click="reset"
        >
          RESET
        </h1>
      </div>
      <hr />
      <div class="my-4 flex flex-wrap">
        <div v-for="s in switches" :key="s.id" class="m-4 block">
          <div
            class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 flex flex-row cursor-pointer select-none"
            @click="
              !currPath.includes(s.id.toString())
                ? change(s.id, s.state === 0 ? 1 : 0)
                : null
            "
          >
            <div class="w-40 m-2 inline-flex align-middle items-center">
              <p class="font-bold text-5xl mr-3">
                {{ s.id }}
              </p>
              <img
                :alt="s.id"
                src="/switch.svg"
                height="44px"
                width="88px"
                class="mt-2"
              />
            </div>
            <div class="w-20 items-center align-middle m-auto text-center">
              <p
                v-if="s.state === 0 && !currPath.includes(s.id.toString())"
                class="text-red-400 font-extrabold text-6xl max-w-15"
              >
                -
              </p>
              <p
                v-if="s.state === 1 && !currPath.includes(s.id.toString())"
                class="text-green-400 font-extrabold text-6xl max-w-15"
              >
                +
              </p>
              <p
                v-if="currPath.includes(s.id.toString())"
                class="text-orange-500 font-extrabold text-6xl max-w-15"
              >
                <i class="fas fa-lock"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable prettier/prettier */

import Vue from 'vue'
import Panel from '~/components/Panel.vue'

export default Vue.extend({
  components: {
    Panel,
  },
  async asyncData({ $axios }: any) {
    const toAdd = {
      switches: [] as { id: string; state: number }[],
      points: [],
      pathChange: {
        from: '',
        to: '',
      },
      path: [],
    }
    await $axios.$get('/switches').then((res: any) => {
      toAdd.switches = res
    })
    await $axios.$get('/points').then((res: any) => {
      toAdd.points = res.filter(
        (p: string | number) => !p.toString().endsWith('-S')
      )
    })
    return toAdd
  },
  data() {
    return {
      switches: [] as { id: number; state: number }[],
      points: [],
      pathChange: {
        from: '',
        to: '',
      },
      path: [],
      checkedPath: {},
      currPath: [],
    }
  },
  mounted() {
    this.$axios.$get('/currentPath').then((res: string[]) => {
      (this as any).currPath = res;
      (this as any).$refs.panel.updatePath(res);
      (this as any).$refs.panel.refresh()
    })
  },
  methods: {
    fetchSwitches() {
      this.$axios.$get('/switches').then((res) => {
        ;(this as any).switches = res
        // @ts-ignore
        this.$refs.panel.refresh()
      })
      // @ts-ignore
      // this.$refs.panel.path(['3', '4', '5'])
    },
    change(id: number, to: 1 | 0) {
      this.$axios
        .$post(`/switches/${to === 0 ? 'minus' : 'plus'}/${id}`);
        (this as any).fetchSwitches()
    },
    reset() {
      this.$axios.post(`/reset`).catch(() => {});
      (this as any).resetPath();
      (this as any).fetchSwitches()
    },
    setPath(from: string, to: string): void {
      this.$axios
        .$post(`/check_path/${from}/${to}`)
        .then((res) => {
          (this as any).checkedPath = res
          if (res.length === 1) {
            this.$modal.show('confirmation', {}, { height: 'auto' })
          } else {
            this.$modal.show(
              'switching-confirmation',
              {},
              { height: 'fit-content' }
            )
          }
        })
        .catch(() => {})
    },
    confirmPath(from: string, to: string, setFirst: boolean): void {
      this.$modal.hideAll()
      this.$axios
        .$post(`/path/${from}/${to}`)
        .then((res) => {
          // @ts-ignore
          if (this.checkedPath.length < 2) {
            // @ts-ignore
            this.$refs.panel.updatePath(this.checkedPath.queue[0]);
            (this as any).currPath = (this as any).checkedPath.queue[0]
            // @ts-ignore
          }
          if (setFirst) {
            this.$axios.$post(`/steps/${res.queue_id}/next`);
            (this as any).fetchSwitches()
          }
        })
        .catch(() => {})
    },
    resetPath() {
      this.$axios.$post('/resetPath').then((_res) => {
        // @ts-ignore
        this.$refs.panel.updatePath([]);
        (this as any).currPath = [];
        // @ts-ignore
        this.$refs.panel.refresh()
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
