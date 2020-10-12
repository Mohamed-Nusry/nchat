<template>
  <div class="q-pa-md row justify-center">
    <div class="col">
      

      <q-scroll-area
      ref="chatArea"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 60vh; max-width: 100%;"
    >
      <!-- <div v-for="n in 100" :key="n" class="q-pa-xs">
        Lorem ipsum dolor sit amet, consectetur adipisicing
        elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua.
      </div> -->

      
 

      <div v-for="(ConversationMessages,index) in chatMessages" :key="index">
        <!-- {{ConversationMessages.created_at}} -->
        <q-chat-message
          :name="(user._id == ConversationMessages.sender_id) ? 'You' : ConversationMessages.sender_firstname + ' ' +  ConversationMessages.sender_lastname"
          :avatar="api + `/uploads/users/${ConversationMessages.sender_avatar}`"
          :text="[ConversationMessages.message]"
          :stamp="messageDurations(ConversationMessages.created_at)"
          text-color=""
          bg-color="alert"
          :sent="user._id == ConversationMessages.sender_id ? 'sent' : null"
        />

      </div>
    
   </q-scroll-area>

   <!-- <q-btn @click="scrolldown">abc</q-btn> -->
      <!-- {{this.user}} -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ['chatMessages','chatConversationId','scrollToDown'],
    data(){
        return{
            // username:'me',
            // chatMessages:['hey, how are you?'],
            // avatar:'https://cdn.quasar.dev/img/avatar1.jpg',
            // status:'sent'

        thumbStyle: {
          right: '4px',
          borderRadius: '5px',
          backgroundColor: '#027be3',
          width: '5px',
          opacity: 0.75
        },

        barStyle: {
          right: '2px',
          borderRadius: '9px',
          backgroundColor: '#027be3',
          width: '9px',
          opacity: 0.2
        }
      }
    },

    computed: {

        api () { return process.env.API_URL},

      status(id){
        return 'sent'
      },

    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
      user: "auth/user",
      
    }),

    


  },


  watch: {

    chatMessages: function () {

       setTimeout(() => {       
       this.$refs.chatArea.setScrollPosition(this.$refs.chatArea.$el.scrollHeight + 10000, 1);
      }, 2000);
     
    },

   
  },

  created(){

   
    // if(this.$refs.chatArea.setScrollPosition != this.$refs.chatArea.$el.scrollHeight){
      setTimeout(() => {       
       this.$refs.chatArea.setScrollPosition(this.$refs.chatArea.$el.scrollHeight + 10000, 1);
      }, 5000);
    // }
      
    
  },

   methods:{
     ...mapActions({
        getSingleMessages: "chatdetails/getSingleMessages",  
    }),

    scrolldown(){
      //  this.$refs.chatArea.setScrollPosition(10);
       this.$refs.chatArea.setScrollPosition(this.$refs.chatArea.$el.scrollHeight + 10000, 1);
    },

    //calculate stamp duration for each message
    messageDurations(createdAt){
     

     //take message sent date and time
      var date1 = new Date(createdAt); 
      //take date of now
      var date2 = new Date(); 
        
      // To calculate the time difference of two dates 
      var Difference_In_Time = date2.getTime() - date1.getTime(); 
        
      // To calculate the no. of days between two dates 
     var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

    //Round the results
     var round_days = Math.round(Difference_In_Days);

      //check whether days are less than 0
     if(round_days <= 0){
       //if so show calculate duration in hours
        var Difference_In_Hours = Difference_In_Time / (1000 * 60 * 60); 

        var round_hours = Math.round(Difference_In_Hours);

         //check whether hours are less than 0
        if(round_hours <= 0){
           //if so show calculate duration in minutes
          var Difference_In_Minutes = Difference_In_Time / (60000); 

          var round_minutes = Math.round(Difference_In_Minutes);

       //check whether minutes are less than 0
          if(round_minutes <= 0){
            //if so return just now
            return 'just now';

          }else{
           //else return in minutes
            return round_minutes + ' minutes ago ';
          }
        //else return in hours
        }else{
            return round_hours + ' hours ago ';
        }
      //else return in days
     }else{

      return round_days + ' days ago ';

     }


    }
   

  }

  

}
</script>

<style>

</style>