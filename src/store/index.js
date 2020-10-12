import Vue from 'vue'
import Vuex from 'vuex'
import chatdetails from '../store/chat/store-chat'
import auth from '../store/store-auth'
import user from '../store/user/store-user'
import friendrequests from '../store/chat/store-requests'


// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      chatdetails,
      friendrequests,
      auth,
      user
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
