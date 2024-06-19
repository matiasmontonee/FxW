this.todasLasSolicitudes = {
    "id_seguimiento": "b3cf2db0c9ce729e4d",
    "created_at": 1718730225,
    "urls": [
        {
            "link": "https://firmasxw.com/?tkn=18110d1158b725205131",
            "name": "Luis Lacoste",
            "dni": "43795269",
            "contact": "5493586005012",
            "method": "wpp",
            "id_custom": "18110d1158b725205131"
        },
        {
            "link": "https://firmasxw.com/?tkn=65f0132c2c4ff97bf6d9",
            "name": "name2",
            "dni": "43795269",
            "contact": "luis@hotmail.com",
            "method": "mail",
            "id_custom": "65f0132c2c4ff97bf6d9"
        }
    ]
};
return this.todasLasSolicitudes;



<div id="app" class="flex items-center justify-start mt-4 mb-8">
    <span>Pedir foto de DNI/CI + foto Selfie</span>
    <div class="flex items-center">
        <div class="relative mr-4">
            <label class="inline-flex items-center mt-1 cursor-pointer">
                <input type="checkbox" class="hidden" v-model="signer.sendWithDNI" @change="handleDNIChange(signer)" />
                <div class="w-10 h-5 bg-gray-300 rounded-full mt-1 transition-colors"
          :class="{'bg-blue-500': signer.sendWithDNI }">
                <div class="absolute left-1 top-0.5 w-4 h-4 bg-white border rounded-full transition-transform transform"
            :class="{'translate-x-full': signer.sendWithDNI }"></div>
    </div>
</label>
    </div >
    <i @mouseover="showInfoMessage = 'photoId'" @mouseleave="showInfoMessage = false"
class="fas fa-info-circle text-xl mt-1 text-gray-500 hover:text-gray-400 cursor-pointer" ></i >
    <div v-if="showInfoMessage === 'photoId'"
        class="absolute bg-gray-200 rounded-lg text-sm py-1 px-6 w-1/5 top-1/5 text-gray-700 shadow-lg z-10 mr-4 mt-32">
        <p>El firmante deberá tomar una foto del documento de identidad por ambos lados + foto selfie para firmar (FxW no valida las fotos). Las fotos quedarán en el informe de firmas. Solo se puede solicitar esta información con nuestro asistente FirmIA.
        </p>
    </div>
  </div >
</div >

<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      signer: {
        sendWithDNI: false
      },
      showInfoMessage: false
    },
    methods: {
      handleDNIChange(signer) {
        // Log the current state of sendWithDNI
        console.log('DNI change:', signer.sendWithDNI);
      }
    }
  });
</script>
