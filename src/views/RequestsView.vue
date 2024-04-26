<template>
  <NavbarComponent :user="user" @logout="logout" />

  <main class="flex p-4 pt-0 lg:ml-56 bg-gray-100">
    <div class="rounded-2xl w-full overflow-x-auto bg-white">
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="px-6 py-3 text-left text-sm">
              <div class="flex items-center">
                <i class="fas fa-search mr-2 text-blue-400 cursor-pointer"></i>
                <input class="text-gray-400 focus:outline-none" placeholder="Id Documento" />
              </div>
            </th>
            <th class="px-6 py-3 text-left text-sm">
              <p class="text-gray-400">Firmantes</p>
            </th>
            <th class="px-6 py-3 text-left text-sm">
              <div class="flex items-center">
                <i class="fas fa-search mr-2 text-blue-400 cursor-pointer"></i>
                <input class="text-gray-400 focus:outline-none" placeholder="Fecha de Creación" />
              </div>
            </th>
            <th class="px-6 py-3 text-left text-sm">
              <div class="flex items-center">
                <i class="fas fa-search mr-2 text-blue-400 cursor-pointer"></i>
                <input class="text-gray-400 focus:outline-none" placeholder="Estado" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b" v-for="(solicitud, index) in todasLasSolicitudes" :key="'row-' + index">

            <td class="text-sm pl-6 pr-12 py-2 items-center flex">
              <!-- FIRST COLUMN -->
              <div class="mr-12">
                {{ solicitud.id_seguimiento }}.pdf
                <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 0" class="flex flex-col text-sm">
                  <span><i class="fas fa-circle mr-2 mt-4"
                      :class="{ 'text-green-400': solicitud.firmantes[0]?.status, 'text-gray-400': !solicitud.firmantes[0]?.status }"></i>
                    {{ solicitud.firmantes[0]?.name }} {{ solicitud.firmantes[0]?.last_name }}</span>
                  <div class="flex items-center mt-1 ml-6">
                    <a :href="solicitud.firmantes[0]?.link" target="_blank"
                      class="underline hover:text-blue-400">{{ solicitud.firmantes[0]?.link }}</a>
                    <i class="fas fa-clone ml-12 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                  </div>
                  <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[0]?.method }} <span class="ml-4">+{{ solicitud.firmantes[0]?.phone ?? solicitud.firmantes[0]?.email }}</span></p>
                </div>
                <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 1" class="flex flex-col text-sm">
                  <span><i class="fas fa-circle mr-2"
                      :class="{ 'text-green-400': solicitud.firmantes[1]?.status, 'text-gray-400': !solicitud.firmantes[1]?.status }"></i>
                    {{ solicitud.firmantes[1]?.name }} {{ solicitud.firmantes[1]?.last_name }}</span>
                  <div class="flex items-center mt-1 ml-6">
                    <a :href="solicitud.firmantes[1]?.link" target="_blank"
                      class="underline hover:text-blue-400">{{ solicitud.firmantes[1]?.link }}</a><i
                      class="fas fa-clone ml-12 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                  </div>
                  <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[1]?.method }} <span class="ml-4">+{{ solicitud.firmantes[1]?.phone ?? solicitud.firmantes[1]?.email }}</span></p>
                </div>
              </div>
              <!-- SECOND COLUMN -->
              <div class="mr-12">
                <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 2" class="flex flex-col text-sm">
                  <span><i class="fas fa-circle mr-2"
                      :class="{ 'text-green-400': solicitud.firmantes[2]?.status, 'text-gray-400': !solicitud.firmantes[2]?.status }"></i>
                    {{ solicitud.firmantes[2]?.name }} {{ solicitud.firmantes[2]?.last_name }}</span>
                  <div class="flex items-center mt-1 ml-6">
                    <a :href="solicitud.firmantes[2]?.link" target="_blank"
                      class="underline hover:text-blue-400">{{ solicitud.firmantes[2]?.link }}</a><i
                      class="fas fa-clone ml-12 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                  </div>
                  <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[2]?.method }} <span class="ml-4">+{{ solicitud.firmantes[2]?.phone ?? solicitud.firmantes[2]?.email }}</span></p>
                </div>
                <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 3" class="flex flex-col text-sm">
                  <span><i class="fas fa-circle mr-2"
                      :class="{ 'text-green-400': solicitud.firmantes[3]?.status, 'text-gray-400': !solicitud.firmantes[3]?.status }"></i>
                    {{ solicitud.firmantes[3]?.name }} {{ solicitud.firmantes[3]?.last_name }}</span>
                  <div class="flex items-center mt-1 ml-6">
                    <a :href="solicitud.firmantes[3]?.link" target="_blank"
                      class="underline hover:text-blue-400">{{ solicitud.firmantes[3]?.link }}</a><i
                      class="fas fa-clone ml-12 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                  </div>
                  <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[3]?.method }} <span class="ml-4">+{{ solicitud.firmantes[3]?.phone ?? solicitud.firmantes[3]?.email }}</span></p>
                </div>
              </div>
              <!-- THIRD COLUMN -->
              <div class="mr-12">
                <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 4" class="flex flex-col text-sm">
                  <span><i class="fas fa-circle mr-2"
                      :class="{ 'text-green-400': solicitud.firmantes[4]?.status, 'text-gray-400': !solicitud.firmantes[4]?.status }"></i>
                    {{ solicitud.firmantes[4]?.name }} {{ solicitud.firmantes[4]?.last_name }}</span>
                  <div class="flex items-center mt-1 ml-6">
                    <a :href="solicitud.firmantes[4]?.link" target="_blank"
                      class="underline hover:text-blue-400">{{ solicitud.firmantes[4]?.link }}</a><i
                      class="fas fa-clone ml-12 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                  </div>
                  <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[4]?.method }} <span class="ml-4">+{{ solicitud.firmantes[4]?.phone ?? solicitud.firmantes[4]?.email }}</span></p>
                </div>
                <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 5" class="flex flex-col text-sm">
                  <span><i class="fas fa-circle mr-2"
                      :class="{ 'text-green-400': solicitud.firmantes[5]?.status, 'text-gray-400': !solicitud.firmantes[5]?.status }"></i>
                    {{ solicitud.firmantes[5]?.name }} {{ solicitud.firmantes[5]?.last_name }}</span>
                  <div class="flex items-center mt-1 ml-6">
                    <a :href="solicitud.firmantes[5]?.link" target="_blank"
                      class="underline hover:text-blue-400">{{ solicitud.firmantes[5]?.link }}</a><i
                      class="fas fa-clone ml-12 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                  </div>
                  <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[5]?.method }} <span class="ml-4">+{{ solicitud.firmantes[5]?.phone ?? solicitud.firmantes[5]?.email }}</span></p>
                </div>
              </div>
            </td>
            <div @click="toggleRow(index)" class="flex items-end cursor-pointer">
              <i class="fas fa-chevron-down text-blue-400 text-xl pl-6 pr-6"
                :class="{ 'transform rotate-180': isRowExpanded(index) }"></i>
            </div>
            <td class="px-12 pt-2 text-sm" style="vertical-align: top;">
              2/3
            </td>
            <td class="px-12 pt-2 text-sm" style="vertical-align: top;">
              {{ solicitud.created_at }}
            </td>
            <td class="px-12 text-sm" style="vertical-align: top;">
              <div class="flex items-center">
                <span
                  class="bg-green-400 text-white font-semibold px-3 py-0.5 rounded-xl mr-4 w-24 text-center"><!--{{ solicitud.status }}-->Firmado</span>
                <i class="far fa-file-pdf text-3xl text-blue-400 pt-1.5"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import axios from 'axios';

