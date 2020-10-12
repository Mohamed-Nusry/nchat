<template>
<q-page>
  <q-pull-to-refresh @refresh="refresh">
  <div
    class="flex flex-center"
    style="margin-top:18vh;"
  >
    <div class="column">
      <div class="row justify-center q-pb-md">
        <!-- <img
          src="../../../assets/img/favicon.png"
          style="width:120px;height:130px;"
        > -->
      </div>
      <div class="row q-mt-sm">
        <q-form
          @submit.prevent="login"
          class="q-gutter-sm"
        >
          <q-card
            square
            bordered
            class="q-pa-lg shadow-3"
            style="width:360px;"
          >

            <q-card-section>
              <div class="text-center text-h5 text-grey-10 text-weight-bold">Login</div>
            </q-card-section>
            <q-card-section>

              <q-input
                outlined
                v-model="form.username"
                label="Username"
                :rules="[val => !!val || 'Field is required', val => val.length <= 20 || 'Please use maximum 20 characters']"
              />
        
              <q-input
                ref="input"
                outlined
                v-model="form.password"
                label="Password"
                :type="isPwd ? 'password' : 'text'"
                :rules="[val => !!val || 'Field is required']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

            </q-card-section>
            <!-- <q-card-actions> -->
             <div class="flex flex-center">
               <div class="q-pr-md">                              
                <q-btn
                  outline
                  label="Log In"
                  color="secondary"
                  type="submit"
                  class=""
                />

              </div>
                 
              
               <div>     
                <q-btn
                  unelevated
                  label="Register"
                  color="primary"
                  @click="registerView"
                  v-close-popup
                />
                </div>
             </div>

             <div class="row q-pt-lg flex-center">
               <!-- <div class="col-6">
                  <router-link class="text-grey-10" style="text-decoration: none !important;" :to="{ path: 'mobileworkerregister' }" >

                 <p>Become a Worker</p>
                  </router-link>
               </div> -->
               <div class="co-6">
                 <p class="text-negative">Terms & Conditions</p>
               </div>
             </div>
            <!-- </q-card-actions> -->
          </q-card>
             <!-- <div class="bg-primary" style="width:100%; height:55px;">
               <br>
               <h5 style="font-size:20px; margin-top:-10px;" class="text-white text-center">Developed By Zrilian Solutions</h5>
             </div> -->
          
        </q-form>
        
      </div>
    </div>
      
  </div>
  <!-- <div> -->
    <div class="bg-primary" style="width:100%; height:55px;">
      <br>
      <h5 style="font-size:20px; margin-top:-10px;" class="text-white text-center">Developed By NSR Tech</h5>
    </div>
  <!-- </div> -->
  </q-pull-to-refresh>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data () {
    return {
      isPwd: true,
      modal: false,
      form: {
        email: "",
        password: ""
      }
    }
  },
  created(){

      if(this.isLoggedIn){
        console.log("logged");
        this.$router.push('/chat')
      }
  },
  methods: {
    ...mapActions({
      loginUser: 'auth/loginUser'
    }),

    close () {
      this.form.email = "";
      this.form.password = "";
    },

    login () {
      this.loginUser(this.form).then(() => {
        console.log('Loggedin')
        this.$router.push('/chat')
      })
    },

    
    refresh (done) {
      setTimeout(() => {
        // this.items.push({}, {}, {}, {}, {}, {}, {})
        done()
      }, 1000)
    },

    registerView(){
      this.$router.push('/register');
    }
  
  },

  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
      user: "auth/user",
      

    }),

  },

    watch: {
      
    // whenever isLoggedIn changes, this function will run
    isLoggedIn: function () {

    
      
     
    }
  },
}
</script>

<style>
</style>