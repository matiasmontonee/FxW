<template>
  <NavbarComponent :user="user" @logout="logout"/>

  <div class="mt-10 lg:ml-72 mr-4 border border-gray-300 rounded-md shadow-xl">
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
      <!-- <div class="border-b-2 border-gray-300 px-6 mt-1 mx-2"></div>
      <div class="flex items-center">
        <p :class="{ 'bg-blue-500': currentStep === 3, 'bg-gray-500': currentStep !== 3 }" class="border rounded-full px-2.5 py-0.5 text-white mr-2">3</p>
        <span>Posicionar firmas</span>
      </div> -->
      <div class="border-b-2 border-gray-300 px-6 mt-1 mx-2"></div>
      <div class="flex items-center">
        <p :class="{ 'bg-blue-500': currentStep === 3, 'bg-gray-500': currentStep !== 3 }" class="border rounded-full px-2.5 py-0.5 text-white mr-2">3</p>
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
          <span>Suelta el archivo <span class="font-bold">PDF, DOCX o JPG/PNG</span> aquí o <span class="text-blue-500 font-bold">haz click</span> para buscar en tus documentos.</span>
          <input id="fileInput" type='file' accept=".pdf, .docx, .png, .jpg" class="hidden" @change="handleFileChange" multiple />
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

      <!-- MENSAJE DE ERROR -->
      <div v-if="signerError" class="m-6 mb-0 text-red-500 bg-red-100 p-2 rounded-md text-center flex justify-between items-center w-96" style="width: 450px;">
        <span class="ml-2 font-bold">{{ signerErrorMessage }}</span>
        <button @click="signerError = false"><i class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-red-300 px-2 rounded-sm"></i></button>
      </div>

      <!-- Campos para los firmantes -->
      <div class="m-6">
        <div v-for="(signer, index) in signers" :key="index" class="flex items-center mb-4">
          <div class="flex flex-col">
            <input type="text" v-model="signer.name" :placeholder="index === 0 ? 'Nombre del firmante' : 'Nombre del firmante ' + (index + 1)" class="border-gray-600 border-b w-108 p-2 mb-2">
            <input type="text" v-model="signer.lastName" :placeholder="index === 0 ? 'Apellido del firmante' : 'Apellido del firmante ' + (index + 1)" class="border-gray-600 border-b w-108 p-2 mb-2">
            <input type="number" v-model="signer.dni" :placeholder="index === 0 ? 'DNI del firmante' : 'DNI del firmante ' + (index + 1)" class="border-gray-600 border-b w-108 p-2 mb-2">
            <div class="flex items-center mb-2">
              <select v-model="signer.areaCode" class="border-gray-600 border-b p-2 mr-2 w-36">
                <option value="" disabled selected>Área</option>
                <option value="+591">+591 (BO)</option>
                <option value="+549">+549 (ARG)</option>
                <option value="+55">+55 (BR)</option>
                <option value="+569">+569 (CL)</option>
                <option value="+57">+57 (CO)</option>
                <option value="+593">+593 (EC)</option>
                <option value="+34">+34 (ES)</option>
                <option value="+49">+49 (DE)</option>
                <option value="+1">+1 (US)</option>
                <option value="+521">+521 (MX)</option>
                <option value="+507">+507 (PA)</option>
                <option value="+51">+51 (PE)</option>
                <option value="+598">+598 (UY)</option>
                <option value="+58">+58 (VE)</option>
              </select>
              <input type="number" v-model="signer.phoneNumber" :placeholder="index === 0 ? 'Número de teléfono' : 'Número de teléfono ' + (index + 1)" class="border-gray-600 border-b p-2 w-72">
            </div>
          </div>
          <button @click="removeSigner(index)" v-show="signers.length > 1" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 ml-4 mt-8 rounded-md"><i class="fas fa-trash"></i></button>
        </div>
        <button @click="addSigner" class="bg-blue-500 hover:bg-blue-600 text-gray-200 px-6 py-1 font-bold rounded-full">
          <i class="fas fa-plus mr-2"></i>Agregar
        </button>
      </div>
    </div>

    <!-- Paso 3: Posicionar las firmas -->
    <!-- <div v-if="currentStep === 3">
      <h2 class="text-2xl m-6">Posiciona las firmas <span class="text-gray-400">(opcional)</span></h2>

      <div class="m-6">
        <h3 class="text-lg mb-2">¿Cómo funciona?</h3>

        <p>1. <span class="font-semibold">Clickeá cualquier parte del documento</span> donde quieras agregar la firma.</p>
        <p>2. <span class="font-semibold">Seleccioná el firmante</span> y el campo a posicionar.</p>
      </div>

      <div v-if="documentLoaded" class="m-6">
        PDF 
        <div v-for="(documentUrl, index) in documentUrls" :key="index" class="mb-16">
          <iframe :src="documentUrl" class="w-full h-96" frameborder="0"></iframe>
        </div>
      </div>
    </div> -->

    <!-- Paso 3: Enviar el documento -->
    <div v-if="currentStep === 3">
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
  emits: ['login','logout'],
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
      documentSelected: false,
      signers: [{ name: '', lastName: '', dni: '', areaCode: '', phoneNumber: '' }],
      signerError: false,
      signerErrorMessage: 'Por favor, completa todos los datos de los firmantes.',
      // documentLoaded: false,
      // documentUrls: []
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
      // Verificar si no se ha seleccionado ningún documento
      if (this.currentStep === 1 && this.fileNames.length === 0) {
        this.errorMessage = 'Seleccione al menos un documento.';
        return; // No avanzar al siguiente paso
      }
      
      // Verificar si todos los campos del firmante están completos
      if (this.currentStep === 2 && this.signers.some(signer => {
          return signer.name.trim() === '' || signer.lastName.trim() === '' || String(signer.dni).trim() === '' || signer.areaCode.trim() === '' || String(signer.phoneNumber).trim() === '';
      })) {
          this.signerError = true;
          return; // No avanzar al siguiente paso
      }

      // Reiniciar el mensaje de error de los firmantes si retrocede después de haber agregado un documento
      if (this.currentStep === 1 && this.fileNames.length > 0) {
        this.signerError = false;
      }

      // Limpiar el mensaje de error de los firmantes al avanzar al siguiente paso después de haber ingresado nombres de firmantes
      if (this.currentStep === 2) {
        this.signerError = false;
      }

      // Si pasa todas las validaciones, avanzar al siguiente paso
      this.errorMessage = ''; // Limpiar el mensaje de error
      this.currentStep++; 
    },
    handleDrop(event) {
      const files = event.dataTransfer.files;
      this.loading = true; // Mostrar la barra de carga
      this.errorMessage = ''; // Reiniciar el mensaje de error
      this.documentSelected = false; // Reiniciar la variable documentSelected

      for (let i = 0; i < files.length; i++) { // Simular la carga de cada archivo
        if (this.isValidFileType(files[i])) {
          // Almacenar el documento cargado
          // this.documentUrl = URL.createObjectURL(files[i]);
          // this.documentLoaded = true;
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
          // const fileUrl = URL.createObjectURL(files[i]); // Almacenar la URL del documento cargado
          // this.documentUrls.push(fileUrl); // Agregar la URL del documento al array documentUrls
          // this.documentLoaded = true;
          setTimeout(() => {
            this.fileNames.push(files[i].name);
            if (i === files.length - 1) {
              this.loading = false;
              this.documentSelected = true;
            }
          }, 1000 * (i + 1)); // Tiempo de simulación de carga
        } else {
          this.errorMessage = 'Solo se permiten archivos PDF, DOCX o JPG/PNG.';
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
      const allowedExtensions = ['.pdf', '.docx', '.jpg', '.png'];
      const fileType = '.' + file.name.split('.').pop();
      return allowedExtensions.includes(fileType.toLowerCase());
    },
    addSigner() {
      this.signers.push({ name: '', lastName: '', dni: '', areaCode: '', phoneNumber: '' }); // Agregar un nuevo objeto de firmante con campos vacíos
    },
    removeSigner(index) {
      // Verificar si hay más de un firmante antes de eliminar
      if (this.signers.length > 1) {
        this.signers.splice(index, 1); // Eliminar el firmante en la posición especificada
      } else {
        // Limpiar los campos del primer firmante en lugar de eliminarlo
        this.signers[index].name = '';
        this.signers[index].lastName = '';
        this.signers[index].dni = '';
        this.signers[index].areaCode = '';
        this.signers[index].phoneNumber = '';
      }
    }
  }
}
</script>