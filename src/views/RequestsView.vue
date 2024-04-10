<template>
  <NavbarComponent :user="user" @logout="logout" />

    <main class="flex flex-col flex-1 p-4 pt-0 lg:ml-72 mr-4 mt-6">
      <div class="border border-gray-300 rounded mt-4 shadow-lg w-full overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-4 py-2 text-left border-r border-gray-200">ID Solicitud 
                <i class="fas fa-sort float-right mt-1 cursor-pointer"></i>
              </th>
              <th class="px-4 py-2 text-left border-r border-gray-200">Cliente
                <i class="fas fa-sort float-right mt-1 cursor-pointer"></i>
              </th>
              <th class="px-4 py-2 text-left border-r border-gray-200">DNI
                <i class="fas fa-sort float-right mt-1 cursor-pointer"></i>
              </th>
              <th class="px-4 py-2 text-left border-r border-gray-200">Teléfono
                <i class="fas fa-sort float-right mt-1 cursor-pointer"></i>
              </th>
              <th class="px-4 py-2 text-left border-r border-gray-200">Fecha de Solicitud
                <i class="fas fa-sort float-right mt-1 cursor-pointer"></i>
              </th>
              <th class="px-4 py-2 text-left border-r border-gray-200">Estado
                <i class="fas fa-sort float-right mt-1 cursor-pointer"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(solicitud, index) in todasLasSolicitudes" :key="'row-' + index">
              <td class="border p-4 text-sm">{{ solicitud.track_id }}</td>
              <td class="border p-4 text-sm">
                {{ solicitud.firmantes[0].name }} {{ solicitud.firmantes[0].last_name }}
              </td>
              <td class="border p-4 text-sm">
                {{ solicitud.firmantes[0].dni }}
              </td>
              <td class="border p-4 text-sm">
                +{{ solicitud.firmantes[0].phone }}
              </td>
              <td class="border p-4 text-sm">{{ solicitud.created_at }}</td>
              <td class="border p-4 text-sm"><span class="bg-orange-500 text-white font-semibold px-3 py-1 rounded-md">{{ solicitud.status }}</span></td>
            </tr>
            <tr v-for="(solicitud, index) in todasLasSolicitudes" :key="'row-' + index + '-2'">
              <td class="border p-4 text-sm">{{ solicitud.track_id }}</td>
              <td class="border p-4 text-sm">
                {{ solicitud.firmantes[0].name }} {{ solicitud.firmantes[0].last_name }}
              </td>
              <td class="border p-4 text-sm">
                {{ solicitud.firmantes[0].dni }}
              </td>
              <td class="border p-4 text-sm">
                +{{ solicitud.firmantes[0].phone }}
              </td>
              <td class="border p-4 text-sm">{{ solicitud.created_at }}</td>
              <td class="border p-4 text-sm"><span class="bg-orange-500 text-white font-semibold px-3 py-1 rounded-md">{{ solicitud.status }}</span></td>
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
