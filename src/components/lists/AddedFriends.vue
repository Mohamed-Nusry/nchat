<template>
  <q-list>
        <q-item
            v-for="(friendRequest, index) in fetchAcceptedFriendRequests"
            :key="friendRequest.id"
            clickable
            v-ripple
           
        >
            <q-item-section avatar>
                <!-- <p>{{friendRequest}}</p> -->
            <!-- <q-avatar>
                <img :src="api + `/uploads/users/${friendRequest.avatar}`">
            </q-avatar> -->

            <q-avatar v-if="friendRequest.user_id == user._id" >
              <!-- <img :src="currentConversation.avatar"> -->
               <img :src="api + `/uploads/users/${friendRequest.receiver_avatar}`">
            </q-avatar>
            <q-avatar v-else>
              <!-- <img :src="currentConversation.avatar"> -->
               <img :src="api + `/uploads/users/${friendRequest.avatar}`">
            </q-avatar>

            </q-item-section>

            <q-item-section>
                


            <q-item-label lines="1" v-if="friendRequest.user_id == user._id">
                {{ friendRequest.receiver_firstname}} {{friendRequest.receiver_lastname }}
            </q-item-label>

            <q-item-label lines="1" v-else>
                {{ friendRequest.first_name}} {{friendRequest.last_name }}
            </q-item-label>

            <q-item-label class="friendRequest__summary" caption>
                <q-icon name="check" v-if="friendRequest.sent" />
                <q-icon name="not_interested" v-if="friendRequest.deleted" />
                {{ friendRequest.caption }}
            </q-item-label>
            </q-item-section>

            <q-item-section side>
            <q-item-label caption>
                {{ friendRequest.time }}
            </q-item-label>
             <q-btn @click="startChat(friendRequest)" color="green" label="Start Chat" />

            <!-- <q-icon name="keyboard_arrow_down" /> -->
            </q-item-section>
        </q-item>
    </q-list>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    props:['fetchUsers'],

    created(){
        this.getFriendRequests();
        this.attempt(localStorage.getItem('token'));

    },


    methods:{

        startChat(friend){
            

            let form = {
                partnerId : (friend.user_id == this.user._id ? friend.partner_id : friend.user_id),
            }

            this.createChatDetails(form).then(() => {
                // console.log()

                setTimeout(() =>{
                    this.$root.$emit("clickChatUser",this.fetchCreatedChatDetails.id)
                })
                // this.$router.push('/chat')
            })

            // console.log(friend);
        },
        

         ...mapActions({
            getFriendRequests: "friendrequests/getFriendRequests",  
            createChatDetails: "chatdetails/createChatDetails",  
            attempt: "auth/attempt",  


        }),
    },


    computed: {

        api () { return process.env.API_URL},

    ...mapGetters({
    //   isLoggedIn: "auth/isLoggedIn",
    //   user: "auth/user",
         fetchAcceptedFriendRequests: "friendrequests/fetchAcceptedFriendRequests",  
         fetchCreatedChatDetails: "chatdetails/fetchCreatedChatDetails",  
         user: "auth/user",  


      
    }),
  },



}
</script>

<style>

</style>