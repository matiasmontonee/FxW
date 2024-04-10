<template>
  <div>
    <NavbarComponent :user="user" @logout="logout" />

    <h2 class="text-center mt-4">Dashboard</h2>
  </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';

export default {
  emits: ['login','logout'],
  props: ['user'],
  components: {
    NavbarComponent
  },
  data() {
    return {
      sidebarOpen: false,
    };
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }
}
</script>
