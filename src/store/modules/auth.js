import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage.js'

const state = {
  isSubmiting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
}

const mutations = {
  registerStart(state) {
    state.isSubmiting = true
    state.validationErrors = null
  },
  registerSuccess(state, payload) {
    state.isSubmiting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  registerFailure(state, payload) {
    state.isSubmiting = false
    state.validationErrors = payload
  },
}
const actions = {
  register(context, credentials) {
    return new Promise((resolve) => {
      context.commit('registerStart')
      authApi
        .register(credentials)
        .then((response) => {
          console.log('res', response)
          context.commit('registerSuccess', response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch((result) => {
          console.log('resErr', result)
          context.commit('registerFailure', result.response.data.errors)
        })
    })
    // setTimeout(() => {
    //   context.commit('registerStart')
    // }, 1000);
  },
}

export default {
  state,
  mutations,
  actions,
}