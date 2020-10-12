import axios from "axios";
import {
  Notify
} from 'quasar'

const getters = {
  fetchChatDetails(state) {
   
    return state.getUserChatDetails;
  },

  fetchAuthChatUser(state) {
   
    return state.getAuthChatUser;
  },

  fetchPartnerChatUser(state) {
   
    return state.getPartnerChatUser;
  },

  fetchUserSingleMessages(state) {
   
    return state.getUserSingleMessages;
  },

  fetchUserSingleMessagesCount(state) {
   
    // return state.getUserSingleMessages;
    return state.getUserSingleMessages.filter(getUserSingleMessages => getUserSingleMessages).length;
  },

  fetchUsers(state) {
   
    return state.getUsers;
  },
  
  fetchAuthChatUsers(state) {
   
    return state.authChatUsers;
  },
  
  fetchCreatedChatDetails(state) {
   
    return state.createdChatDetails;
  },


 
};

const state = {
  getUserChatDetails: [],
  getAuthChatUser: [],
  getPartnerChatUser: [],
  getUserSingleMessages: [],
  getUsers: [],
  authChatUsers: [],
  createdChatDetails: [],
 
};

const mutations = {
  GET_CHAT_DETAILS(state, ChatDetails) {

    
    state.getUserChatDetails = ChatDetails;
   
    
  },

  GET_CHAT_USERS(state, ChatUsers) {

    
    state.getAuthChatUser = ChatUsers.user_details;
    state.getPartnerChatUser = ChatUsers.partner_details;
   
    
  },

  GET_AUTH_CHATS(state, startChatUsers) {
    state.authChatUsers = startChatUsers;
  },

  GET_CREATED_CHATS(state, createdChatDet) {
    state.createdChatDetails = createdChatDet;
  },

  GET_USERS(state, AllChatUsers) {

    
    state.getUsers = AllChatUsers;
   
   
    
  },

  GET_SINGLE_MESSAGES(state, chatMessages) {
    state.getUserSingleMessages = chatMessages;
    
  },

  ADD_NEW_MESSAGE(state, newChatMessages) {
    state.getUserSingleMessages.push(newChatMessages);
    
  },

 
};

const actions = {

  // async getChatDetails({
  //   commit,
  //   state
  // }, credentials) {
  //   let response = await axios.get("chatconversation/" + credentials);
  //   console.log(response.data)
  //   commit("GET_CHAT_DETAILS", response.data);
  // },


  async getChatUsers({
    commit,
    state
  }, credentials) {
    let response = await axios.get("allusers");
    console.log(response.data)
    commit("GET_USERS", response.data);
  },

  async getSingleMessages({
    commit,
    state
  }, credentials) {
  
    let response = await axios.get("chats/allmessages/" + credentials);
    console.log(response.data)
    commit("GET_SINGLE_MESSAGES", response.data);
  },

  async getChatUserDetails({
    commit,
    state
  }, credentials) {
    // console.log(credentials);
    let response = await axios.post("chatconversation/getuserdetails", credentials);
    console.log(response.data.partner_details)
    commit("GET_CHAT_USERS", response.data);
  },

  async getAuthChats({
    commit,
    state
  }) {
    // console.log(credentials);
    let response = await axios.get("chatconversation/chats/authchats");
    console.log(response.data)
    commit("GET_AUTH_CHATS", response.data);
  },


  // Create chat conversation
  // async createChatDetails({}, credentials) {
  //   let response = await axios.post("chatconversation", credentials).then(response => {
  //       Notify.create({
  //         message: 'Chat Conversation has been created',
  //         icon: 'announcement'
  //       })
  //     })
  //     .catch(error => {
  //       // console.log('error messsage: ', error.message)
  //       Notify.create({
  //         message: 'Somthing is Wrong. Please Try Again.',
  //         icon: 'announcement'
  //       })
  //     })
  // },

  // Create or get chat conversation
  async createChatDetails({commit}, credentials) {
    let response = await axios.get("chatconversation/" + credentials.partnerId, credentials).then(response => {
      commit("GET_CREATED_CHATS", response.data);
      console.log(response.data)
        Notify.create({
          message: 'Chat Conversation has been created',
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

  // Create chat messages
  async createChatMessages({commit}, credentials) {
    let response = await axios.post("chats", credentials).then(response => {
      
      // console.log(response.data)

      commit("ADD_NEW_MESSAGE", response.data);



      // Notify.create({
      //     message: 'Chat Message has been created',
      //     icon: 'announcement'
      //   })
      })
      .catch(error => {
        // console.log('error messsage: ', error.message)
        Notify.create({
          message: 'Somthing is Wrong. Please Try Again.',
          icon: 'announcement'
        })
      })
  },

  

  // async updateJobcat({}, credentials) {
  //   let response = await axios.put("ChatDetails/" + credentials.id, credentials).then(() => {
  //       // console.log('response', response)
  //       Notify.create({
  //         message: 'Jobcat has been Successfully Updated',
  //         icon: 'announcement'
  //       })
  //     })
  //     .catch(error => {
  //       console.log('error messsage: ', error.message)
  //     })
  // },


  async deleteJobcat({}, credentials) {
    let response = await axios.delete("ChatDetails/" + credentials, ).then(response => {
        // console.log('response', response)
        Notify.create({
          message: 'Jobcat has been Deleted Updated',
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
