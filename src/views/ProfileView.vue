<template>
  <NavbarComponent :user="user" @logout="logout" />

  <main class="flex p-4 pt-0 lg:ml-56 bg-gray-100">
    <div class="rounded-2xl w-full bg-white">
      <div class="m-6 mt-4">
        <h2 class="text-blue-500 font-bold mb-2">Datos Empresa</h2>

        <div class="flex flex-col">
          <div class="flex items-center">
            <input type="text" placeholder="Nombre" v-model="empresa.nombre" class="border-gray-300 border-b-2 w-2/5 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800 mr-4">
            <i @click="toggleInfo" class="fas fa-info-circle text-xl mb-2 text-gray-500 hover:text-gray-400 cursor-pointer"></i>
            <div v-if="showInfoMessage" class="absolute bg-gray-200 rounded-lg text-sm py-4 px-8 w-1/3 top-1/5 right-1/2 left-1/2 text-gray-700 shadow-lg z-10 ml-20">
              <p>Es el nombre con el cual los firmantes identifican a su empresa. Lo verán de la siguiente manera:</p><br/>
              <p>¡Hola Darío! Soy Firmi, asistente virtual de Firma X WhatsApp. <span class="font-bold text-red-700">Crecer SA</span> nos pidió hacerle llegar un documento para que lo firme.</p>
            </div>
          </div>
          <input type="text" placeholder="País" v-model="empresa.pais" class="border-gray-300 border-b-2 w-2/5 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800">
        </div>

        <h2 class="text-blue-500 font-bold mb-2">Datos Personales</h2>

        <div class="flex">
          <input type="text" placeholder="Nombre" v-model="datosPersonales.nombre" class="border-gray-300 border-b-2 w-1/4 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800 mr-4">
          <input type="text" placeholder="Apellido" v-model="datosPersonales.apellido" class="border-gray-300 border-b-2 w-1/4 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800">
        </div>
        <input @input="validateDNI(index)" type="text" placeholder="DNI / CI" v-model="datosPersonales.dni" class="border-gray-300 border-b-2 w-1/4 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800">
        <div class="flex">
          <input type="number" placeholder="+549" v-model="datosPersonales.telefonoCodigo" class="border-gray-300 border-b-2 w-20 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800 mr-4">
          <input type="number" placeholder="1137681841" v-model="datosPersonales.telefonoNumero" class="border-gray-300 border-b-2 w-1/4 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800">
        </div>
        <input type="text" placeholder="Email" v-model="datosPersonales.email" class="border-gray-300 border-b-2 w-1/4 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800">

        <div v-if="error" class="text-red-500 bg-red-100 p-2 rounded-md text-center flex justify-between items-center" style="width: 460px;">
          <span class="ml-2 font-bold">{{ error }}</span>
          <button @click="error = ''"><i class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-red-300 px-2 rounded-sm"></i></button>
        </div>

        <div class="text-center mt-4">
          <button @click="guardarDatos" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 font-bold rounded-full"><i class="fas fa-save mr-2"></i>Guardar mis datos</button>
        </div>
      </div>
    </div>
  </main>

  <ModalComponent :isVisible="showModal" @close="showModal = false" />
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import ModalComponent from '../components/ModalComponent.vue';

export default {
  emits: ['login', 'logout'],
  props: ['user'],
  components: {
    NavbarComponent,
    ModalComponent
  },
  data() {
    return {
      sidebarOpen: false,
      showInfoMessage: false,
      empresa: {
        nombre: '',
        pais: ''
      },
      datosPersonales: {
        nombre: '',
        apellido: '',
        dni: '',
        telefonoCodigo: '',
        telefonoNumero: '',
        email: ''
      },
      error: '',
      showModal: false
    };
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleInfo() {
      this.showInfoMessage = !this.showInfoMessage;
    },
    validateDNI() { // Permitir solo números y los caracteres ., -, /
      const regex = /^[0-9./-]*$/;
      
      if (!regex.test(this.datosPersonales.dni)) { // Elimina caracteres no permitidos
        this.datosPersonales.dni = this.datosPersonales.dni.replace(/[^0-9./-]/g, '');
      }
    },
    guardarDatos() {
    const empresaEmpty = Object.values(this.empresa).some(value => value === '');
    const datosPersonalesEmpty = Object.values(this.datosPersonales).some(value => value === '');
    const empresaComplete = Object.values(this.empresa).every(value => value !== '');
    const datosPersonalesComplete = Object.values(this.datosPersonales).every(value => value !== '');

    const dni = this.datosPersonales.dni.replace(/[^0-9]/g, '');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoCodigo = this.datosPersonales.telefonoCodigo.toString();
    const telefonoNumero = this.datosPersonales.telefonoNumero.toString();

    if (empresaEmpty || datosPersonalesEmpty) {
      this.error = 'Por favor, completa todos los campos.';
    } else if (!empresaComplete || !datosPersonalesComplete) {
      this.error = 'Por favor, completa todos los datos.';
    } else if (dni.length < 6 || dni.length > 8) {
      this.error = 'El DNI debe contener entre 6 y 8 números.';
    } else if (telefonoCodigo.length < 3 || telefonoCodigo.length > 5) {
      this.error = 'El código debe contener entre 3 y 5 caracteres.';
    } else if (telefonoNumero.length < 8 || telefonoNumero.length > 12) {
      this.error = 'El número debe contener entre 8 y 12 caracteres.';
    } else if (!emailRegex.test(this.datosPersonales.email)) {
      this.error = 'Por favor, ingresa un correo electrónico válido.';
    } else {
      this.error = '';
      this.empresa = {
        nombre: '',
        pais: ''
      };
      this.datosPersonales = {
        nombre: '',
        apellido: '',
        dni: '',
        telefonoCodigo: '',
        telefonoNumero: '',
        email: ''
      };
      this.showModal = true;
    }
  }
  }
}
</script>