export default {
  emits: ['login', 'logout'],
  props: ['user'],
  components: {
    NavbarComponent
  },
  data() {
    return {
      sidebarOpen: false,
      documentosFirmados: [],
      documentoStatus: null,
      solicitudesGrupo: [],
      todasLasSolicitudes: [],
      expandedRows: []
    };
  },
  created() {
    // this.fetchDocumentosFirmados();
    this.fetchDocumentoStatus('id_seguimiento'); // Reemplazar id_seguimiento con valor real
    this.fetchSolicitudesGrupo('cliente_1'); // Reemplazar cliente_1 con valor real
    this.fetchTodasLasSolicitudes();
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    // Método para alternar la expansión de filas
    toggleRow(index) {
      if (this.expandedRows.includes(index)) {
        // Si ya está expandido, lo cerramos
        this.expandedRows = this.expandedRows.filter(i => i !== index);
      } else {
        // Si no está expandido, lo abrimos
        this.expandedRows.push(index);
      }
    },
    // Método para verificar si una fila está expandida
    isRowExpanded(index) {
      return this.expandedRows.includes(index);
    },
    // TODO: This one is wring
    // fetchDocumentosFirmados() {
    //   // Realiza la solicitud POST a la API para obtener los documentos firmados
    //   axios.post('https://firmasxw.com/test/signatureRequest', {})
    //     .then(response => {
    //       this.documentosFirmados.push(response.data);
    //     })
    //     .catch(error => {
    //       console.error('Error al obtener los documentos firmados:', error);
    //     });
    // },
    fetchDocumentoStatus(trackId) {
      // Realiza la solicitud GET a la API para obtener el estado de un documento
      axios.get(`https://private-anon-418fb06930-firmasxw.apiary-mock.com/api/signatureStatus/${trackId}`)
        .then(response => {
          this.documentoStatus = response.data;
        })
        .catch(error => {
          console.error('Error al obtener el estado del documento:', error);
        });
    },
    fetchSolicitudesGrupo(cliente) {
      // Realiza la solicitud GET a la API para obtener las solicitudes de un grupo
      axios.get(`https://private-anon-418fb06930-firmasxw.apiary-mock.com/api/listClient/${cliente}`)
        .then(response => {
          this.solicitudesGrupo = response.data;
        })
        .catch(error => {
          console.error('Error al obtener las solicitudes del grupo:', error);
        });
    },


    // test real
    fetchTodasLasSolicitudes() {
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': 'HxfBsetg67ZVeMUFprRwIrT2g5mcPn2V'
      };

      axios.get('https://firmasxw.com/test/list', { headers })
        .then(response => {
          this.todasLasSolicitudes = response.data;
        })
        .catch(error => {
          console.error('Error al obtener todas las solicitudes:', error);
        });
    }
  }
}
</script>