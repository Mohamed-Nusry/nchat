import axios from "axios";
import {
  Notify
} from 'quasar'

const getters = {
  // GETTER: Get Permissions
  getPermissions(state) {
    return state.permissions;
  }
};

const state = {
  // STATE: ALL PERMISSIONS
  permissions: []
};

const mutations = {
  // MUTATION: Get Permissions
  getPermissions(state, permissions) {
    state.permissions = permissions;
  }
};

const actions = {
  // ACTION: Get Permissions
  async getPermissions({
    commit,
    state
  }) {
    let response = await axios.get("permissions");
    // console.log(response.data)
    commit("getPermissions", response.data);
  },

  // Creations
  async createPermission({}, credentials) {
    let response = await axios.post("permissions", credentials).then(response => {
        console.log('response', response)
      })
      .catch(error => {
        console.log('error messsage: ', error.message)
      })
  },

  async updatePermission({}, credentials) {
    let response = await axios.put("permissions/" + credentials.id, credentials).then(() => {
        // console.log('response', response)
        Notify.create({
          message: 'Permission has been Successfully Updated',
          icon: 'announcement'
        })
      })
      .catch(error => {
        console.log('error messsage: ', error.message)
      })
  },
  async deletePermission({}, credentials) {
    let response = await axios.delete("permissions/" + credentials, ).then(response => {
        // console.log('response', response)
        Notify.create({
          message: 'Permissions has been Deleted Updated',
          icon: 'announcement'
        })
      })
      .catch(error => {
        console.log('error messsage: ', error.message)
      })
  }


};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
