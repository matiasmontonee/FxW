<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50"></div>
      <div class="bg-white p-6 rounded shadow-lg relative h-3/4 w-3/4">
        <div class="max-h-full overflow-y-auto">
        <h2 class="text-xl font-bold mb-8 text-center sm:text-left">Nueva solicitud de bot</h2>

        <!-- Campos para cada firmante -->
        <template v-for="index in numSigners" :key="index">
          <div class="flex flex-col lg:flex-row lg:mb-8">
            <input type="text" :placeholder="`Nombre ${index}`" class="border-b border-gray-400 mr-4 text-lg mb-4 lg:mb-0" style="width: calc(100% - 1rem);"/>
            <input type="text" :placeholder="`Apellido ${index}`" class="border-b border-gray-400 mr-4 text-lg mb-4 lg:mb-0" style="width: calc(100% - 1rem);"/>
            <input type="text" :placeholder="`DNI ${index}`" class="border-b border-gray-400 mr-4 text-lg mb-4 lg:mb-0" style="width: calc(100% - 1rem);"/>
          </div>
          <div class="flex flex-col lg:flex-row lg:mb-8">
            <input type="text" :placeholder="`Área ${index}`" class="border-b border-gray-400 mr-4 text-lg mb-4 lg:mb-0" style="width: calc(100% - 1rem);"/>
            <input type="text" :placeholder="`Teléfono ${index}`" class="border-b border-gray-400 mr-4 text-lg mb-4 lg:mb-0" style="width: calc(100% - 1rem);"/>
          </div>
        </template>

        <!-- Otros campos del formulario -->
        <div class="flex flex-col lg:flex-row lg:mb-8">
          <input type="text" placeholder="Id de Solicitud" class="border-b border-gray-400 mr-4 text-lg mb-4 lg:mb-0" style="width: calc(100% - 1rem);">
          <input type="text" placeholder="Adjuntar archivo" class="border-b border-gray-400 mr-4 text-lg mb-4 lg:mb-0" style="width: calc(100% - 1rem);">
          <input type="text" placeholder="Hyperlink" class="border-b border-gray-400 mr-4 text-lg mb-4 lg:mb-0" style="width: calc(100% - 1rem);">
        </div>
        <textarea placeholder="Instrucciones adicionales" class="border-b border-gray-400 text-lg" style="width: calc(100% - 1rem);" rows="1"></textarea>

        <div class="flex justify-end mt-4">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Crear</button>
          <button @click="closeModal" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4">Cerrar</button>
        </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    numSigners: {
      type: Number,
      default: 1
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>