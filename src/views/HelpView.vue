<template>
    <NavbarComponent :user="user" @logout="logout" />

    <h2 class="text-center mt-4">Ayuda</h2>
</template>

<script>
import { googleLogout } from 'vue3-google-login';
import NavbarComponent from '../components/NavbarComponent.vue';

export default {
  props: ['user'],
  components: {
    NavbarComponent
  },
  data() {
    return {
      sidebarOpen: false
    };
  },
  methods: {
    logout() {
      googleLogout();
      this.$emit('logout');
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }
}
</script>