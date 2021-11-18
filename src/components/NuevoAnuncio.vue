<template>
  <b-container>
    <br /><br />
    <h1 class="text-center">NUEVO ANUNCIO</h1>
    <b-row>
      <b-col cols="5" class="bg-dark text-light">
        <div>
          <h3>Datos del Telefono</h3>
          <b-form-group label="Estado">
            <b-form-radio
              @change="nuevoTrue()"
              v-model="dnuevo"
              name="some-radios"
              >Nuevo</b-form-radio
            >
            <b-form-radio
              @change="nuevoFalse()"
              v-model="dnuevo"
              name="some-radios"
              >Usado</b-form-radio
            > </b-form-group
          ><br />
          <label for="marca">Marca: </label>
          <b-form-input
            id="marca"
            v-model="dmarca"
            placeholder="Marca"
          ></b-form-input
          ><br />
          <label for="modelo">Modelo: </label>
          <b-form-input
            id="modelo"
            v-model="dmodelo"
            placeholder="Modelo"
          ></b-form-input
          ><br />
          <label for="pantalla">Pantalla: </label>
          <b-form-input
            id="pantalla"
            v-model="dpantalla"
            placeholder="Pantalla"
          ></b-form-input
          ><br />
          <label for="sistema">Sistema: </label>
          <b-form-select
            id="sistema"
            v-model="dsistema"
            :options="sistemaOperativos"
            size="sm"
            class="mt-3"
          ></b-form-select
          ><br />
          <label for="rom">ROM: </label>
          <b-form-input
            id="rom"
            v-model="drom"
            placeholder="almacenamiento interno"
          ></b-form-input
          ><br />
          <label for="ram">RAM: </label>
          <b-form-input id="ram" v-model="dram" placeholder="RAM"></b-form-input
          ><br />
        </div>
        <br /><br />
      </b-col>
      <b-col cols="6" class="bg-dark text-light">
        <label for="titulo">Titulo breve del anuncio: </label>
        <b-form-input
          id="titulo"
          v-model="dtitulo"
          placeholder="Titulo"
        ></b-form-input
        ><br />
        <label for="vendedor">Vendedor: </label>
        <b-form-input
          id="vendedor"
          v-model="dvendedor"
          placeholder="Vendedor"
        ></b-form-input
        ><br />
        <label for="telefono">Telefono: </label>
        <b-form-input
          id="telefono"
          v-model="dtelefono"
          placeholder="Telefono"
        ></b-form-input
        ><br />
        <b-form-textarea
          id="textarea"
          v-model="ddescripcion"
          placeholder="Ingrese una breve descripcionb..."
          rows="3"
          max-rows="6"
        ></b-form-textarea><br>
        <label for="precio">Precio: </label>
        <b-form-input id="precio" v-model="dprecio" placeholder="$"></b-form-input><br>
        <b-button variant="danger" href="/">Cancelar</b-button>
        <b-button @click="guardarAnuncio();toast('b-toaster-bottom-center', true)" variant="success">Guardar</b-button>
        <b-toast id="example-toast" title="Anuncio se guardo" static no-auto-hide>
        Anuncio guardado satisfactoriamente!
       </b-toast>
      </b-col>
    </b-row>
    <br /><br />
  </b-container>
</template>

<script>
import { db } from "../db";


export default {
  name: "NuevoAnuncio",
  components: {},
  data: function () {
    return {
      ddescripcion: "",
      dfecha: null,
      dtelefono: "",
      dtitulo: "",
      dvendedor: "",
      dprecio: "",
      dnuevo: null,
      dmarca: "",
      dmodelo: "",
      dpantalla: "",
      dram: "",
      drom: "",
      dsistema: null,
      sistemaOperativos: [
        { value: null, text: "Por favor seleccione una opcion" },
        { value: "iOS", text: "iOS" },
        { value: "Android", text: "Android" },
        { value: "HarmonyOs", text: "HarmonyOs" },
        {value:"EMUI 8.2 (Basado en Android O)",text:"EMUI 8.2 (Basado en Android O)"},
      ],
    };
  },
  methods: {
    guardarAnuncio: function () {
      var prc=parseInt(this.dprecio)
      var hoy=new Date()
      
      db.collection("anuncios").add({
        descripcion: this.ddescripcion,
        celular: {
          marca: this.dmarca,
          modelo: this.dmodelo,
          nuevo: this.dnuevo,
          pantalla: this.dpantalla,
          ram: this.dram,
          rom: this.drom,
          sistema: this.dsistema,
        },
        fecha: hoy,
        precio: prc,
        telefono: this.dtelefono,
        titulo: this.dtitulo,
        vendedor: this.dvendedor,
      });
      this.limpiar();
      
    },
    nuevoTrue: function () {
      console.log(this.dfecha);
      this.dnuevo = true;
      console.log(this.dnuevo);
    },
    nuevoFalse: function () {
      console.log(this.dnuevo);
      this.dnuevo = false;
      console.log(this.dnuevo);
    },
    limpiar:function(){
      this.ddescripcion= "";
      this.dfecha= '';
      this.dtelefono="";
      this.dtitulo="";
      this.dvendedor= "";
      this.dprecio= "";
      this.dnuevo= null;
      this.dmarca= "";
      this.dmodelo= "";
      this.dpantalla= "";
      this.dram= "";
      this.drom= "";
      this.dsistema= null;
    },
     toast(toaster, append = false) {
        this.counter++
        this.$bvToast.toast(`Toast ${this.counter} body content`, {
          title: `Toaster ${toaster}`,
          toaster: toaster,
          solid: true,
          appendToast: append
        })
      }
    
  },
};
</script>

<style></style>
