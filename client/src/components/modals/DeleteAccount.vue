<template>
   <transition name="modal">
    <div class="modal-mask" :dark="isDeleted">
      <div class="modal-wrapper">
        <div class="modal-container-delete">
          <span class="modal-close" @click="isDeleted ? $router.push('/') : $emit('close')"><i class="fas fa-times"></i></span>
          <div class="modal-header m-0 p-0">
            <img class="modal-image m-auto p-0" src="@/assets/logo-brain.svg" alt="cerebellum">
          </div>
          <div class="modal-body m-0 p-0">
            <h1 class="home-header text-center m-auto py-4">{{ isDeleted ? 'Account Deleted' : 'Delete Account' }}</h1>
            <h4 v-if="isGuest" class="home-body text-center m-auto pb-4">Sorry.  You may not delete the guest account.</h4>
            <h4 v-else-if="!isDeleted" class="home-body text-center m-auto pb-4">Are you sure?</h4>
            <form id="delete-form">
              <div class="form-group">
                <input
                  v-validate="'required'"
                  v-model="password"
                  name="password"
                  type="password"
                  class="form-control modal-field"
                  placeholder="password"
                  :disabled="isGuest"
                />
                <!-- <small class="home-body">{{ errors.first('password') }}</small> -->
              </div>
            </form>
            <div class="text-center">
              <small class="home-body" v-html="message" id="del-form-mes"></small>
            </div>
          </div>
          <div class="modal-footer">
            <button v-if="isDeleted" class="btn btn-primary modal-remove-button" @click.prevent="$router.push('/')" type="submit" form="delete-form">OK</button>
            <button v-else class="btn btn-danger modal-remove-button" @click.prevent="removeAccount()" :disabled="errors.any() || isEmpty" type="submit" form="delete-form">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </transition> 
</template>

<script>
import api from '../../utils/api.js';
export default {
  props: ['isGuest'],
  data() {
    return {
      password: '',
      // message: 'All data will be lost but any saved posts will still be available to their respective users',
      // Suggested alternative:
      message: 'All of your account information including posts will be lost. However, users who have saved your posts will still be able to view those posts.',
      isDeleted: false
    }
  },
  methods: {
      removeAccount(){
        api.currentUser.deleteAccount(this.password)
          .then(res => {
            if (res.data.n === 1) {
              this.message = 'Your account has been deleted.';
              this.isDeleted = true;
            } else {
              this.message = 'Unable to delete account.<br>Make sure that you have entered your password correctly.';
            }
          });
      }
  },
  computed: {
    isEmpty() {
      return !this.password;
    }
  }
}
</script>

<style>
.modal-image {
  width: 95px;
}
input.modal-field{
  background-color: rgb(133,149,149);
  border: 1px solid #ffffff;
  border-radius: 100px;
  text-align: center;
  color: white;
  font-family: roboto, sans-serif;
}
input.modal-field::placeholder {
  color: white !important;
  text-align: center;
  font-family: roboto, sans-serif;
}
input.modal-field:focus::placeholder {
  opacity: 0;
}
input.modal-field:focus {
  background-color: white;
  text-align: center;
  color: black;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  font-family: roboto, sans-serif;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-mask[dark="true"] {
  background-color: rgba(0, 0, 0, 0.85);
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container-delete {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #859595 !important;
  border-radius: 25px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: roboto, sans-serif;
  max-width: 100vw;
}

.modal-header {
  margin-top: 0;
  border: none !important;
  clear: both;
  display: block;
  text-align: center !important;
  letter-spacing: 2px;
  font-weight: 100;
}

#del-form-mes {
  font-size: 15.5px;
}

.modal-footer {
  border: none !important;
}
.modal-body {
  margin: 20px 0;
  border: none !important;
}

.modal-remove-button {
    margin: auto;
    width: 150px;
    height: 40px;
    border-radius: 100px !important;
    color: white;
    font-family: roboto, sans-serif;
    font-size: 20px;
    letter-spacing: 2px;
    font-weight: 100;

}
.modal-enter {
  opacity: 0;
}
.modal-close {
  float: right;
  color: white;
  cursor: pointer;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
