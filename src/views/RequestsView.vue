<template>
  <NavbarComponent :user="user" @logout="logout"/>

  <div class="mt-9 lg:ml-72 mr-4 border border-gray-300 rounded-md shadow-xl">
    <!-- Barra de pasos -->
    <div class="flex justify-between items-center border-b border-gray-300 p-6">
      <div class="flex items-center">
        <p :class="{ 'bg-blue-500': currentStep === 1, 'bg-gray-500': currentStep !== 1 }" class="border rounded-full px-2.5 py-0.5 text-white mr-2">1</p>
        <span>Selecciona el documento</span>
      </div>
      <div class="border-b-2 border-gray-300 px-6 mt-1 mx-2"></div>
      <div class="flex items-center">
        <p :class="{ 'bg-blue-500': currentStep === 2, 'bg-gray-500': currentStep !== 2 }" class="border rounded-full px-2.5 py-0.5 text-white mr-2">2</p>
        <span>Añadir firmantes</span>
      </div>
      <div class="border-b-2 border-gray-300 px-6 mt-1 mx-2"></div>
      <div class="flex items-center">
        <p :class="{ 'bg-blue-500': currentStep === 3, 'bg-gray-500': currentStep !== 3 }" class="border rounded-full px-2.5 py-0.5 text-white mr-2">3</p>
        <span>Posicionar firmas</span>
      </div>
      <div class="border-b-2 border-gray-300 px-6 mt-1 mx-2"></div>
      <div class="flex items-center">
        <p :class="{ 'bg-blue-500': currentStep === 4, 'bg-gray-500': currentStep !== 4 }" class="border rounded-full px-2.5 py-0.5 text-white mr-2">4</p>
        <span>Enviar documentos</span>
      </div>
    </div>

    <!-- Paso 1: Agregar archivo -->
    <div v-if="currentStep === 1">
      <h2 class="text-2xl m-6">Seleccionar documento</h2>

      <!-- DIV CONTENEDOR DE ARCHIVOS -->
      <div class="m-6" @dragover.prevent @drop.prevent="handleDrop">
        <label for="fileInput" class="w-96 h-48 flex flex-col items-center text-center px-4 py-6 bg-blue-100 hover:bg-blue-200 rounded-lg shadow-lg cursor-pointer">
          <i class="fas fa-file-pdf fa-3x mt-2 mb-6"></i>
          <span>Suelta el archivo <span class="font-bold">PDF o DOCX</span> aquí o <span class="text-blue-500 font-bold">haz click</span> para buscar en tus documentos.</span>
          <input id="fileInput" type='file' accept=".pdf,.docx" class="hidden" @change="handleFileChange" multiple />
        </label>
      </div>

      <!-- MENSAJE CARGANDO -->
      <div v-if="loading" class="m-6 text-center">
        <div class="inline-block w-24 h-1 bg-blue-500 rounded-full animate-pulse"></div>
        <p class="mt-2 text-gray-500">Cargando...</p>
      </div>

      <!-- MENSAJE DE ERROR -->
      <div v-if="errorMessage" class="m-6 mb-0 text-red-500 bg-red-100 p-2 rounded-md text-center text-blue-900 flex justify-between items-center w-96">
        <span class="ml-2 font-bold">{{ errorMessage }}</span>
        <button @click="removeErrorMessage"><i class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-red-300 px-2 rounded-sm"></i></button>
      </div>

      <!-- MOSTRAR ARCHIVOS -->
      <div v-if="fileNames.length > 0" class="m-6 mt-2">
        <div v-for="(name, index) in fileNames" :key="index" class="bg-blue-100 p-2 rounded-md text-center text-blue-900 mb-2 flex justify-between items-center w-96">
          <span class="text-black ml-2">{{ index + 1 }}. {{ name }}</span>
          <button @click="removeFile(index)"><i class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-blue-300 px-2 rounded-sm"></i></button>
        </div>
      </div>  
    </div>

    <!-- Paso 2: Seleccionar firmantes -->
    <div v-if="currentStep === 2">
      <h2 class="text-2xl m-6">¿Quién firmará?</h2>
    </div>

    <!-- Paso 3: Posicionar las firmas -->
    <div v-if="currentStep === 3">
      <h2 class="text-2xl m-6">Posiciona las firmas</h2>
    </div>

    <!-- Paso 4: Enviar el documento -->
    <div v-if="currentStep === 4">
      <h2 class="text-2xl m-6">Enviar documento</h2>
    </div>

    <!-- BOTONES DE NAVEGACIÓN -->
    <div class="m-6 flex justify-end">
      <button @click="previousStep" v-show="currentStep !== 1" class="bg-gray-400 text-white px-6 py-1 font-bold rounded-full hover:bg-gray-500 uppercase">
        <span style="transform: scaleX(-1); display: inline-block;" class="mr-2">&#10132;</span>Retroceder
      </button>

      <button @click="nextStep" class="bg-blue-500 text-gray-200 px-6 py-1 font-bold rounded-full hover:bg-blue-600 uppercase ml-4">
        Continuar<span class="ml-2">&#10132;</span>
      </button>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';

