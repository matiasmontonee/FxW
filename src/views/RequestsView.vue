<template>
  <NavbarComponent :user="user" @logout="logout" />

    <main class="flex flex-col flex-1 p-4 pt-0 lg:ml-56 bg-gray-100">
      <div class="rounded-2xl w-full overflow-x-auto bg-white mr-4">
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
              <div class="pl-6 pr-12 py-2 items-center">
                <td class="text-sm">{{ solicitud.track_id }}.pdf</td>
                <i class="fas fa-chevron-down cursor-pointer text-blue-400"></i>
              </div>
              <td class="px-12 pb-6 text-sm"> 
                <!-- {{ solicitud.firmantes[0].name }} {{ solicitud.firmantes[0].last_name }} -->
                2/3
              </td>
              <td class="px-12 pb-6 text-sm">{{ solicitud.created_at }}</td>
              <td class="px-12 pb-6 text-sm">
                <div class="flex items-center">
                  <span class="bg-green-400 text-white font-semibold px-3 py-0.5 rounded-xl mr-4 w-24 text-center"><!--{{ solicitud.status }}-->Firmado</span>
                  <i class="far fa-file-pdf text-3xl text-blue-400"></i>
                </div>
              </td>
            </tr>
            <tr v-for="(solicitud, index) in todasLasSolicitudes" :key="'row-' + index + '-2'">
              <div class="pl-6 pr-12 py-2 items-center">
                <td class="text-sm">{{ solicitud.track_id }}.pdf</td>
                <i class="fas fa-chevron-down cursor-pointer text-blue-400"></i>
              </div>
              <td class="px-12 py-2 text-sm">
                <!-- {{ solicitud.firmantes[0].name }} {{ solicitud.firmantes[0].last_name }} -->
                3/4
              </td>
              <td class="px-12 py-2 text-sm">{{ solicitud.created_at }}</td>
              <td class="px-12 py-2 text-sm">
                <div class="flex items-center">
                  <span class="bg-red-400 text-white font-semibold px-3 py-0.5 rounded-xl mr-4 w-24 text-center"><!--{{ solicitud.status }}-->Rechazado</span>
                  <i class="far fa-file-pdf text-3xl text-gray-400"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- <h3 class="text-center mt-4 font-bold">Links de documentos para firmar</h3>

    <div v-if="documentosFirmados.length > 0">
      <ul class="text-center mt-4">
        <li v-for="documento in documentosFirmados" :key="documento.track_id">
          <div>Track ID: {{ documento.track_id }}</div>
          <div>Fecha de Creación: {{ documento.created_at }}</div>
          <div v-if="documento.urls && documento.urls.length > 0">
            <h4>Links de Firma:</h4>
            <ul>
              <li v-for="url in documento.urls" :key="url.link">
                <div>Link: <a :href="url.link" target="_blank">{{ url.link }}</a></div>
                <div>Persona: {{ url.person }}</div>
                <div>DNI: {{ url.dni }}</div>
                <div>Teléfono: {{ url.phone }}</div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <p v-else class="text-center mt-4">No hay documentos firmados.</p>

    <h3 class="text-center mt-4 font-bold">Estado de Documento</h3>

    <div class="text-center" v-if="documentoStatus">
      <div>Estado: {{ documentoStatus.status }}</div>
      <div v-if="documentoStatus.pdf_url">URL del PDF: {{ documentoStatus.pdf_url }}</div>
      <div v-if="documentoStatus.signed_at">Firmado en: {{ documentoStatus.signed_at }}</div>
    </div>

    <h3 class="text-center mt-4 font-bold">Solicitudes de un grupo</h3>

    <div v-if="solicitudesGrupo.length > 0">
      <ul class="text-center mt-4">
        <li v-for="solicitud in solicitudesGrupo" :key="solicitud.track_id" class="border-b border-red-500">
          <div>Track ID: {{ solicitud.track_id }}</div>
          <div>Original document: {{solicitud.original_document}}</div>
          <div>Signed document: {{solicitud.signed_document}}</div>
          <div>Estado: {{ solicitud.status }}</div>
          <div>Cantidad de Firmantes: {{ solicitud.cantidad_firmantes }}</div>
          <div>Cantidad Firmados: {{ solicitud.cantidad_firmados }}</div>
          <div>Firmantes: {{ solicitud.firmantes }}</div>
          <div>Firma en todas las hojas: {{ solicitud.firma_en_todas_las_hojas }}</div>
          <div>Creado: {{ solicitud.created_at }}</div>
          <div>Webhook: {{ solicitud.webhook }}</div>
          <div>Cliente: {{ solicitud.cliente }}</div>
        </li>
      </ul>
    </div>
    <p v-else class="text-center mt-4">No hay solicitudes para este grupo.</p>

    <h3 class="text-center mt-4 font-bold">Lista de todas las solicitudes</h3>

    <div v-if="todasLasSolicitudes.length > 0">
      <ul class="text-center mt-4">
        <li v-for="solicitud in todasLasSolicitudes" :key="solicitud.track_id" class="border-b border-red-500">
          <div>Track ID: {{ solicitud.track_id }}</div>
          <div>Original document: {{solicitud.original_document}}</div>
          <div>Signed document: {{solicitud.signed_document}}</div>
          <div>Estado: {{ solicitud.status }}</div>
          <div>Cantidad de Firmantes: {{ solicitud.cantidad_firmantes }}</div>
          <div>Cantidad Firmados: {{ solicitud.cantidad_firmados }}</div>
          <div>Firmantes: {{ solicitud.firmantes }}</div>
          <div>Firma en todas las hojas: {{ solicitud.firma_en_todas_las_hojas }}</div>
          <div>Creado: {{ solicitud.created_at }}</div>
          <div>Webhook: {{ solicitud.webhook }}</div>
          <div>Cliente: {{ solicitud.cliente }}</div>
        </li>
      </ul>
    </div>
    <p v-else class="text-center mt-4">No hay solicitudes.</p> -->
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
      todasLasSolicitudes: []
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
