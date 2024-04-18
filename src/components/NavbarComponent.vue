<template>
    <div v-if="sidebarOpen" @click="toggleSidebar" class="lg:hidden fixed inset-0 bg-black opacity-50 z-10"></div>

    <!-- SIDEBAR -->
    <aside v-if="sidebarOpen" class="bg-gray-800 text-gray-400 pt-4 h-full w-56 flex-shrink-0 absolute inset-y-0 left-0 transform transition-transform z-20" :class="{ '-translate-x-full': !sidebarOpen }" style="height: calc(127vh);">
      <div class="flex flex-col h-full px-2">
        <!-- <div class="flex items-center"> -->
          <a href="">
            <img src="../assets/img/fxwbanner.png" alt="Logo de fxw" class="mx-auto w-32 mt-4 mb-12">
          </a>
          <!-- <i class="fas fa-times text-xl cursor-pointer lg:hidden" @click="toggleSidebar"></i>
        </div> -->
        <div class="flex flex-col px-2 text-gray-100">
          <button class="flex flex-col items-center font-semibold rounded-2xl bg-blue-400 mb-2 hover:bg-blue-300">
            <span>Firmas</span>
            <span class="text-xl">15/100</span>
          </button>
          <button class="rounded-2xl bg-green-400 mb-16 hover:bg-green-300">Comprar pack</button>
        </div>
        <router-link to="/requests" :class="{'bg-blue-400': $route.path === '/requests', 'rounded-full text-white font-bold': $route.path === '/requests', 'hover:bg-blue-300 hover:rounded-full hover:text-white': $route.path !== '/requests'}" class="mr-1 p-2 mb-2 ml-2 mt-4 lg:mt-0 break-all">
          <i class="fas fa-home mr-2 p-1" :class="{'text-blue-400 bg-white rounded-full': $route.path === '/requests'}"></i> Solicitudes
        </router-link>
        <router-link to="/download" :class="{'bg-blue-400': $route.path === '/download', 'rounded-full text-white font-bold': $route.path === '/download', 'hover:bg-blue-300 hover:rounded-full hover:text-white': $route.path !== '/download'}" class="mr-1 p-2 mb-2 ml-2 break-all">
          <i class="fas fa-chart-line mr-2 p-1" :class="{'text-blue-400 bg-white rounded-full': $route.path === '/download'}"></i> Informes
        </router-link>
        <router-link to="/contact" :class="{'bg-blue-400': $route.path === '/contact', 'rounded-full text-white font-bold': $route.path === '/contact', 'hover:bg-blue-300 hover:rounded-full hover:text-white': $route.path !== '/contact'}" class="mr-1 p-2 mb-2 ml-2 break-all">
          <i class="fas fa-user mr-2 p-1" :class="{'text-blue-400 bg-white rounded-full': $route.path === '/contact'}"></i> Contactos
        </router-link>
        <router-link to="/settings" :class="{'bg-blue-400': $route.path === '/settings', 'rounded-full text-white font-bold': $route.path === '/settings', 'hover:bg-blue-300 hover:rounded-full hover:text-white': $route.path !== '/settings'}" class="mr-1 p-2 mb-16 ml-2 break-all">
          <i class="fas fa-cog mr-2 p-1" :class="{'text-blue-400 bg-white rounded-full': $route.path === '/settings'}"></i> Perfil
        </router-link>
        <button class="hover:text-gray-200 pt-20 mx-2 border-t border-gray-300 px-3 text-left mb-4">
          <i class="fas fa-user-circle mr-5"></i> 
          <span v-if="user">{{ user.name }}</span>
        </button>
        <button @click="logout" class="hover:text-gray-200 rounded-b-md px-5 text-left">
          <i class="fas fa-sign-out-alt mr-4 text-xl"></i>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
    
    <!-- NAVBAR -->
    <header class="py-6 px-4 lg:px-12 bg-gray-100">
      <nav class="flex flex-row justify-between items-center">
        <!-- DESKTOP -->
        <!-- <a href="">
          <img src="../assets/img/fxwbanner.png" alt="Logo de fxw" class="hidden lg:flex h-10 w-32 object-cover">
        </a> -->
        <div class="flex items-center ml-52">
          <i class="fas fa-bell mr-4 text-xl text-gray-500 relative"> <!-- Añadimos la clase relative -->
            <span class="absolute h-2 w-2 bg-red-500 rounded-full top-0.5 right-0"></span> <!-- Punto rojo -->
          </i>
          <p class="text-blue-400 text-sm">Status: Activo</p>
        </div>

        <div class="flex items-center">
          <router-link to="/newdocument">
            <button class="hidden lg:flex bg-blue-400 hover:bg-blue-500 text-white font-semibold py-0.5 px-4 rounded-full">
              <div class="flex items-center">
                <i class="fas fa-file-alt mr-2"></i>
                <p class="mt-0.5">Crear documento</p>
              </div>
            </button>
          </router-link>
          <!-- <div class="relative ml-4">
            <div :class="{'bg-gray-200': showDropdown}" class="hidden lg:flex items-center hover:bg-gray-200 py-1 px-2 rounded-xl cursor-pointer" @click="toggleDropdown">
              <p v-if="user" class="mr-2">{{user.email}}</p>
              <i class="fas fa-caret-down text-lg"></i>
            </div>
            <div v-show="showDropdown" class="hidden lg:block absolute lg:right-0 lg:mt-5 w-80 bg-white rounded-md shadow-2xl z-10">
                <ul>
                  <li class="flex items-center bg-gray-200 p-2 mb-1 rounded-t-md"><img v-if="user" :src="user.picture" alt="User" class="rounded-full h-5 w-4.5 mr-2"><span v-if="user">{{ user.name.split(' ')[0] }}</span></li>
                  <li><button class="hover:bg-gray-200 p-2 w-full text-left"><i class="fas fa-user-circle mr-2 text-xl"></i>Mi perfil</button></li>
                  <li><button @click="logout" class="hover:bg-gray-200 rounded-b-md p-2 w-full text-left"><i class="fas fa-sign-out-alt mr-2 text-xl"></i>Cerrar sesión</button></li>
                </ul>
            </div>
          </div> -->
        </div>

        <!-- TABLET Y MOBILE -->
        <div class="lg:hidden flex justify-between w-full">
          <button @click="toggleSidebar" class="block lg:hidden rounded"><i class="fas fa-bars text-2xl"></i></button>
          <div class="flex items-center">
            <router-link to="/newdocument">
              <button class="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-1 px-6 rounded-xl mr-4">Crear documento</button>
            </router-link>
            <div class="items-center py-1 px-2 rounded-xl cursor-pointer" @click="toggleDropdown">
              <i class="fas fa-user text-2xl"></i>
            </div>
            <div v-show="showDropdown" class="lg:hidden absolute right-5 mt-52 w-64 bg-white rounded-md shadow-2xl z-10">
                <ul>
                  <li class="flex items-center bg-gray-200 p-2 mb-1 rounded-t-md"><img v-if="user" :src="user.picture" alt="User" class="rounded-full h-5 w-4.5 mr-2"><span v-if="user">{{ user.name.split(' ')[0] }}</span></li>
                  <li><button class="hover:bg-gray-200 p-2 w-full text-left"><i class="fas fa-user-circle mr-2 text-xl"></i>Mi perfil</button></li>
                  <li><button @click="logout" class="hover:bg-gray-200 rounded-b-md p-2 w-full text-left"><i class="fas fa-sign-out-alt mr-2 text-xl"></i>Cerrar sesión</button></li>
                </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
</template>

<script>
import { googleLogout } from 'vue3-google-login';

export default {
  props: ['user'],
  data() {
    return {
      showDropdown: false,
      sidebarOpen: window.innerWidth >= 1024
    };
  },
  methods: {
    logout() {
      googleLogout();
      this.$emit('logout');
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    }
  }
}
</script>
