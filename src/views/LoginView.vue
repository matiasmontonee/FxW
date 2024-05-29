<template>
  <div class="flex h-screen">
    <div class="bg-blue-500 w-1/2 text-white text-center">
      <h1 class="text-5xl mt-12 font-semibold">Iniciar Sesión</h1>
      <p class="underline text-xl mt-4 hover:text-gray-200 cursor-pointer mx-40 text-left">Crear Cuenta Gratis</p>
      <div id="login" class="mx-40">
        <GoogleLogin :callback="callback" prompt auto-login class="my-8"></GoogleLogin>
        
        <form method="POST" class="flex flex-col items-cener">
          <label for="email" class="mb-1 text-lg text-left">Email</label>
          <input type="email" name="email" class="h-12 rounded-md mb-4 text-black px-2" required />
          <label for="password" class="mb-1 text-lg text-left">Contraseña</label>
          <input type="password" name="password" class="h-12 rounded-md mb-4 text-black px-2" required />
          <p class="underline hover:text-gray-200 cursor-pointer mb-4 text-left">Olvidé mi contraseña</p>
          <button class="bg-blue-400 p-2 rounded-md hover:bg-blue-300 font-bold">Iniciar Sesión</button>
        </form>
      </div>
    </div>

    <div class="bg-white w-1/2">
      <img src="../assets/img/fxwbanner-2.png" alt="FxW Logo" class="w-2/4 mx-auto mt-12 mb-8">
      <p class="text-4xl text-blue-600 text-center font-bold mx-12 mb-4">Firmá todos tus documentos desde cualquier lugar con <span class="text-red-400">Firma por WhatsApp</span></p>
      <p class="text-4xl text-blue-500 text-center font-bold mx-8 mb-4">Simple. Rápido. Legal.</p>
      <img src="../assets/img/login.png" alt="FxW Logo" class="w-1/4 mx-auto">
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
