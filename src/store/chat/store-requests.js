import axios from "axios";
import {
  Notify
} from 'quasar'

const getters = {
  fetchFriendRequest(state) {
   
    return state.friendRequests;
  },

  fetchAcceptedFriendRequests(state) {
   
    return state.friendRequests.filter(friendRequests => friendRequests.status == 1);
    
  },

  fetchPendingFriendRequests(state) {
   
    return state.friendRequests.filter(friendRequests => friendRequests.status == 0);
    
  },





 
};

const state = {
  friendRequests: [],

 
};

const mutations = {
  GET_FRIEND_REQUESTS(state, requestDetails) {

    
    state.friendRequests = requestDetails;
   
    
  },



 
};

const actions = {

 


  async getFriendRequests({
    commit,
    state
  }, credentials) {
    let response = await axios.get("friends/request");
    // console.log(response.data)
    commit("GET_FRIEND_REQUESTS", response.data);
  },

  // async getSingleMessages({
  //   commit,
  //   state
  // }, credentials) {
  //   let response = await axios.get("chats/allmessages/" + credentials);
  //   // console.log(response.data)
  //   commit("GET_SINGLE_MESSAGES", response.data);
  // },

  // async getChatUserDetails({
  //   commit,
  //   state
  // }, credentials) {
  //   // console.log(credentials);
  //   let response = await axios.post("chatconversation/getuserdetails/", credentials);
  //   console.log(response.data.partner_details)
  //   commit("GET_CHAT_USERS", response.data);
  // },


  // Create chat conversation
  async createFriendRequest({}, credentials) {
    let response = await axios.post("friends/request", credentials).then(response => {
        Notify.create({
          message: 'Friend request sent successfully!',
          icon: 'announcement'
        })
      })
      .catch(error => {
        // console.log('error messsage: ', error.message)
        Notify.create({
          message: 'Somthing is Wrong. Please Try Again.',
          icon: 'announcement'
        })
      })
  },


  async updateFriendRequest({}, credentials) {
    let response = await axios.put("friends/accept/" + credentials.partnerId, credentials).then(response => {
        // console.log(response.data)
        Notify.create({
          message: 'Accepted Friend Request',
          icon: 'announcement'
        })
      })
      .catch(error => {
        console.log('error messsage: ', error.message)
      })
  },


  


  // async deleteJobcat({}, credentials) {
  //   let response = await axios.delete("ChatDetails/" + credentials, ).then(response => {
  //       // console.log('response', response)
  //       Notify.create({
  //         message: 'Jobcat has been Deleted Updated',
  //         icon: 'announcement'
  //       })
  //     })
  //     .catch(error => {
  //       console.log('error messsage: ', error.message)
  //     })
  // }

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
