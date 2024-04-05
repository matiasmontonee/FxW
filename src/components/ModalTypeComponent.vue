<template>
  <div>
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-50"></div>
      <div class="bg-white p-6 rounded shadow-lg relative w-3/4 sm:w-2/4">
        <h2 class="text-xl font-bold mb-4 text-center">Seleccione un tipo</h2>
        <div class="flex flex-col relative">
          <select v-model="selectedOption" @change="updateNumSigners" class="border border-gray-500 px-2 py-1 rounded appearance-none w-full">
            <option value="" disabled selected hidden>Seleccione una opción</option>
            <option value="firmante6">Múltiples firmantes</option>
            <option value="firmante1">1 firmante websign</option>
            <option value="firmante1">1 firmante listo</option>
            <option value="firmante6">6 firmantes</option>
            <option value="firmante5">5 firmantes</option>
            <option value="firmante4">4 firmantes</option>
            <option value="firmante1">1 firmante DNI</option>
            <option value="firmante3">3 firmantes</option>
            <option value="firmante2">2 firmantes</option>
            <option value="firmante1">1 firmante</option>
          </select>
          <div class="absolute inset-y-0 right-2 top-1 flex items-center pointer-events-none">
            <svg class="w-6 h-6 fill-current text-gray-700" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L5 7h10l-5 5z" />
            </svg>
          </div>
        </div>
        <div class="flex justify-end">
          <button @click="closeModal" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4">Cerrar</button>
        </div>
      </div>
    </div>
    <component v-if="selectedOption !== ''" :is="selectedModal" @close="selectedOption = ''" :numSigners="numSigners"/>
  </div>  
</template>

<script>
import ModalFormComponent from './ModalFormComponent.vue';

export default {
  components: {
    ModalFormComponent
  },
  data() {
    return {
      selectedOption: '',
      modals: {
        firmante1: 'ModalFormComponent',
        firmante2: 'ModalFormComponent',
        firmante3: 'ModalFormComponent',
        firmante4: 'ModalFormComponent',
        firmante5: 'ModalFormComponent',
        firmante6: 'ModalFormComponent'
      },
      numSigners: 1 // Por defecto, muestra campos para 1 firmante
    };
  },
  computed: {
    selectedModal() {
      return this.modals[this.selectedOption];
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
      this.selectedOption = '';
    },
    updateNumSigners() {
      // Actualiza la cantidad de firmantes según la opción seleccionada
      switch (this.selectedOption) {
        case 'firmante1':
          this.numSigners = 1;
          break;
        case 'firmante2':
          this.numSigners = 2;
          break;
        case 'firmante3':
          this.numSigners = 3;
          break;
        case 'firmante4':
          this.numSigners = 4;
          break;
        case 'firmante5':
          this.numSigners = 5;
          break;
        case 'firmante6':
          this.numSigners = 6;
          break;
        default:
          this.numSigners = 1;
      }
    }
  }
}
</script>