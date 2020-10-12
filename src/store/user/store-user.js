import axios from "axios";
import {
  Notify
} from 'quasar'

const getters = {
  getUsers(state) {
    return state.users;
  },

  getUserRoleDet(state) {
    return state.userRole;
  },

  getSearchUserResult(state) {
    return state.searchUserResult;
  },

  // getIsGoogleVerified(state) {
  //   return state.isGoogleVerified;
  // },

  getUsersCount(state) {
    return state.users.filter(users => users).length
  }
};

const state = {
  users: [],
  role: null,
  userRole: null,
  searchUserResult: null,
  // isGoogleVerified: null,
};

const mutations = {
  getUsers(state, users) {
    state.users = users;
  },

  getUserRoleDetails(state, uRole) {
    state.userRole = uRole;
  },

  getSearchUsers(state, users) {
    state.searchUserResult = users;
  },
  // setGoogleVerified(state, status) {
  //   state.isGoogleVerified = status;
  // },

  // getAdminRoleDetails(state, role) {
  //   state.role = role;
  // }
};

const actions = {

  async getUsers({
    commit,
    state
  }) {
    let response = await axios.get("users");
    // console.log(response.data)
    commit("getUsers", response.data);
  },

  async searchUsers({
    commit,
    state
  }, credentials) {
    let response = await axios.post("users/search-user", credentials);
    console.log(response.data)
    commit("getSearchUsers", response.data);
  },


  // Creations
  async createUser({}, credentials) {
    let response = await axios.post("register/email", credentials, {
        headers: {
          'Registration-Access-Key': '2d5eb6ed-cdcd-40fe-afbc-82d252e710ee'
        }
      }).then(response => {
        Notify.create({
          message: 'User has been Successfully Created',
          icon: 'announcement'
        })
        // console.log('response', response)
      })
      .catch(error => {
        Notify.create({
          message: 'There is something wrong with your data.',
          icon: 'announcement'
        })
        console.log('error messsage: ', error.message)
      })
  },

  async updateUser({}, credentials) {
    let response = await axios.put("users/" + credentials.id, credentials).then(() => {
        // console.log('response', response)
        Notify.create({
          message: 'User has been Successfully Updated',
          icon: 'announcement'
        })
      })
      .catch(error => {
        // console.log('error messsage: ', error.message)
        // console.log('response', response)
        Notify.create({
          color: 'danger',
          message: 'Something is wrong with the details you provided. Please try again.',
          icon: 'announcement'
        })
      })
  },

  async confirmUserRegistration({}, credentials) {
    let response = await axios.put("users/confirmuser/" + credentials.id, credentials).then(() => {
        // console.log('response', response)
        Notify.create({
          message: 'Account Confirmed',
          icon: 'announcement'
        })
      })
      .catch(error => {
        // console.log('error messsage: ', error.message)
        // console.log('response', response)
        Notify.create({
          color: 'danger',
          message: 'Something is wrong with the details you provided. Please try again.',
          icon: 'announcement'
        })
      })
  },

  async updateGoogleUser({commit}, credentials) {
    console.log(credentials);
    let response = await axios.put("users/" + credentials.id + "/google", credentials).then(() => {
        // console.log('response', response)
        commit("setGoogleVerified", true);
        Notify.create({
          message: 'User has been Successfully Updated',
          icon: 'announcement'
        })
      })
      .catch(error => {
        // console.log('error messsage: ', error.message)
        // console.log('response', response)
        Notify.create({
          color: 'danger',
          message: 'Something is wrong with the details you provided. Please try again.',
          icon: 'announcement'
        })
      })
  },

  async updateUserByUUID({}, credentials) {
    let response = await axios.post("users/" + credentials.id, credentials).then(() => {
        // console.log('response', response)
        Notify.create({
          message: 'User has been Successfully Updated',
          icon: 'announcement'
        })
      })
      .catch(error => {
        // console.log('error messsage: ', error.message)
        // console.log('response', response)
        Notify.create({
          color: 'danger',
          message: 'Something is wrong with the details you provided. Please try again.',
          icon: 'announcement'
        })
      })
  },

  async deleteUser({}, credentials) {
    let response = await axios.delete("users/" + credentials, ).then(response => {
        // console.log('response', response)
        Notify.create({
          message: 'User has been Deleted',
          icon: 'announcement'
        })
      })
      .catch(error => {
        console.log('error messsage: ', error.message)
      })
  },

  async assignRoles({}, credentials) {
    let response = await axios.put("users/" + credentials.id + '/roles', credentials).then(() => {
        console.log('response', response)
        Notify.create({
          message: 'User Roles has been assigned',
          icon: 'announcement'
        })
      })
      .catch(error => {
        console.log('error messsage: ', error.message)
      })
  },

  async getAdminRole({
    commit,
    state
  }, id) {
    // console.log(id)
    let response = await axios.get("users/" + id + '/user-roles');
    // console.log(response.data)
    // console.log(response.data[0].id) JSON.stringify(testObject)
    localStorage.setItem('adminRole',JSON.stringify(response.data[0]));
    // commit("getAdminRoleDetails", response.data);
  },

  async getUserRole({
    commit,
    state
  }, id) {
    // console.log(id)
    let response = await axios.get("users/" + id + '/user-roles');
    // console.log(response.data)
    if(response.data != null && response.data.length > 0){
      commit("getUserRoleDetails", response.data[0].pivot.role_id);

    }else{
      commit("getUserRoleDetails", -1);

    }
    // console.log(response.data[0].id) JSON.stringify(testObject)
    // localStorage.setItem('adminRole',JSON.stringify(response.data[0]));
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
