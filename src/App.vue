<template>
  <div>
    <router-view :user="user" @login="handleLogin" @logout="handleLogout" />
  </div>
</template>

<!-- TODO: Considerar en eliminar localSroage por seguridad y buena practica -->
<script>
import { setCookie, eraseCookie} from './helpers/cookies';

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || null // Recuperar el usuario del almacenamiento local al cargar la aplicación
    };
  },
  methods: {
    handleLogin(userData) {
      this.user = userData;
      setCookie('user', JSON.stringify(userData.email), 7); // Save mail as cookie
      localStorage.setItem('user', JSON.stringify(userData)); // Almacenar el usuario en el almacenamiento local
      this.$router.push('/requests'); 
    },
    handleLogout() {
      this.user = null;
      eraseCookie('user');
      localStorage.removeItem('user'); // Eliminar el usuario del almacenamiento local al cerrar sesión
      this.$router.push('/login');
    }
  }
}
</script>
