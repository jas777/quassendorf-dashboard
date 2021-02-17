export const state = () => ({
  setPath: [],
})

export const mutations = {
  add(state, point) {
    state.setPath.push(point)
  },
  set(state, path) {
    state.setPath = path
  },
  clear(state) {
    state.setPath = []
  },
}
