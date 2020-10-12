<template>
<q-page>
  <q-pull-to-refresh @refresh="refresh">
  <div
    class="flex flex-center"
    style="margin-top:18vh;"
  >
    <div class="column">
      <div class="row justify-center q-pb-md">
        <img
          src="../../../assets/img/favicon.png"
          style="width:120px;height:130px;"
        >
      </div>
      <div class="row q-mt-sm">
        <q-form
          @submit.prevent="register"
          class="q-gutter-sm"
        >
          <q-card
            square
            bordered
            class="q-pa-lg shadow-3"
            style="width:360px;"
          >

            <q-card-section>
              <div class="text-center text-h5 text-grey-10 text-weight-bold">Register</div>
            </q-card-section>
            <q-card-section>

             <q-input
                outlined
                type="email"
                v-model="form.email"
                label="Email"
                :rules="[val => !!val || 'Field is required', val => val.length <= 50 || 'Please use maximum 50 characters']"
              />
        
              
              <q-input
                outlined
                v-model="form.first_name"
                label="First Name"
                :rules="[val => !!val || 'Field is required', val => val.length <= 20 || 'Please use maximum 20 characters']"
              />

              <q-input
                outlined
                v-model="form.last_name"
                label="Last Name"
                :rules="[val => !!val || 'Field is required', val => val.length <= 20 || 'Please use maximum 20 characters']"    
              />

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
                    :rules="[val => !!val || 'Field is required', val => val.length >= 8 || 'Password must be minimum 8 characters']"
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
                  label="Submit"
                  color="secondary"
                  type="submit"
                  class=""
                />

              </div>
                 
              
               <div>     
                <q-btn
                  unelevated
                  label="Login"
                  color="primary"
                  @click="loginView"
                  v-close-popup
                />
                </div>
             </div>

             <div class="row q-pt-lg flex-center">
               <div class="col-6">
                  <router-link class="text-grey-10" style="text-decoration: none !important;" :to="{ path: 'mobileworkerregister' }" >

                 <p>Become a Worker</p>
                  </router-link>
               </div>
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
      <h5 style="font-size:20px; margin-top:-10px;" class="text-white text-center">Developed By Zrilian Solutions</h5>
    </div>
  <!-- </div> -->
  </q-pull-to-refresh>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  data () {
    return {
      modal: false,
      isPwd: true,
      form: {
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
      }
    };
  },
  computed: {},
  mounted: function () {
    this.$root.$on("SignUpmodal", text => {
      this.modal = text;
    });
  },
  
  methods: {
    ...mapActions({
      registerUser: "auth/registerUser"
    }),
    register () {
      this.registerUser(this.form).then(() => {
        this.$router.push('/');
      });
    },
    close () {
      this.form.username = "";
      this.form.password = "";
    },


    loginView(){
      this.$router.push('/');
    },


    refresh (done) {
      setTimeout(() => {
        // this.items.push({}, {}, {}, {}, {}, {}, {})
        done()
      }, 1000)
    },
  }
};
</script>

<style>
</style>