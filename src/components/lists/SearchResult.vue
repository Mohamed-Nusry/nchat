<template>
    <q-page>
        <p v-if="this.fetchUsers != null && this.fetchUsers.length > 0 " >Results Found {number}</p>
        <p v-else> No Results Found</p>
   

  <q-list>
        <q-item
            v-for="(conversation, index) in fetchUsers"
            :key="conversation.id"
            clickable
            v-ripple
           
        >
        <div v-for="(userRequested, index) in fetchFriendRequest" :key="userRequested.id">
            <q-item-section avatar>
            <q-avatar>
                <img :src="api + `/uploads/users/${conversation.avatar}`">
            </q-avatar>
            </q-item-section>

            <q-item-section>
            <q-item-label lines="1">
                {{ conversation.first_name}} {{conversation.last_name }}
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
            <!-- {{conversation._id}} -->
            <q-btn v-if="conversation._id == user._id"  color="blue-5" label="Its you" />
             <q-btn v-else-if="conversation._id == userRequested.user_id || conversation._id == userRequested.partner_id && userRequested.status == 0"  color="red" label="Already Requested" />
             <q-btn v-else-if="conversation._id == userRequested.user_id || conversation._id == userRequested.partner_id && userRequested.status == 1"  color="green" label="Friends" />
            
             <q-btn v-else @click="sendRequest(conversation)" color="blue" label="Send Request" />

              

            <!-- <q-icon name="keyboard_arrow_down" /> -->
            </q-item-section>
            </div>
        </q-item>
    </q-list>
     </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    props:['fetchUsers'],

    created() {
        this.attempt(localStorage.getItem('token'));
        this.getFriendRequests();	
    },

    methods:{
        sendRequest(friend){
           
            let form = {
                partnerId : friend._id,
                status : 0
            }

            this.createFriendRequest(form).then(() => {
                // console.log('Loggedin')
                // this.$router.push('/chat')
            })

            // console.log(friend);
        },

         ...mapActions({
            createFriendRequest: "friendrequests/createFriendRequest",  
            attempt: "auth/attempt",  
            getFriendRequests: "friendrequests/getFriendRequests",  
        }),
    },


    computed: {

        api () { return process.env.API_URL},

    ...mapGetters({
    //   isLoggedIn: "auth/isLoggedIn",
    //   user: "auth/user",
        user: "auth/user",  
        fetchFriendRequest: "friendrequests/fetchFriendRequest",  
      
    }),
  },



}
</script>

<style>

</style>