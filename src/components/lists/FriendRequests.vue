<template>
<q-page>
 <div v-for="(friendRequest, index) in fetchPendingFriendRequests" :key="friendRequest.id">
  <q-list>
        <q-item
            v-if="friendRequest.user_id != user._id"
            clickable
            v-ripple
           
        >
       
            <q-item-section avatar>
            <q-avatar>
                <img :src="api + `/uploads/users/${friendRequest.avatar}`">
            </q-avatar>
            </q-item-section>

            <q-item-section>
            <q-item-label lines="1">
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
             <q-btn @click="acceptRequest(friendRequest)" color="green" label="Accept Request" />

            <!-- <q-icon name="keyboard_arrow_down" /> -->
            </q-item-section>
        
        </q-item>
    </q-list>
    </div>
</q-page>
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

        acceptRequest(friend){
            let form = {
                partnerId : friend._id,
                status : 1
            }

            this.updateFriendRequest(form).then(() => {
                // console.log('Loggedin')
                // this.$router.push('/chat')
            })

            // console.log(friend);
        },
        

         ...mapActions({
            getFriendRequests: "friendrequests/getFriendRequests",  
            updateFriendRequest: "friendrequests/updateFriendRequest",  
            attempt: "auth/attempt",  


        }),
    },


    computed: {

        api () { return process.env.API_URL},

    ...mapGetters({
    //   isLoggedIn: "auth/isLoggedIn",
    //   user: "auth/user",
         fetchFriendRequest: "friendrequests/fetchFriendRequest",  
         fetchPendingFriendRequests: "friendrequests/fetchPendingFriendRequests",  
         user: "auth/user",  


      
    }),
  },



}
</script>

<style>

</style>