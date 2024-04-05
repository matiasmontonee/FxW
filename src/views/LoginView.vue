<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 sm:p-0 p-8">
    <div class="bg-white border border-gray-300 rounded-lg max-w-md mx-auto">
      <div class="text-center">
        <img src="../assets/img/fxwbanner.png" alt="Login">
        <GoogleLogin :callback="callback" prompt auto-login class="mb-8"></GoogleLogin>
      </div>
    </div>
  </div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';

export default {
  methods: {
    callback(response) {
      const userData = decodeCredential(response.credential);
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData)); // Almacena los datos del usuario en el almacenamiento local
        this.$emit('login', userData);
      } else {
        console.error('Authentication failed');
      }
    }
  }
}
</script>