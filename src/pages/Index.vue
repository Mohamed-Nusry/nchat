<template>
  <div>
    <ul v-for="(user,index) in userData.data" :key="index">
      <li>{{user.first_name}}</li>
    </ul>

    <pagination :data="userData" @pagination-change-page="getPaginatedData"></pagination>
  </div>

  
</template>

<script>

import Vue from 'vue'
Vue.component('pagination', require('laravel-vue-pagination'));

export default {
  name: 'PageIndex',

  data () {
    return {
      userData: [],
     
    }
  },

  created(){

    /* NOTE- If this.$axios not worked try just axios. */
     let response =  this.$axios.get("fetchusers").then(response => {
      console.log(response.data)

       this.userData = response.data;
     
       
      })
      .catch(error => {
        console.log('error messsage: ', error.message)
      
      })
  
  },

  methods:{

    getPaginatedData(page = 0){
      /* NOTE- If this.$axios not worked try just axios. */
      let response =  this.$axios.get("fetchusers?page="+page).then(response => {

       this.userData = response.data;
       
      })
      .catch(error => {
        console.log('error messsage: ', error.message)
      
      })

    }
   
  }
}
</script>

<style>

.pagination{
    list-style: none;
    display: flex;
}

.pagination > li {
  padding-right : 10px;
}

</style>