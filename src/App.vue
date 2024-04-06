<template>
  <div>
    <router-view :user="user" @login="handleLogin" @logout="handleLogout" />
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     user: JSON.parse(localStorage.getItem('user')) || null // Recuperar el usuario del almacenamiento local al cargar la aplicación
  //   };
  // },
  // methods: {
  //   handleLogin(userData) {
  //     this.user = userData; 
  //     localStorage.setItem('user', JSON.stringify(userData)); // Almacenar el usuario en el almacenamiento local
  //     this.$router.push('/requests'); 
  //   },
  //   handleLogout() {
  //     this.user = null;
  //     localStorage.removeItem('user'); // Eliminar el usuario del almacenamiento local al cerrar sesión
  //     this.$router.push('/login');
  //   }
  // }
}
</script>
