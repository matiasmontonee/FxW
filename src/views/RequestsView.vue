<template>
  <NavbarComponent :user="user" @logout="logout" />

  <main class="flex p-4 pt-0 lg:ml-56 bg-gray-100">
    <div class="rounded-2xl w-full overflow-x-auto bg-white">
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="pl-6 pt-5 pb-3 text-left text-sm">
              <div class="flex items-center">
                <i class="fas fa-search mr-2 text-blue-400 cursor-pointer"></i>
                <input class="text-gray-400 focus:outline-none" placeholder="Id Documento" />
              </div>
            </th>
            <th class="pr-10 pt-5 pb-3 text-left text-sm">
              <p class="text-gray-400">Firmantes</p>
            </th>
            <th class="pt-5 pb-3 text-left text-sm">
              <div class="flex items-center">
                <i class="fas fa-search mr-2 text-blue-400 cursor-pointer"></i>
                <input class="text-gray-400 focus:outline-none" placeholder="Fecha de Creación" />
              </div>
            </th>
            <th class="pt-5 pb-3 text-left text-sm">
              <div class="flex items-center">
                <i class="fas fa-search mr-2 text-blue-400 cursor-pointer"></i>
                <input class="text-gray-400 focus:outline-none" placeholder="Estado" />
              </div>
            </th>
            <th class="pr-10 pt-5 pb-3 text-left text-sm">
              <p class="text-gray-400">Informe</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b" v-for="(solicitud, index) in todasLasSolicitudes" :key="'row-' + index">
            <td class="text-sm pl-6 py-2 flex items-center">
              <div>
                {{ solicitud.id_seguimiento }}.pdf
                <div class="flex">
                  <div class="flex flex-col">
                    <!-- ONE -->
                    <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 0">
                      <span>
                        <i class="fas fa-circle mr-2 mt-4"
                          :class="{ 'text-green-400': solicitud.firmantes[0]?.signed, 'text-gray-400': !solicitud.firmantes[0]?.signed }"></i>
                        {{ solicitud.firmantes[0]?.name }} {{ solicitud.firmantes[0]?.last_name }}
                      </span>
                      <div class="flex items-center mt-1 ml-6">
                        <a :href="solicitud.firmantes[0]?.link" target="_blank" class="hover:text-blue-400 underline">{{
                          solicitud.firmantes[0]?.link }}</a>
                        <i v-if="!copiedLinks.includes(solicitud.firmantes[0]?.link)"
                          @click="copyLink(solicitud.firmantes[0]?.link)"
                          class="fas fa-clone ml-2 mr-1 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                        <i v-else class="fas fa-check-circle ml-2 mr-1 text-green-400"></i>
                      </div>
                      <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[0]?.method }} <span class="ml-4">+{{
                        solicitud.firmantes[0]?.phone ?? solicitud.firmantes[0]?.email }}</span></p>
                    </div>
                    <!-- TWO -->
                    <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 1">
                      <span>
                        <i class="fas fa-circle mr-2"
                          :class="{ 'text-green-400': solicitud.firmantes[1]?.signed, 'text-gray-400': !solicitud.firmantes[1]?.signed }"></i>
                        {{ solicitud.firmantes[1]?.name }} {{ solicitud.firmantes[1]?.last_name }}
                      </span>
                      <div class="flex items-center mt-1 ml-6">
                        <a :href="solicitud.firmantes[1]?.link" target="_blank" class="hover:text-blue-400 underline">{{
                          solicitud.firmantes[1]?.link }}</a>
                        <i v-if="!copiedLinks.includes(solicitud.firmantes[1]?.link)"
                          @click="copyLink(solicitud.firmantes[1]?.link)"
                          class="fas fa-clone ml-2 mr-1 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                        <i v-else class="fas fa-check-circle ml-2 mr-1 text-green-400"></i>
                      </div>
                      <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[1]?.method }} <span class="ml-4">+{{
                        solicitud.firmantes[1]?.phone ?? solicitud.firmantes[1]?.email }}</span></p>
                    </div>
                    <!-- THREE -->
                    <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 2">
                      <span>
                        <i class="fas fa-circle mr-2"
                          :class="{ 'text-green-400': solicitud.firmantes[2]?.signed, 'text-gray-400': !solicitud.firmantes[2]?.signed }"></i>
                        {{ solicitud.firmantes[2]?.name }} {{ solicitud.firmantes[2]?.last_name }}
                      </span>
                      <div class="flex items-center mt-1 ml-6">
                        <a :href="solicitud.firmantes[2]?.link" target="_blank" class="hover:text-blue-400 underline">{{
                          solicitud.firmantes[2]?.link }}</a>
                        <i v-if="!copiedLinks.includes(solicitud.firmantes[2]?.link)"
                          @click="copyLink(solicitud.firmantes[2]?.link)"
                          class="fas fa-clone ml-2 mr-1 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                        <i v-else class="fas fa-check-circle ml-2 mr-1 text-green-400"></i>
                      </div>
                      <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[2]?.method }} <span class="ml-4">+{{
                        solicitud.firmantes[2]?.phone ?? solicitud.firmantes[2]?.email }}</span></p>
                    </div>
                  </div>

                  <!-- TODO: four, five and six no estan alineados con el one two and three -->
                  <div class="flex">
                    <!-- FOUR -->
                    <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 3">
                      <span>
                        <i class="fas fa-circle mr-2"
                          :class="{ 'text-green-400': solicitud.firmantes[3]?.signed, 'text-gray-400': !solicitud.firmantes[3]?.signed }"></i>
                        {{ solicitud.firmantes[3]?.name }} {{ solicitud.firmantes[3]?.last_name }}
                      </span>
                      <div class="flex items-center mt-1 ml-6">
                        <a :href="solicitud.firmantes[3]?.link" target="_blank" class="hover:text-blue-400 underline">{{
                          solicitud.firmantes[3]?.link }}</a>
                        <i v-if="!copiedLinks.includes(solicitud.firmantes[3]?.link)"
                          @click="copyLink(solicitud.firmantes[3]?.link)"
                          class="fas fa-clone ml-2 mr-1 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                        <i v-else class="fas fa-check-circle ml-2 mr-1 text-green-400"></i>
                      </div>
                      <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[3]?.method }} <span class="ml-4">+{{
                        solicitud.firmantes[3]?.phone ?? solicitud.firmantes[3]?.email }}</span></p>
                    </div>
                    <!-- FIVE -->
                    <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 4">
                      <span>
                        <i class="fas fa-circle mr-2"
                          :class="{ 'text-green-400': solicitud.firmantes[4]?.signed, 'text-gray-400': !solicitud.firmantes[4]?.signed }"></i>
                        {{ solicitud.firmantes[4]?.name }} {{ solicitud.firmantes[4]?.last_name }}
                      </span>
                      <div class="flex items-center mt-1 ml-6">
                        <a :href="solicitud.firmantes[4]?.link" target="_blank" class="hover:text-blue-400 underline">{{
                          solicitud.firmantes[4]?.link }}</a>
                        <i v-if="!copiedLinks.includes(solicitud.firmantes[4]?.link)"
                          @click="copyLink(solicitud.firmantes[4]?.link)"
                          class="fas fa-clone ml-2 mr-1 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                        <i v-else class="fas fa-check-circle ml-2 mr-1 text-green-400"></i>
                      </div>
                      <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[4]?.method }} <span class="ml-4">+{{
                        solicitud.firmantes[4]?.phone ?? solicitud.firmantes[4]?.email }}</span></p>
                    </div>
                    <!-- SIX -->
                    <div v-show="isRowExpanded(index) && solicitud.firmantes.length > 5">
                      <span>
                        <i class="fas fa-circle mr-2"
                          :class="{ 'text-green-400': solicitud.firmantes[5]?.signed, 'text-gray-400': !solicitud.firmantes[5]?.signed }"></i>
                        {{ solicitud.firmantes[5]?.name }} {{ solicitud.firmantes[5]?.last_name }}
                      </span>
                      <div class="flex items-center mt-1 ml-6">
                        <a :href="solicitud.firmantes[5]?.link" target="_blank" class="hover:text-blue-400 underline">{{
                          solicitud.firmantes[5]?.link }}</a>
                        <i v-if="!copiedLinks.includes(solicitud.firmantes[5]?.link)"
                          @click="copyLink(solicitud.firmantes[5]?.link)"
                          class="fas fa-clone ml-2 mr-1 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                        <i v-else class="fas fa-check-circle ml-2 mr-1 text-green-400"></i>
                      </div>
                      <p class="mt-1 ml-6 mb-2">{{ solicitud.firmantes[5]?.method }} <span class="ml-4">+{{
                        solicitud.firmantes[5]?.phone ?? solicitud.firmantes[5]?.email }}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <div @click="toggleRow(index)" class="flex items-end cursor-pointer">
              <i class="fas fa-chevron-down text-blue-400 text-xl pl-6 pr-6"
                :class="{ 'transform rotate-180': isRowExpanded(index) }"></i>
            </div>
            <td class="pl-5 pt-2 text-sm" style="vertical-align: top;">
              <p>{{ solicitud.cantidad_firmados }}/{{ solicitud.cantidad_firmantes }}</p>
            </td>
            <td class="pt-2 text-sm" style="vertical-align: top;">
              {{ solicitud.created_at }}
            </td>
            <td class="pt-2 text-sm" style="vertical-align: top;">
              <p class="bg-green-400 text-white font-semibold px-3 py-0.5 rounded-xl mr-4 w-20 text-center">Firmado</p>
            </td>
            <td class="pl-4 text-sm" style="vertical-align: top;">
              <i class="far fa-file-pdf text-3xl text-blue-400 pt-1"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  <!-- TODO: Next Page Button -->
  <div class="flex justify-end fixed bottom-4 right-4">
    <a href="#" class="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 transition-colors">
      Next Page
    </a>
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
      expandedRows: [],
      copiedLinks: []
    };
  },
  created() {
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
    toggleRow(index) { // Método para alternar la expansión de filas
      if (this.expandedRows.includes(index)) {
        // Si ya está expandido, lo cerramos
        this.expandedRows = this.expandedRows.filter(i => i !== index);
      } else {
        // Si no está expandido, lo abrimos
        this.expandedRows.push(index);
      }
    },
    isRowExpanded(index) { // Método para verificar si una fila está expandida
      return this.expandedRows.includes(index);
    },
    copyLink(link) { // Método para copiar el link
      const el = document.createElement('textarea');
      el.value = link;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.copiedLinks.push(link);

      setTimeout(() => { // Eliminar el enlace copiado después de dos segundos
        const index = this.copiedLinks.indexOf(link);
        if (index !== -1) {
          this.copiedLinks.splice(index, 1);
        }
      }, 2000);
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


    // test real
    fetchTodasLasSolicitudes() {
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': 'HxfBsetg67ZVeMUFprRwIrT2g5mcPn2V'
      };

      axios.get('https://firmasxw.com/test/list?page=1', { headers })
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
