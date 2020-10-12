import axios from "axios";
import {
  Notify
} from 'quasar'

const getters = {
  getRoles(state) {
    return state.roles;
  },
  getUsersByRole(state) {
    return state.usersByRole;
  },
  getLoggedAdminRoles(state) {
    return state.loggedAdminAllRoles;
  }
};


const state = {
  roles: [],
  usersByRole: [],
  loggedAdminAllRoles: null,
};

const mutations = {
  getRoles(state, roles) {
    state.roles = roles;
  },
  getUsersByRole(state, usersByRole) {
    state.usersByRole = usersByRole;
  },
  loggedAdminRoles(state, loggedAdminAllRoles) {
    state.loggedAdminAllRoles = loggedAdminAllRoles;
  }
};

const actions = {

  async getRoles({
    commit,
    state
  }) {
    let response = await axios.get("roles");
    // console.log(response.data)
    commit("getRoles", response.data);
  },

  async getUsersByRole({
    commit,
    state
  }, role) {
    console.log(role)
    let response = await axios.get("roles/" + role + '/users');
    // console.log(response.data)
    commit("getUsersByRole", response.data);
  },

  async getRolesByRole({
    commit,
    state
  }, role) {
    console.log(role)
    let response = await axios.get("roles/" + role);
    // console.log(response.data)
    var adminRoles = [];
    for (let index = 0; index < response.data.permissions.length; index++) {
      adminRoles.push(response.data.permissions[index].name);
      // const element =  array[response.data.permissions.name];
      
    }
    // console.log(adminRoles);
    commit("loggedAdminRoles", adminRoles);
  },


  // Creations
  async createRole({}, credentials) {
    let response = await axios.post("roles", credentials).then(response => {
        console.log('response', response)
      })
      .catch(error => {
        console.log('error messsage: ', error.message)
      })
  },

  async updateRole({}, credentials) {
    let response = await axios.put("roles/" + credentials.id, credentials).then(() => {
        // console.log('response', response)
        Notify.create({
          message: 'Role has been Successfully Updated',
          icon: 'announcement'
        })
      })
      .catch(error => {
        console.log('error messsage: ', error.message)
      })
  },


  async deleteRole({}, credentials) {
    let response = await axios.delete("roles/" + credentials, ).then(response => {
        // console.log('response', response)
        Notify.create({
          message: 'Role has been Deleted Updated',
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