export default {
  props: ['user'],
  components: {
    NavbarComponent
  },
  data() {
    return {
      currentStep: 1,
      loading: false,
      fileNames: [],
      errorMessage: '',
      documentSelected: false
    };
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--; 
      }
    },
    nextStep() {
      if (this.currentStep === 1 && this.fileNames.length === 0) {
        // Verificar si no se ha seleccionado ningún documento
        this.errorMessage = 'Seleccione al menos un documento.';
        return; // No avanzar al siguiente paso
      }
      this.currentStep++; 
    },
    handleDrop(event) {
      const files = event.dataTransfer.files;
      this.loading = true; // Mostrar la barra de carga
      this.errorMessage = ''; // Reiniciar el mensaje de error
      this.documentSelected = false; // Reiniciar la variable documentSelected

      for (let i = 0; i < files.length; i++) { // Simular la carga de cada archivo
        if (this.isValidFileType(files[i])) {
          setTimeout(() => {
            this.fileNames.push(files[i].name); // Agregar el nombre del archivo al array fileNames
            if (i === files.length - 1) { // Ocultar la barra de carga después de cargar todos los archivos
              this.loading = false;
              this.documentSelected = true; // Indicar que se seleccionó al menos un documento
            }
          }, 1000 * (i + 1)); // Tiempo de simulación de carga
        } else {
          this.errorMessage = 'Solo se permiten archivos PDF o DOCX.';
          this.loading = false; // Detener la barra de carga
          break; // Salir del bucle si se encuentra un archivo no permitido
        }
      }
    },
    handleFileChange(event) {
      const files = event.target.files;
      this.loading = true;
      this.errorMessage = '';
      this.documentSelected = false;

      for (let i = 0; i < files.length; i++) {
        if (this.isValidFileType(files[i])) {
          setTimeout(() => {
            this.fileNames.push(files[i].name);
            if (i === files.length - 1) {
              this.loading = false;
              this.documentSelected = true;
            }
          }, 1000 * (i + 1));
        } else {
          this.errorMessage = 'Solo se permiten archivos PDF o DOCX.';
          this.loading = false;
          break;
        }
      }
    },
    removeFile(index) {
      this.fileNames.splice(index, 1);
      if (this.fileNames.length === 0) {
        this.documentSelected = false; // Si no hay archivos seleccionados, establecer documentSelected en falso
      }
    },
    removeErrorMessage() {
      this.errorMessage = ''; 
    },
    isValidFileType(file) {
      const allowedExtensions = ['.pdf', '.docx'];
      const fileType = '.' + file.name.split('.').pop();
      return allowedExtensions.includes(fileType.toLowerCase());
    }
  }
}
</script>