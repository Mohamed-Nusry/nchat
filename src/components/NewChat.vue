<template>
  <div class=" row justify-center">
    <div class="col">
      


         <!-- <q-card> -->
        <q-tabs
          v-model="tab"
          class="bg-black text-white"
          align="justify"
          narrow-indicator
        >
          <q-tab name="addFriend" label="Add Friend" />
          <q-tab name="friendRequests" label="Friend Requests" />
          <q-tab name="friends" label="Friends" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="">
          <q-tab-panel name="addFriend">
            <div class="text-h6" >
              <p class="text-center">Add Friend</p>
              <p class="q-pt-md text-left">Enter Email or Username to find your friend</p>
              <q-input outlined v-model="searchText" label="Email or Username" />
               <q-btn @click="searchFriend" color="purple" label="Search Friend" style="float:right; left:-1rem; top:-3rem" />

               

               
            </div>

            <div class="search_results q-pt-lg" >
              

              <SearchResult v-if="this.getSearchUserResult != null " :fetchUsers = "this.getSearchUserResult"></SearchResult>
           
            </div>

            
     
              
          </q-tab-panel>

          <q-tab-panel name="friendRequests" class="">

             <div class="text-h6" >
              <p class="text-center">Friend Requests</p>

                <FriendRequests :fetchUsers = "this.getSearchUserResult"></FriendRequests>

         
            </div>

          </q-tab-panel>



          <q-tab-panel name="friends">
             <div class="text-h6" >
              <p class="text-center">Friends</p>

                <AddedFriends :fetchUsers = "this.getSearchUserResult"></AddedFriends>

         
            </div>

          </q-tab-panel>

        </q-tab-panels>
      <!-- </q-card> -->




    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchResult from './lists/SearchResult';
import FriendRequests from './lists/FriendRequests';
import AddedFriends from './lists/AddedFriends';


export default {
  props: [''],
    data(){
      return{
        tab: 'addFriend',
        searchText: ''
      }
    },

    computed: {

      api () { return process.env.API_URL},

    

    ...mapGetters({
      getSearchUserResult: "user/getSearchUserResult",
    }),

    


  },


  watch: {

    

   
  },

  created(){

   
  
      
    
  },

   methods:{

     searchFriend(){
       let formData = {
         'search' : this.searchText
       }

       this.searchUsers(formData);

     },

     ...mapActions({
       
        searchUsers: 'user/searchUsers',
        
    }),

 

  },

  components:{
    SearchResult:SearchResult,
    FriendRequests:FriendRequests,
    AddedFriends:AddedFriends
  }

  

}
</script>

<style>

</style>