<template>
  <div>
    <b-button v-b-toggle.sidebar-1 variant="info"><b-icon icon="funnel"></b-icon>Filtrar</b-button>
    <b-sidebar id="sidebar-1" title="Filtrar" bg-variant="dark" text-variant="light" sidebar-class="border-right border-danger" no-header>
      <div class="p-3 border-light">
        <b-form-checkbox v-model="nuevo" name="check-button" @change="filtrarNuevo()" switch>
      Nuevo<b></b>
    </b-form-checkbox>
      </div>
      <div class="p-3 border-light">
        <h4>Marcas</h4>
        <b-form-group label="" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        id="checkbox-group-marcas"
        v-model="selectedMarca"
        :options="marcas"
        :aria-describedby="ariaDescribedby"
        name="marcas"
        @change="filtrar()"
      ></b-form-checkbox-group>
    </b-form-group>
      </div>
      <div class="p-3 border-light">
        <h4>Sistema</h4>
        <b-form-group label="" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        id="checkbox-group-sistema"
        v-model="selectedSistema"
        :options="sistemas"
        :aria-describedby="ariaDescribedby"
        name="sistema"
        @change="filtrar()"
      ></b-form-checkbox-group>
    </b-form-group>
      </div>
      <div class="p-3 border-light">
        <h4>Pantalla</h4>
        <b-form-group label="" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        id="checkbox-group-pantalla"
        v-model="selectedPantalla"
        :options="pantallas"
        :aria-describedby="ariaDescribedby"
        name="pantalla"
        @change="filtrar()"
      ></b-form-checkbox-group>
    </b-form-group>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  data() {
      return {
        nuevo: false,
        selectedMarca:[],
        selectedSistema:[],
        selectedPantalla:[],
        marcas:[{ text: 'iphone', value: 'iphone' },
          { text: 'Samsung', value: 'samsung' },
          { text: 'Xiaomi', value: 'xiaomi' },
          { text: 'Nokia', value: 'nokia' },
          { text: 'Huawei', value: 'huawei' }
          ],
        sistemas:[{ text: 'iOS', value: 'ios' },
          { text: 'Android', value: 'android' },
          { text: 'HarmonyOs', value: 'harmonyOs' }
          ],
        pantallas:[{text:'6.1 pulgadas',value:'6.1 pulgadas'},
        {text:'6.3 pulgadas',value:'6.3 pulgadas'},
        {text:'6.4 pulgadas',value:'6.4 pulgadas'},
        {text:'6.5 pulgadas',value:'6.5 pulgadas'}
        ]
      }
    },
    methods:{
      filtrar(){
        var x={marcas:[],sistemas:[],pantallas:[]}
        if(this.selectedSistema.length>0){
          x.sistemas=this.selectedSistema
        }
        if(this.selectedMarca.length>0){
          x.marcas=this.selectedMarca
        }
        if(this.selectedPantalla.length>0){
          x.pantallas=this.selectedPantalla
        }
        eventBus.$emit("filtrar", x);
   
      },
      filtrarNuevo(){
      eventBus.$emit("filtrarNuevo",this.nuevo);
     // console.log('filtrando nuevoS')
      }
    }
    
}
</script>

<style>

</style>