<template>
  <q-page>
   
    <div class=" bg-grey-4 " :style="style">
    <!-- <div class="WAL position-relative bg-grey-4" :style="style"> -->
    <q-layout view="lHh Lpr lFf" class=" shadow-3" container style="background:#fff !important">
    <!-- <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container> -->
      <q-header elevated v-if="chatMode">
        <q-toolbar class="bg-grey-3 text-black" >
          <q-btn
            round
            flat
            icon="keyboard_arrow_left"
            class="WAL__drawer-open q-mr-sm"
            @click="leftDrawerOpen = true"
          />

          <q-btn round flat>
            <q-avatar v-if="currentConversation.user_id == user._id" >
              <!-- <img :src="currentConversation.avatar"> -->
               <img :src="api + `/uploads/users/${currentConversation.receiver_avatar}`">
            </q-avatar>
            <q-avatar v-else>
              <!-- <img :src="currentConversation.avatar"> -->
               <img :src="api + `/uploads/users/${currentConversation.sender_avatar}`">
            </q-avatar>
          </q-btn>

          <span v-if="currentConversation.user_id == user._id" class="q-subtitle-1 q-pl-md">
            {{ currentConversation.receiver_firstname }} {{currentConversation.receiver_lastname}}
          </span>
          <span v-else class="q-subtitle-1 q-pl-md">
            {{ currentConversation.sender_firstname }} {{currentConversation.sender_lastname}}
          </span>

          <q-space/>

          <q-btn round flat icon="search" />
          <q-btn round flat>
            <q-icon name="attachment" class="rotate-135" />
          </q-btn>
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 0]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>Contact data</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Block</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Select messages</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Silence</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Clear messages</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Erase messages</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :breakpoint="690"
      >
        <q-toolbar class="bg-grey-3">
          <q-avatar class="cursor-pointer">
            <img src="https://cdn.quasar.dev/app-icons/icon-128x128.png" />
          </q-avatar>

          <q-space />

          <q-btn round flat icon="message" />
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 8]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>New group</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Archived</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Favorites</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn
            round
            flat
            icon="close"
            class="WAL__drawer-close"
            @click="leftDrawerOpen = false"
          />
        </q-toolbar>

        <q-toolbar class="bg-grey-2">
          <q-input rounded outlined dense class="WAL__field full-width" bg-color="white" v-model="search" placeholder="Search or start a new conversation">
            <template slot="prepend">
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>

        <q-scroll-area style="height: calc(100% - 100px)">
           <div  v-for="(conversation, index) in fetchAuthChatUsers" :key="conversation.id">

          <q-list>
            <q-item
              v-if="conversation.user_id == user._id"
              clickable
              v-ripple
              @click="fetchChatMessages(index,conversation.id)"
            >
            <!-- <p>{{user._id}}</p> -->
            <!-- <div  v-for="(authChats, index) in fetchAuthChatUsers" :key="authChats.id"> -->
              <!-- <div v-if="conversation.user_id == user._id"> -->
              
                <!-- {{authChats.partner_id}} -->
              <q-item-section avatar>
                <q-avatar>
                  <img :src="api + `/uploads/users/${conversation.receiver_avatar}`">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{ conversation.receiver_firstname}} {{conversation.receiver_lastname }}
                </q-item-label>
                <q-item-label class="conversation__summary" caption>
                  <q-icon name="check" v-if="conversation.sent" />
                  <q-icon name="not_interested" v-if="conversation.deleted" />
                  {{ conversation.caption }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>
                  {{ conversation.time }}
                </q-item-label>
                <q-icon name="keyboard_arrow_down" />
              </q-item-section>
              <!-- </div> -->
              <!-- </div> -->

              
                </q-item>


              <q-item
                v-else
                clickable
                v-ripple
                @click="fetchChatMessages(index,conversation.id)"
              >
              
                <!-- {{authChats.partner_id}} -->
              <q-item-section avatar>
                <q-avatar>
                  <img :src="api + `/uploads/users/${conversation.sender_avatar}`">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{ conversation.sender_firstname}} {{conversation.sender_lastname }}
                </q-item-label>
                <q-item-label class="conversation__summary" caption>
                  <q-icon name="check" v-if="conversation.sent" />
                  <q-icon name="not_interested" v-if="conversation.deleted" />
                  {{ conversation.caption }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>
                  {{ conversation.time }}
                </q-item-label>
                <q-icon name="keyboard_arrow_down" />
              </q-item-section>
              <!-- </div> -->
              
            </q-item>
            
          </q-list>
          </div>
          <!-- </div> -->
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="bg-grey-2" >
        <!-- {{fetchUserSingleMessages}} -->
        <ChatBody v-if="chatMode" :chatMessages = "this.fetchUserSingleMessages"></ChatBody>
        <NewChat v-if="!chatMode"></NewChat>
        <!-- <router-view /> -->
      </q-page-container>

      <q-footer v-if="chatMode">

                        <p class="q-pl-md text-green-7" v-if="showTyping">User Typing...</p>


 <form action="" method="post" name="txtBox" id="txtBox" target="sidePane">
        <!-- <q-input rounded  dense class="" bg-color="white" v-model="message" placeholder="Translated Text" /> -->
      <input v-model="text" type="text" id="box2" onclick="$('#box2').select()" placeholder="Translated Text" value="type" disabled/>

        <q-toolbar class="bg-grey-3 text-black row">
          
          <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />

          <!-- <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" /> -->
                <input @keydown="startTyping" @keyup="stopTyping" v-on:keyup.enter = "sendChatMessage" v-model="message" type="text" id="box1" placeholder="Text" value="" onkeyup="startText();"/>

        
          <q-btn round flat icon="mic" />
        </q-toolbar>
          </form>
      </q-footer>
    </q-layout>
  </div>

     
    <!-- <form action="" method="post" name="txtBox" id="txtBox" target="sidePane"> -->

      <!-- <input type="text" id="box1" placeholder="Text" value="" onkeyup="startText();"/> -->
      <!-- <input v-model="text" type="text" id="box2" onclick="$('#box2').select()" placeholder="Translated Text" value="type" disabled/> -->


      <!-- Original One -->

      <!-- <textarea cols="100%" rows="10" name="box1" id="box1" onkeyup="startText();startTextSf();">සිංහල අකුරු භාවිතය</textarea>
      <textarea cols="100%" rows="10" readonly="" name="box2" id="box2" onclick="$('#box2').select()" style=""></textarea> -->

    <!-- </form> -->


</q-page>
    
</template>

<script>

import ChatBody from 'components/ChatBody';
import NewChat from 'components/NewChat';
import { mapGetters, mapActions } from "vuex";
import io from 'socket.io-client';

var socket = io.connect(process.env.SOCKET_URL);



export default {
 data () {
    return {
      leftDrawerOpen: false,
      chatMode: false,
      // chatConversationId: null,
      search: '',
      message: '',
      text:'',
      authUserId: null,
      chatConvId: null,
      isTyping: false,
      showTyping: false,
      currentConversationIndex: 0,
      conversations: [
        {
          id: 1,
          person: 'Razvan Stoenescu',
          avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
          caption: 'I\'m working on Quasar!',
          time: '15:00',
          sent: true
        },
        {
          id: 2,
          person: 'Dan Popescu',
          avatar: 'https://cdn.quasar.dev/team/dan_popescu.jpg',
          caption: 'I\'m working on Quasar!',
          time: '16:00',
          sent: true
        },
        {
          id: 3,
          person: 'Jeff Galbraith',
          avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
          caption: 'I\'m working on Quasar!',
          time: '18:00',
          sent: true
        },
        {
          id: 4,
          person: 'Allan Gaunt',
          avatar: 'https://cdn.quasar.dev/team/allan_gaunt.png',
          caption: 'I\'m working on Quasar!',
          time: '17:00',
          sent: true
        }
      ]
    }
  },


  computed: {

    api () { return process.env.API_URL},

    currentConversation () {
      return this.fetchAuthChatUsers[this.currentConversationIndex]
    },
    style () {
      return {
        height: this.$q.screen.height + 'px'
      }
    },

     ...mapGetters({
    
      fetchUsers: "chatdetails/fetchUsers",
      fetchUserSingleMessages: "chatdetails/fetchUserSingleMessages",  
      fetchAuthChatUsers: "chatdetails/fetchAuthChatUsers",  
      fetchUserSingleMessagesCount: "chatdetails/fetchUserSingleMessagesCount",  
      user: "auth/user",  

    }),
  },

created() {

  this.getChatUsers();
  this.getAuthChats();
  this.attempt(localStorage.getItem('token'));


  if(this.user != null){
    this.authUserId = this.user._id;
  }


  var socket = io.connect(process.env.SOCKET_URL);

  socket.on('connect', () => {
    console.log("connected aa a");
  })

  socket.on('new message', (data) => {
    if(this.user._id == data.userId || this.user._id == data.partnerId){
      if(this.currentConversation.id !=null){
        this.getSingleMessages(this.currentConversation.id);
      }
      
    }
        
  });


  socket.on('typing', (data) => {
    
    if(this.user._id == data.username){
      if (data.username != null) {
        
      }else{
      
      }
    
    this.showTyping = true;
    }

        
  });

  socket.on('stop typing', (data) => {

    if(this.user._id == data.username){
      this.showTyping  = false;
      } 
  });

  socket.on('refresh conversation', (data) => {

    if(this.user._id == data.partnerId){
      console.log('refreshed');
      this.getAuthChats();
    } 
  });

  

  // startTextSf();

},

  methods: {
    ...mapActions({
      getChatUsers: 'chatdetails/getChatUsers',
      getAuthChats: 'chatdetails/getAuthChats',
      getSingleMessages: "chatdetails/getSingleMessages",  
      createChatMessages: "chatdetails/createChatMessages",  
      attempt: "auth/attempt",  
    }),
    

    fetchChatMessages(index,chatId){
      // this.chatConversationId = chatId;
      this.chatConvId = chatId;
      this.chatMode = true;
      this.currentConversationIndex = index;
      console.log(this.fetchAuthChatUsers[index]);

      this.getSingleMessages(chatId);


    },


    startTyping(){
      setTimeout(() => {
          this.isTyping = true;
      }, 2000);
    },

    stopTyping(){
      
    },

     sendChatMessage(){
      
      let form =  {
          chat_conversation_id: this.currentConversation.id,
          receiver_id: (this.currentConversation.user_id == this.user._id) ? this.currentConversation.partner_id : this.currentConversation.user_id,
          // message: $('#box2').val(),
          message: this.message,
      
      };

      // console.log(form.receiver_id);

      let createMessage =  this.createChatMessages(form).then(() => {

        this.getSingleMessages(this.currentConversation.id);
      })
            

      if(createMessage){
        this.message = '';
        this.text = '';

        socket.emit('new message',this.user._id,form.receiver_id);

       
       

          // this.sendNewMessageToServer();
      }

      this.getSingleMessages(this.currentConversation.id);

      if(this.fetchUserSingleMessagesCount < 1){
        socket.emit('refresh conversation',form.receiver_id);
      }

      // this.getSingleMessages(this.currentConversation.id);

    


           
    },
  },

  mounted(){
    this.$root.$on("clickChatUser", text=>{

      this.getChatUsers();
      this.getAuthChats();
      this.attempt(localStorage.getItem('token'));

      this.chatMode = true;

      //Check this loop for performance
      for (let index = 0; index < this.fetchAuthChatUsers.length; index++) {
        if(this.fetchAuthChatUsers[index].id == text){
          this.currentConversationIndex = index;
          this.getSingleMessages(text);
        }
        
      }

      
    });
  },


watch:{


   user: function () {

     this.authUserId = this.user._id;
  
     
    },


     isTyping: function (val) {
       if(val){


           setTimeout(() => {
            
                //Check whether the user id is same on database partner id
                //Then pass user id else pass partner id
                var partnerId =  (this.currentConversation.user_id == this.user._id) ? this.currentConversation.partner_id : this.currentConversation.user_id;
                if(partnerId == this.authUserId){
                 
                    socket.emit('typing',this.user_id);

                }else{
                   
                    socket.emit('typing',partnerId);

                }

            }, 100);

           setTimeout(() => {
                this.isTyping = false;

                var partnerId =  (this.currentConversation.user_id == this.user._id) ? this.currentConversation.partner_id : this.currentConversation.user_id;



                 //Check whether the user id is same on database partner id
                //Then pass user id else pass partner id
                if(partnerId == this.authUserId){
                   
                    socket.emit('stop typing',this.user_id);


                }else{
                    
                    socket.emit('stop typing',partnerId);


                }

               
            }, 3000);
       }
       
      },
 
},

components:{
  ChatBody:ChatBody,
  NewChat:NewChat
}

}

</script>

<style lang="sass">
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px
  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    background-color: #009688
  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: 5px
  &__field.q-field--outlined .q-field__control:before
    border: none
  .q-drawer--standard
    .WAL__drawer-close
      display: none
@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0
@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none
.conversation__summary
  margin-top: 4px
.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>