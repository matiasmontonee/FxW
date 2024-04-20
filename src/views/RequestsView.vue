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
              <td class="text-sm pl-6 pr-12 py-2 items-center">
                {{ solicitud.track_id }}.pdf
                <div v-show="isRowExpanded(index)" class="flex flex-col text-sm text-gray-700">
                  <span><i class="fas fa-circle text-green-400 mr-2 mt-4"></i>{{ solicitud.firmantes[0].name }} {{ solicitud.firmantes[0].last_name }}</span>
                  <div class="flex items-center mt-1 ml-6">
                    <a href="https://sign.fxw.com/" target="_blank" class="underline hover:text-blue-400">https://sign.fxw.com/</a><i class="fas fa-clone ml-12 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                  </div>
                  <p class="mt-1 ml-6 mb-2">WhatsApp <span class="ml-4">+5491133847624</span></p>
                </div>
                <div v-show="isRowExpanded(index)" class="flex flex-col text-sm">
                  <span><i class="fas fa-circle text-green-400 mr-2"></i>{{ solicitud.firmantes[1].name }} {{ solicitud.firmantes[1].last_name }}</span>
                  <div class="flex items-center mt-1 ml-6">
                    <a href="https://sign.fxw.com/" target="_blank" class="underline hover:text-blue-400">https://sign.fxw.com/</a><i class="fas fa-clone ml-12 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                  </div>
                  <p class="mt-1 ml-6 mb-2">WhatsApp <span class="ml-4">+5491133847624</span></p>
                </div>
                <div v-show="isRowExpanded(index)" class="flex flex-col text-sm">
                  <span><i class="fas fa-circle text-gray-400 mr-2"></i>{{ solicitud.firmantes[0].name }} {{ solicitud.firmantes[0].last_name }}</span>
                  <div class="flex items-center mt-1 ml-6">
                    <a href="https://sign.fxw.com/" target="_blank" class="underline hover:text-blue-400">https://sign.fxw.com/</a><i class="fas fa-clone ml-12 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                  </div>
                  <p class="mt-1 ml-6 mb-2">WhatsApp <span class="ml-4">+5491133847624</span></p>
                </div>
                <div @click="toggleRow(index)" class="flex items-center cursor-pointer">
                  <i class="fas fa-chevron-down text-blue-400 text-xl" :class="{'transform rotate-180': isRowExpanded(index)}"></i>
                </div>
              </td>
              <td class="px-12 pt-2 text-sm" style="vertical-align: top;"> 
                2/3
              </td>
              <td class="px-12 pt-2 text-sm" style="vertical-align: top;">
                {{ solicitud.created_at }}
              </td>
              <td class="px-12 text-sm" style="vertical-align: top;">
                <div class="flex items-center">
                  <span class="bg-green-400 text-white font-semibold px-3 py-0.5 rounded-xl mr-4 w-24 text-center"><!--{{ solicitud.status }}-->Firmado</span>
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
  emits: ['login','logout'],
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
    this.fetchDocumentosFirmados();
    this.fetchDocumentoStatus('track_id'); // Reemplazar track_id con valor real
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
    fetchDocumentosFirmados() {
      // Realiza la solicitud POST a la API para obtener los documentos firmados
      axios.post('https://private-anon-418fb06930-firmasxw.apiary-mock.com/api/signatureRequest', {})
        .then(response => {
          this.documentosFirmados.push(response.data);
        })
        .catch(error => {
          console.error('Error al obtener los documentos firmados:', error);
        });
    },
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
    fetchTodasLasSolicitudes() {
      // Realiza la solicitud GET a la API para obtener todas las solicitudes
      axios.get('https://private-anon-418fb06930-firmasxw.apiary-mock.com/api/listAll')
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