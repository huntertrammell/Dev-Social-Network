<template>
  <transition name="modal">
    <div class="modal-mask forgot-password">
      <div class="modal-wrapper">
        <div class="modal-container-login">
          <span class="modal-close" @click="$emit('close')"><i class="fas fa-times"></i></span>
          <div class="modal-header m-0 p-0">
            <img class="modal-image m-auto p-0" src="@/assets/logo-brain.svg" alt="cerebellum">
          </div>
          <div class="modal-body m-0 p-0">
            <h1 class="home-header m-auto py-4">Forget your password?</h1>
            <form id="reset-form">
              <div class="form-group">
                <input v-validate="'required'" v-model="email" name="email" type="email" class="form-control modal-field" placeholder="email">
                <small class="home-body">{{ errors.first('email') }}</small>
              </div>
            </form>
            <small class="home-body">{{ message }}</small>
          </div>
          <div class="modal-footer">
            <button class="btn btn-light modal-default-button" @click.prevent="forgotPassword" :disabled="errors.any() || isEmpty" type="submit" form="reset-form">Reset</button>
          </div>
        </div>
      </div>
    </div>
  </transition> 
</template>

<script>
import api from '../../utils/api.js';
export default {
  data() {
    return {
      email: '',
      message: ''
    }
  },
  methods: {
    forgotPassword() {
      api.auth.forgotPassword(this.email)
        .then(res => {
          const data = res.data;
          if (data.success) return this.message = data.success;
          if (data.error) return this.message = data.error;
        })
        .catch(err => this.message =
          (
            err && err.response && err.response.status === 403 &&
            'You may not reset the Guest Account password.'
          ) || (
            err && err.response && err.response.data.message
          ) || 'Unknown error.'
        );
    }
  },
  computed: {
    isEmpty() {
      return !this.email;
    }
  }
}
</script>

<style>
.modal-mask.forgot-password {
  z-index: 9999;
}
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

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container-login {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #859595 !important;
  border-radius: 25px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: roboto, sans-serif;
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
.modal-footer {
  border: none !important;
}
.modal-body {
  margin: 20px 0;
  border: none !important;
}

.modal-default-button {
    margin: auto;
    width: 150px;
    height: 40px;
    background: white;
    border-radius: 100px !important;
    color: black;
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
