<template>
    <NavbarComponent :user="user" @logout="logout" />

    <!-- DESCARGAR REPORTES -->
      <main>
        <h2 class="text-center mt-4">Informes</h2>
        <!-- <div class="mx-auto mt-8 p-4 shadow-2xl border rounded-md w-3/4">
          <div class="flex flex-col relative">
            <div for="fecha" class="mb-1 text-gray-700">Estado</div>
            <select class="border border-gray-500 px-2 py-1 rounded appearance-none w-full mb-4">
              <option value="option01">Todos</option>
              <option value="option02">Solicitada</option>
              <option value="option03">En proceso</option>
              <option value="option04">En revisión</option>
              <option value="option05">Aprobada</option>
              <option value="option06">Cotizando</option>
              <option value="option07">Cotización lista</option>
              <option value="option08">Cotización rechazada</option>
              <option value="option09">Cotización aceptada</option>
              <option value="option10">Firmado</option>
              <option value="option11">No firmado</option>
              <option value="option12">Rechazado</option>
            </select>
            <div class="absolute inset-y-0 right-2 bottom-52 flex items-center pointer-events-none">
              <svg class="w-6 h-6 fill-current text-gray-700" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L5 7h10l-5 5z" />
              </svg>
            </div>
          
            <div class="flex flex-col justify-between w-full mb-6">
              <label for="fecha" class="mb-1 text-gray-700">Fecha inicio</label>
              <input type="date" class="border border-gray-500 px-2 py-1 rounded w-full mb-4">
              <label for="fecha" class="mb-1 text-gray-700">Fecha término</label>
              <input type="date" class="border border-gray-500 px-2 py-1 rounded w-full">
            </div>

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-2">Descargar</button>
          </div>
        </div> -->
      </main>
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
      sidebarOpen: false
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