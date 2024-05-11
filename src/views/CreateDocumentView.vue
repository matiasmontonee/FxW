<template>
  <NavbarComponent :user="user" @logout="logout"/>

    <main class="flex p-4 pt-0 lg:ml-56 bg-gray-100">
      <div class="rounded-2xl w-full overflow-x-auto bg-white">
        <!-- Barra de pasos -->
        <div class="flex justify-between items-center border-b mx-6 border-gray-300 px-20 py-3 text-sm">
          <div class="flex items-center">
            <p :class="{ 'text-blue-500 font-semibold': currentStep === 1, 'text-gray-400': currentStep !== 1 }" class="text-blue-500">1. Cargar firmantes</p>
          </div>
          <div class="flex items-center">
            <p :class="{ 'text-blue-500 font-semibold': currentStep === 2, 'text-gray-400': currentStep !== 2 }" class="text-blue-500">2. Cargar documento</p>
          </div>
          <div class="flex items-center">
            <p :class="{ 'text-blue-500 font-semibold': currentStep === 3, 'text-gray-400': currentStep !== 3 }" class="text-blue-500">3. Enviar</p>
          </div>
        </div>

        <!-- Paso 1: Cargar firmantes -->
        <div v-if="currentStep === 1">
          <div class="flex items-center justify-end m-6 mt-4">
            <!-- TODO: si marca que va a firmar el documento... vamos a agarrar la info de perfil y completar los campos automáticamente... se tiene que validar que existan... por ahora lo dejamos off-->
            <!-- <div class="flex items-center">
              <p class="text-gray-400 mr-4">Voy a firmar este documento</p>
              <div class="relative">
                <label class="inline-flex items-center">
                  <input type="checkbox" class="hidden" v-model="documentSigned" />
                  <div class="w-10 h-3 bg-gray-300 rounded-full mt-1" :style="{ backgroundColor: documentSigned ? 'rgba(59, 130, 246)' : '#D1D5DB' }"></div>
                  <div class="absolute w-5 h-5 bg-white border rounded-full transition-transform transform mt-1" :class="{ 'translate-x-full': documentSigned }"></div>
                </label>
              </div>
            </div> -->
            <button class="text-gray-500 hover:text-gray-400 font-bold mr-6">
              <i class="fas fa-arrow-left mr-2 text-white bg-gray-500 hover:bg-gray-400 rounded-full p-1"></i>Volver
            </button>
            <button @click="nextStep" class="text-blue-500 hover:text-blue-400 font-bold">
              Continuar<i class="fas fa-arrow-right ml-2 text-white bg-blue-500 hover:bg-blue-400 rounded-full p-1"></i>
            </button>
          </div>

          <!-- MENSAJE DE ERROR -->
          <div v-if="signerError" class="m-6 mb-0 text-red-500 bg-red-100 p-2 rounded-md text-center flex justify-between items-center" style="width: 460px;">
            <span class="ml-2 font-bold">{{ signerErrorMessage }}</span>
            <button @click="signerError = false"><i class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-red-300 px-2 rounded-sm"></i></button>
          </div>

          <!-- Campos para los firmantes -->
          <div class="m-6">
            <div v-for="(signer, index) in signers" :key="index" class="mb-12">
              <div class="flex items-center">
                <input type="text" v-model="signer.name" :placeholder="index === 0 ? 'Nombre firmante' : 'Nombre firmante ' + (index + 1)" class="border-gray-300 border-b-2 w-56 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800 mr-12">
                <input type="text" v-model="signer.lastName" :placeholder="index === 0 ? 'Apellido firmante' : 'Apellido firmante ' + (index + 1)" class="border-gray-300 border-b-2 w-56 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800 mr-12">
                <input type="number" v-model="signer.dni" :placeholder="index === 0 ? 'DNI / CI firmante' : 'DNI / CI firmante ' + (index + 1)" class="border-gray-300 border-b-2 w-56 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800">
              </div>
              <div class="flex items-center">
                <select v-model="signer.contact" class="p-2 mr-10 w-36 rounded border border-gray-300">
                  <option value="wpp" selected>WhatsApp</option>
                  <option value="mail">Mail</option>
                </select>
                <!-- Mostrar el campo de correo electrónico solo si la opción seleccionada es 'mail' -->
                <input v-if="signer.contact === 'mail'" type="email" v-model="signer.email" placeholder= 'Email' class="border-gray-300 border-b-2 w-56 focus:outline-none p-2 placeholder-gray-800" style="margin-right: 104px">
                <!-- Mostrar los campos de área y teléfono solo si la opción seleccionada es 'wpp' -->
                <template v-else>
                  <select v-model="signer.areaCode" placeholder="Área" class="border-gray-300 border-b-2 w-35 focus:outline-none p-2 pl-0 mr-6 placeholder-gray-800">
                    <option value="549" selected>🇦🇷 +549</option>
                    <option value="111">🇪🇸 +111</option>
                    <option value="222">🇨🇱 +222</option>
                    <option value="333">🇷🇺 +333</option>
                    <option value="444">🇨🇷 +444</option>
                    <option value="555">🇧🇷 +555</option>
                  </select>
                  <input type="number" v-model="signer.phoneNumber" placeholder="Teléfono" class="border-gray-300 border-b-2 w-56 focus:outline-none p-2 placeholder-gray-800">
                </template>
                <div v-show="signers.length > 1" class="flex flex-col">
                  <label class="inline-flex items-center ml-8">
                    <input type="checkbox" class="mr-2 ml-0.5 cursor-pointer h-4 w-4">
                    <span class="text-gray-500 hover:text-gray-400 cursor-pointer">Guardar como contacto</span>
                  </label>
                  <button @click="removeSigner(index)" class="flex items-center ml-8">
                    <i class="fas fa-minus-circle text-red-500 mr-2 text-xl"></i>
                    <span class="text-gray-500 hover:text-gray-400">Eliminar firmante</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- MENSAJE DE ERROR -->
            <div v-if="maxSignersError" class="mb-12 text-red-500 bg-red-100 p-2 rounded-md text-center flex justify-between items-center" style="width: 460px;">
              <span class="ml-2 font-bold">{{ maxSignersErrorMessage }}</span>
              <button @click="maxSignersError = false"><i class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-red-300 px-2 rounded-sm"></i></button>
            </div>

            <button @click="addSigner" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 font-bold rounded-full">
              <i class="fas fa-search-plus mr-2"></i>Agregar firmante
            </button>
          </div>
        </div>

        <!-- Paso 2: Cargar documento -->
        <div v-if="currentStep === 2">
          <div class="flex items-center justify-between m-6" style="margin-top: 14px">
            <div class="flex items-center text-lg">
              <input type="text" v-model="documentId" class="border-b border-gray-300 mr-4 placeholder-black focus:outline-none w-64" placeholder="Id / Nombre del documento">
              <i class="fas fa-edit text-gray-400"></i>
            </div>
            <div class="flex items-center">
              <button @click="previousStep" class="text-gray-500 hover:text-gray-400 font-bold mr-6">
                <i class="fas fa-arrow-left mr-2 text-white bg-gray-500 hover:bg-gray-400 rounded-full p-1"></i>Volver
              </button>
              <button @click="nextStep" class="text-blue-500 hover:text-blue-400 font-bold">
                Continuar<i class="fas fa-arrow-right ml-2 text-white bg-blue-500 hover:bg-blue-400 rounded-full p-1"></i>
              </button>
            </div>
          </div>

          <!-- Error para ID o nombre del documento -->
          <div v-if="documentIdError" class="m-6 mb-0 text-red-500 bg-red-100 p-2 rounded-md text-center text-blue-900 flex justify-between items-center w-96">
            <span class="ml-2 font-bold">{{ documentIdErrorMessage }}</span>
            <button @click="removeErrorMessage('documentIdError')"><i class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-red-300 px-2 rounded-sm"></i></button>
          </div>

          <!-- <ul class="ml-6">
            <li class="mb-2 text-gray-500 flex items-center justify-between w-80">
              <span>Posicionar automáticamente</span>
              <div class="flex items-center">
                <div class="relative mr-4">
                  <label class="inline-flex items-center mt-1">
                    <input type="checkbox" class="hidden" v-model="automaticPositionChecked" />
                    <div class="w-10 h-3 bg-gray-300 rounded-full mt-1" :style="{ backgroundColor: automaticPositionChecked ? 'rgba(59, 130, 246)' : '#D1D5DB' }"></div>
                    <div class="absolute w-5 h-5 bg-white border rounded-full transition-transform transform mt-1" :class="{ 'translate-x-full': automaticPositionChecked }"></div>
                  </label>
                </div>
                <i class="fas fa-info-circle text-xl mt-1"></i>
              </div>
            </li>
            <li class="mb-2 text-gray-500 flex items-center justify-between w-80">
              <span>Pedir foto de DNI/CI + foto Selfie</span>
              <div class="flex items-center">
                <div class="relative mr-4">
                  <label class="inline-flex items-center mt-1">
                    <input type="checkbox" class="hidden" v-model="photoIdChecked" />
                    <div class="w-10 h-3 bg-gray-300 rounded-full mt-1" :style="{ backgroundColor: photoIdChecked ? 'rgba(59, 130, 246)' : '#D1D5DB' }"></div>
                    <div class="absolute w-5 h-5 bg-white border rounded-full transition-transform transform mt-1" :class="{ 'translate-x-full': photoIdChecked }"></div>
                  </label>
                </div>
                <i class="fas fa-info-circle text-xl mt-1"></i>
              </div>
            </li>
            <li class="mb-12 text-gray-500 flex items-center justify-between w-80">
              <span>Firmar en todas las hojas</span>
              <div class="flex items-center">
                <div class="relative mr-4">
                  <label class="inline-flex items-center mt-1">
                    <input type="checkbox" class="hidden" v-model="signAllChecked" />
                    <div class="w-10 h-3 bg-gray-300 rounded-full mt-1" :style="{ backgroundColor: signAllChecked ? 'rgba(59, 130, 246)' : '#D1D5DB' }"></div>
                    <div class="absolute w-5 h-5 bg-white border rounded-full transition-transform transform mt-1" :class="{ 'translate-x-full': signAllChecked }"></div>
                  </label>
                </div>
                <i class="fas fa-info-circle text-xl mt-1"></i>
              </div>
            </li>
          </ul> -->

          <!-- DIV CONTENEDOR DE ARCHIVOS -->
          <div class="m-6" @dragover.prevent @drop.prevent="handleDrop">
            <label for="fileInput" style="width: 550px;" class="w-96 h-60 mx-auto flex flex-col items-center text-center px-4 py-6 hover:bg-blue-100 cursor-pointer border-4 border-blue-400 border-dashed">
              <i class="far fa-file text-gray-400 fa-4x mb-4"></i>
              <p class="text-gray-400 px-32">Arrastrar y soltar el documento aquí o:</p>
              <button @click="openFileInput" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 font-bold rounded-full mt-2">
                <i class="fas fa-search-plus mr-2"></i>Seleccionar archivo
              </button>
              <input id="fileInput" type='file' accept=".pdf, .docx, .png, .jpg, .jpeg" class="hidden" @change="handleFileChange" multiple />
            </label>
          </div>

          <!-- MENSAJE CARGANDO -->
          <div v-if="loading" class="m-6 text-center">
            <div class="inline-block w-24 h-1 bg-blue-500 rounded-full animate-pulse"></div>
            <p class="mt-2 text-gray-500">Cargando...</p>
          </div>

          <!-- MENSAJE DE ERROR -->
          <div v-if="errorMessage" class="m-6 text-red-500 bg-red-100 p-2 rounded-md text-center text-blue-900 flex justify-between items-center w-96">
            <span class="ml-2 font-bold">{{ errorMessage }}</span>
            <button @click="removeErrorMessage('errorMessage')"><i class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-red-300 px-2 rounded-sm"></i></button>
          </div>

          <!-- MOSTRAR ARCHIVOS -->
          <div v-if="fileNames.length > 0" class="m-6 mt-2">
            <div v-for="(name, index) in fileNames" :key="index" class="bg-blue-100 p-2 rounded-md text-center text-blue-900 mb-2 flex justify-between items-center w-96">
              <span class="text-black ml-2">{{ index + 1 }}. {{ name }}</span>
              <button @click="removeFile(index)"><i class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-blue-300 px-2 rounded-sm"></i></button>
            </div>
          </div>  
        </div>

        <!-- Paso 3: Enviar -->
        <div v-if="currentStep === 3">
          <div class="flex items-center justify-end m-6 mt-4">
            <button @click="previousStep" class="text-blue-500 hover:text-blue-400 font-bold mr-6">
              <i class="fas fa-arrow-left mr-2 text-white bg-blue-500 hover:bg-blue-400 rounded-full p-1"></i>Volver
            </button>
            <button class="text-gray-500 hover:text-gray-400 font-bold">
              Continuar<i class="fas fa-arrow-right ml-2 text-white bg-gray-500 hover:bg-gray-400 rounded-full p-1"></i>
            </button>
          </div>

          <div class="m-6">
            <div v-for="(signer, index) in signersData" :key="'signer-' + index">
              <div class="flex items-center">
                <p class="border-gray-300 border-b-2 w-56 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800 mr-6">{{ signer.name }}</p>
                <p class="border-gray-300 border-b-2 w-56 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800 mr-6">{{ signer.lastName }}</p>
                <p class="border-gray-300 border-b-2 w-56 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800 mr-6">{{ signer.contact }}</p>
              </div>

              <div class="flex items-center justify-start mt-4 mb-8">
                <a href="https://sign.rocketpin.com/store_token?tkn=7049" target="_blank" class="bg-gray-200 p-2 rounded-xl text-blue-600 hover:text-blue-500 hover:underline text-lg mr-8">
                  https://sign.rocketpin.com/store_token?tkn=7049
                  <span class="ml-10">
                    <i v-if="!copiedLinks.includes('https://sign.rocketpin.com/store_token?tkn=7049')" @click.prevent="copyLink('https://sign.rocketpin.com/store_token?tkn=7049')" class="fas fa-clone ml-2 mr-1 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                    <i v-else class="fas fa-check-circle ml-2 mr-1 text-green-400"></i>
                  </span>
                </a>
                <div class="flex items-center">
                  <input type="checkbox" class="mr-2 mb-0.5 ml-0.5 cursor-pointer h-4 w-4">
                  <p>Enviar automáticamente</p>
                  <i class="fas fa-info-circle text-xl ml-2 text-gray-500"></i>
                </div>
              </div>
            </div>

            <div class="flex justify-center">
              <router-link to="/requests?enviado=true">
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 font-bold rounded-full">
                  <i class="fas fa-file mr-2"></i>Enviar documento
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
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
      currentStep: 1,
      loading: false,
      fileNames: [],
      errorMessage: '',
      documentSelected: false,
      signers: [{ name: '', lastName: '', dni: '', areaCode: '', phoneNumber: '', contact: 'wpp' }],
      signerError: false,
      signerErrorMessage: 'Por favor, completa todos los datos de los firmantes.',
      maxSignersError: false,
      maxSignersErrorMessage: 'Se ha alcanzado el límite máximo de firmantes (6).',
      documentSigned: false,
      documentId: '',
      documentIdError: false, 
      documentIdErrorMessage: 'Ingrese el ID o nombre del documento.',
      automaticPositionChecked: false,
      photoIdChecked: false,
      selfieChecked: false,
      signAllChecked: false,
      copiedLinks: []
    };
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
    openFileInput() {
      document.getElementById('fileInput').click(); // Subir archivos mediante el botón
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--; 
      }
    },
    nextStep() {
      // Verificar si todos los campos del firmante están completos o el checkbox tildado
      if (this.currentStep === 1 && !this.documentSigned && this.signers.some(signer => {
        if (signer.contact === 'wpp') {
          return signer.name.trim() === '' || signer.lastName.trim() === '' || String(signer.dni).trim() === '' || String(signer.areaCode).trim() === '' || String(signer.phoneNumber).trim() === '' || signer.contact.trim() === '';
        } else if (signer.contact === 'mail') {
          // Verificar si el contacto es por correo electrónico y si el campo de correo electrónico está vacío
          return signer.name.trim() === '' || signer.lastName.trim() === '' || String(signer.dni).trim() === '' || (!signer.email || signer.email.trim() === '') || signer.contact.trim() === '';
        }
      })) {
        this.signerError = true;
        return; // No avanzar al siguiente paso
      }

      // Limpiar el mensaje de error de los firmantes al avanzar al siguiente paso después de haber ingresado nombres de firmantes
      if (this.currentStep === 1) {
        this.signerError = false;
      }

      // Almacenar los datos de los firmantes en una propiedad del componente
      this.signersData = this.signers.map(signer => ({
        name: signer.name,
        lastName: signer.lastName,
        dni: signer.dni,
        contact: signer.contact === 'wpp' ? `${signer.areaCode} ${signer.phoneNumber}` : signer.email
      }));

      // Mostrar los datos de los firmantes en la consola
      console.log('Datos de los firmantes:', this.signersData);

      // Verificar si el campo del ID o nombre del documento está vacío
      if (this.currentStep === 2 && !this.documentId.trim()) {
        this.documentIdError = true;
        return; // No avanzar al siguiente paso
      }

      // Verificar si no se ha seleccionado ningún documento
      if (this.currentStep === 2 && this.fileNames.length === 0) {
        this.errorMessage = 'Seleccione un documento.';
        return;
      }
      
      // Si pasa todas las validaciones, avanzar al siguiente paso
      this.errorMessage = '';
      this.currentStep++; 
    },
    handleDrop(event) {
      const files = event.dataTransfer.files;
      const file = files[0]; // Obtener el primer archivo arrastrado
      this.handleFile(file);
    },
    handleFileChange(event) {
      const file = event.target.files[0]; // Obtener el primer archivo del evento
      this.handleFile(file);
    },
    handleFile(file) {
      this.loading = true;
      this.errorMessage = '';
      this.documentSelected = false;

      // TODO: const reader = new FileReader();

      // reader.onload = () => {
      //   const base64Data = reader.result.split(',')[1]; // Extracting base64 data from result
      //   // Now you can send base64Data to your API
      //   this.sendToAPI(base64Data);

      //   // Update UI after sending the data
      //   this.fileNames = [file.name]; // Replace file names with the new file
      //   this.loading = false;
      //   this.documentSelected = true;
      // };

      if (this.isValidFileType(file)) {
        setTimeout(() => {
          this.fileNames = [file.name]; // Reemplazar los nombres de archivo con el nuevo archivo
          this.loading = false;
          this.documentSelected = true;
        }, 1000); // Tiempo de simulación de carga
      } else {
        this.errorMessage = 'Solo archivos PDF, DOCX, JPG o PNG.';
        this.loading = false;
      }
    },
    removeFile(index) {
      this.fileNames.splice(index, 1);
      if (this.fileNames.length === 0) {
        this.documentSelected = false; // Si no hay archivos seleccionados, documentSelected es falso
      }
    },
    removeErrorMessage(errorType) {
      if (errorType === 'documentIdError') {
        this.documentIdError = false;
      } else if (errorType === 'errorMessage') {
        this.errorMessage = '';
      }
    },
    isValidFileType(file) {
      const allowedExtensions = ['.pdf', '.docx', '.jpg', '.jpeg', '.png'];
      const fileType = '.' + file.name.split('.').pop();
      return allowedExtensions.includes(fileType.toLowerCase());
    },
    addSigner() {
      if (this.signers.length < 6) {
        this.signers.push({ name: '', lastName: '', dni: '', areaCode: '', phoneNumber: '', contact: 'wpp' }); // Agregar un nuevo objeto de firmante con campos vacíos
      } else {
        this.maxSignersError = true; // Mostrar el mensaje de error
      }
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
        this.signers[index].contact = '';
      }
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
  }
}
</script>
