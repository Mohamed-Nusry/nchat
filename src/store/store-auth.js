import axios from 'axios'
import {
  Notify
} from 'quasar'

axios.defaults.headers.common['Registration-Access-Key'] = `a9011213-179d-4c81-a893-d0d9aeec1275`;

const state = {
  token: null,
  user: {},
  email_exist: null,
  resetPassStatus:0
}


const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_RESET_PASS_STATUS(state, status) {
    state.resetPassStatus = status
  },
  SET_USER(state, data) {
    state.user = data
  },
  EXIST_EMAIL(state, data) {
    state.email_exist = data
  }
}


const actions = {
  //User Register Action
  async registerUser({}, credentials) {
    let response = await axios.post('register/email', credentials).then(() => {
        // console.log('response', response)
        Notify.create({
          message: 'User has been Successfully Created',
          icon: 'announcement'
        })
      })
      .catch(error => {
        Notify.create({
          message: 'There is something wrong with your data',
          icon: 'announcement'
        })
        console.log('error messsage: ', error.message)

      })
  },


  //User Login Action
  async loginUser({
    dispatch
  }, credentials) {
    let response = await axios.post('login', credentials).catch(error => {
     
      Notify.create({
        message: 'Check them again. Your username or Password is wrong.',
        icon: 'announcement',
        color: 'red',
        textColor: 'white'

      })
      // console.log('error messsage: ', error.message)
    })
    dispatch('attempt', response.data.token).then(() => {
      console.log(response.data)
      Notify.create({
        message: 'You have been successfully loggedin',
        icon: 'announcement',
        color: 'primary',
        textColor: 'white'
      })
    })


  },

  //HandleAuth State
  async attempt({
    commit,
    state
  }, token) {
    if (token) {
      commit('SET_TOKEN', token)

    }
    if (!state.token) {
      return
    }

    try {
      let response = await axios.get('me', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      // console.log(response.data)

      commit('SET_USER', response.data)
    } catch (e) {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)


    }
  },

  async logout({
    commit
  }) {
    await axios.post('logout')
    commit('SET_TOKEN', null)
    commit('SET_USER', {})
  },


  async resetPasswordEmail({commit},  credentials) {

    console.log(credentials)
    // let response = await axios.post("jobcats", credentials).then(response => {
      let response = await axios.post('reset/', credentials).then(response => {
          // console.log(response);
          if(response.data.success == true){
            Notify.create({
              message: 'Password reset has been requested successfully',
              icon: 'announcement'
            })
            commit('SET_RESET_PASS_STATUS', 1)
           
          }else{
            Notify.create({
              message: 'Check your email address again',
              icon: 'announcement'
            })
            commit('SET_RESET_PASS_STATUS', 0)
            
          }
         
        
        })
        .catch(error => {
          commit('SET_RESET_PASS_STATUS', 0)
          Notify.create({
            message: 'Check your email address again',
            icon: 'announcement'
          })
          console.log('error messsage: ', error.message)
  
        })
   
  },

  
}

const getters = {
  isLoggedIn: state => !!state.token,
  isAdmin: state => !!state.user.is_admin,

  // isAdmin(state) {
  //   return state.user.is_admin
  // },
  authenticated(state) {
    return state.token && state.user
  },
  user(state) {
    return state.user;
  },
  email_exist(state) {
    return state.email_exist;
  },
  reset_pass_status(state) {
    return state.resetPassStatus;
  },
}




export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
