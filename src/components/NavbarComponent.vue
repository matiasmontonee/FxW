<template>
    <div v-if="sidebarOpen" @click="toggleSidebar" class="lg:hidden fixed inset-0 bg-black opacity-50 z-10"></div>

    <!-- SIDEBAR -->
    <aside v-if="sidebarOpen" class="bg-white pt-4 lg:mt-24 lg:ml-12 w-56 flex-shrink-0 absolute inset-y-0 left-0 transform transition-transform z-20" :class="{ '-translate-x-full': !sidebarOpen }">
      <div class="flex flex-col h-full border-r border-gray-300">
        <div class="flex items-center lg:hidden">
          <a href="">
            <img src="../assets/img/fxwbanner.png" alt="Logo de fxw" class="h-14 pr- w-48 object-cover">
          </a>
          <i class="fas fa-times text-xl cursor-pointer" @click="toggleSidebar"></i>
        </div>
        <router-link to="/requests" :class="{'bg-blue-200': $route.path === '/requests', 'border-blue-500 rounded-l-xl border-r-4 text-blue-700 font-bold': $route.path === '/requests', 'hover:bg-blue-200 hover:rounded-xl': $route.path !== '/requests'}" class="mr-1 p-2 mb-2 ml-2 mt-4 lg:mt-0 break-all">
          <i class="fas fa-tasks mr-2"></i> Solicitudes
        </router-link>
        <router-link to="/download" :class="{'bg-blue-200': $route.path === '/download', 'border-blue-500 rounded-l-xl border-r-4 text-blue-700 font-bold': $route.path === '/download', 'hover:bg-blue-200 hover:rounded-xl': $route.path !== '/download'}" class="mr-1 p-2 mb-2 ml-2 break-all">
          <i class="fas fa-download mr-2"></i> Descargar reportes
        </router-link>
        <router-link to="/dashboard" :class="{'bg-blue-200': $route.path === '/dashboard', 'border-blue-500 rounded-l-xl border-r-4 text-blue-700 font-bold': $route.path === '/dashboard', 'hover:bg-blue-200 hover:rounded-xl': $route.path !== '/dashboard'}" class="mr-1 p-2 mb-2 ml-2 break-all">
          <i class="fas fa-chart-bar mr-2"></i> Dashboard
        </router-link>
        <router-link to="/contact" :class="{'bg-blue-200': $route.path === '/contact', 'border-blue-500 rounded-l-xl border-r-4 text-blue-700 font-bold': $route.path === '/contact', 'hover:bg-blue-200 hover:rounded-xl': $route.path !== '/contact'}" class="mr-1 p-2 mb-2 ml-2 break-all">
          <i class="fas fa-user mr-2"></i> Contacto
        </router-link>
        <router-link to="/settings" :class="{'bg-blue-200': $route.path === '/settings', 'border-blue-500 rounded-l-xl border-r-4 text-blue-700 font-bold': $route.path === '/settings', 'hover:bg-blue-200 hover:rounded-xl': $route.path !== '/settings'}" class="mr-1 p-2 mb-2 ml-2 break-all">
          <i class="fas fa-cog mr-2"></i> Ajustes
        </router-link>
        <router-link to="/help" class="pt-4 mx-4 border-t border-gray-300">
          <button class="border border-blue-500 text-blue-500 hover:bg-blue-200 font-semibold rounded-lg w-full p-1">¿Necesitas ayuda?</button>
        </router-link>
      </div>
    </aside>
    
    <!-- NAVBAR -->
    <header class="py-4 px-4 lg:px-12 border-b border-gray-300">
      <nav class="flex flex-row justify-between items-center">
        <!-- DESKTOP -->
        <a href="">
          <img src="../assets/img/fxwbanner.png" alt="Logo de fxw" class="hidden lg:flex h-10 w-32 object-cover">
        </a>

        <div class="flex items-center">
          <router-link to="/requests">
            <button class="hidden lg:flex bg-blue-600 hover:bg-blue-800 text-white font-semibold py-1 px-6 rounded-xl">Crear documento</button>
          </router-link>
          <div class="relative ml-4">
            <div :class="{'bg-gray-200': showDropdown}" class="hidden lg:flex items-center hover:bg-gray-200 py-1 px-2 rounded-xl cursor-pointer" @click="toggleDropdown">
              <p v-if="user" class="mr-2">{{user.email}}</p>
              <i class="fas fa-caret-down text-lg"></i>
            </div>
            <div v-show="showDropdown" class="hidden lg:block absolute lg:right-0 lg:mt-5 w-80 bg-white rounded-md shadow-2xl z-10">
                <ul>
                  <li class="flex items-center bg-gray-200 p-2 mb-1 rounded-t-md"><img v-if="user" :src="user.picture" alt="User Picture" class="rounded-full h-5 w-4.5 mr-2"><span v-if="user">{{ user.name.split(' ')[0] }}</span></li>
                  <li><button class="hover:bg-gray-200 p-2 w-full text-left"><i class="fas fa-user-circle mr-2 text-xl"></i>Mi perfil</button></li>
                  <li><button @click="logout" class="hover:bg-gray-200 rounded-b-md p-2 w-full text-left"><i class="fas fa-sign-out-alt mr-2 text-xl"></i>Cerrar sesión</button></li>
                </ul>
            </div>
          </div>
        </div>

        <!-- TABLET Y MOBILE -->
        <div class="lg:hidden flex justify-between w-full">
          <button @click="toggleSidebar" class="block lg:hidden rounded"><i class="fas fa-bars text-2xl"></i></button>
          <div class="flex items-center">
            <router-link to="/requests">
              <button class="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-1 px-6 rounded-xl mr-4">Crear documento</button>
            </router-link>
            <div class="items-center py-1 px-2 rounded-xl cursor-pointer" @click="toggleDropdown">
              <i class="fas fa-user text-2xl"></i>
            </div>
            <div v-show="showDropdown" class="lg:hidden absolute right-5 mt-52 w-64 bg-white rounded-md shadow-2xl z-10">
                <ul>
                  <li class="flex items-center bg-gray-200 p-2 mb-1 rounded-t-md"><img v-if="user" :src="user.picture" alt="User Picture" class="rounded-full h-5 w-4.5 mr-2"><span v-if="user">{{ user.name.split(' ')[0] }}</span></li>
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
