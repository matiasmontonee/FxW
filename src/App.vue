<template>
  <div>
    <router-view :user="user" @login="handleLogin" @logout="handleLogout" />
  </div>
</template>

<!-- TODO: Considerar en eliminar localSroage por seguridad y buena practica -->
<script>
import { setCookie, eraseCookie, getCookie} from './helpers/cookies';

async function createUser(email) {
  const response = await fetch(`http://localhost:3000/api/createUsrOnLogin/${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // TODO: Considerar en manejar errores de forma mas adecuada
  if (!response.ok) {
    throw new Error('Error creating user');
  }
}

export default {
  data() {
    return {
      // user: JSON.parse(localStorage.getItem('user')) || null // Recuperar el usuario del almacenamiento local al cargar la aplicación
      user: JSON.parse(getCookie('user')) || null // Recuperar el usuario del almacenamiento local al cargar la aplicación
    };
  },
  methods: {
    async handleLogin(userData) {
      this.user = userData;
      setCookie('user', JSON.stringify(userData.email), 7); // Save mail as cookie
      localStorage.setItem('user', JSON.stringify(userData)); // Almacenar el usuario en el almacenamiento local
      await createUser(userData.email)
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
