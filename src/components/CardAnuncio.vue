<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3">
        <br />
        <sidebar></sidebar>
      </b-col>
      <b-col cols="9">
        <b-container>
          <br />
          <b-row>
            <b-col class="bg-primary">
              <br />
              <div class="input-group">
                <label for="pMenor" class="mx-1">Precio: </label>
                <b-form-input
                  @keyup="filtrarPorPrecioMenor()"
                  id="pMenor"
                  v-model="precioMenor"
                  placeholder="$"
                  class="mx-1"
                ></b-form-input>
                <label for="pMayor"> Hasta </label>
                <b-form-input
                  @keyup="filtrarPorPrecioMayor()"
                  id="pMayor"
                  v-model="precioMayor"
                  placeholder="$"
                  class="mx-1"
                ></b-form-input>
                <b-button variant="warning" @click="limpiar()"
                  >Limpiar</b-button
                >
              </div>
              <br />
            </b-col>
            <b-col class="bg-warning">
              <br />
              <b-button-toolbar key-nav>
                <label for="pMenor">Ordenar por:</label>

                <b-button
                  variant="primary"
                  class="mx-1"
                  @click="ordenarPorPrecio()"
                  >precio
                  <b-icon icon="arrow-down-up"></b-icon>
                </b-button>
                <b-button
                  variant="primary"
                  class="mx-1"
                  @click="ordenarPorFecha()"
                  >Fecha
                  <b-icon icon="arrow-down-up"></b-icon>
                </b-button>
              </b-button-toolbar>
              <br />
            </b-col>
          </b-row>
          <b-row>
       
          </b-row>

          <b-row>
            <b-col v-for="(anuncio, key) in shownCards" :key="key" cols="4" :per-page="perPage" :current-page="currentPage">
              <br />
              <b-card
                id="my-card"
                title=""
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem"
                class="mb-2"
              >
                <b-card-text>
                  <h2 class="text-center">${{ anuncio.precio }}</h2>
                  {{ anuncio.celular.marca }}, {{ anuncio.celular.modelo }},
                  pantalla de {{ anuncio.celular.pantalla }}, ROM de
                  {{ anuncio.celular.rom }}, RAM de {{ anuncio.celular.ram }}
                </b-card-text>

                <b-button href="/verAnuncio" variant="primary"
                  >Ver Mas</b-button
                >
              </b-card>
            </b-col>

            <br /><br />
            <div class="overflow-auto">
              <b-input-group>
                <b-pagination
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  aria-controls="my-table"
                ></b-pagination>
                <label class="mx-3" for="seleccionar"
                  >Articulos por pagina</label
                >
                <b-form-select
                  id="seleccionar"
                  class="mt-3 bg-light"
                  v-model="selected"
                  :options="options"
                  size="md"
                  @change="seleccionar()"
                ></b-form-select>
              </b-input-group>
            </div>
          </b-row>
          <br /><br /><br />
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { db } from "../db";
import { eventBus } from "../main";
import Sidebar from "./Sidebar.vue";

export default {
  name: "CardAnuncio",
  components: {
    Sidebar,
  },
  data: function () {
    return {
      buscar: "",
      anuncios: [],
      anunciosOriginal: [],
      precioAsc: true,
      fechaAsc: true,
      precioMenor: "",
      precioMayor: "",
      perPage: 3,
      currentPage: 1,
      selected: null,
      options: [
        { value: null, text: "Por favor seleccione una opcion" },
        { value: 6, text: "6 articulos" },
        { value: 12, text: "12 articulos" },
        { value: 18, text: "18 articulos" },
      ],
    };
  },
  firestore: {
    anuncios: db.collection("anuncios"),
  },
  methods: {
    ordenarPorPrecio() {
      console.log("ordenar por precio");
      this.precioAsc = !this.precioAsc;
      this.anuncios.sort((a, b) => {
        var retorno = 1;
        if (a.precio > b.precio) {
          retorno = 1;
        } else if (a.precio < b.precio) {
          retorno = -1;
        }
        if (!this.precioAsc) {
          retorno = retorno * -1;
        }
        return retorno;
      });
    },

    ordenarPorFecha: function () {
      console.log("ordenar por fecha");
      this.fechaAsc = !this.fechaAsc;
      this.anuncios.sort((a, b) => {
        var retorno = 1;
        if (a.fecha > b.fecha) {
          retorno = 1;
        } else if (a.fecha < b.fecha) {
          retorno = -1;
        }
        if (!this.fechaAsc) {
          retorno = retorno * -1;
        }
        return retorno;
      });
    },
    filtrarPorPrecioMayor: function () {
      console.log("filtrando por precio");
      if (this.anunciosOriginal.length == 0) {
        this.anunciosOriginal = this.anuncios.slice();
      } else {
        this.anuncios = this.anunciosOriginal.slice();
      }
      this.anuncios = this.anuncios.filter(
        (anuncio) => anuncio.precio <= this.precioMayor
      );
    },
    filtrarPorPrecioMenor: function () {
      console.log("filtrando por precio");
      if (this.anunciosOriginal.length == 0) {
        this.anunciosOriginal = this.anuncios.slice();
      } else {
        this.anuncios = this.anunciosOriginal.slice();
      }
      this.anuncios = this.anuncios.filter(
        (anuncio) => anuncio.precio >= this.precioMenor
      );
    },
    buscarAnuncio: function () {
      console.log("buscar anuncio");
      if (this.anunciosOriginal.length == 0) {
        this.anunciosOriginal = this.anuncios.slice();
      } else {
        this.anuncios = this.anunciosOriginal.slice();
      }
      this.anuncios = this.anuncios.filter((item) => {
        var x = item.celular.marca
          .toLowerCase()
          .indexOf(this.buscar.toLowerCase());
        return x >= 0;
      });
    },
    limpiar: function () {
      if (this.anunciosOriginal.length >= 0) {
        this.anuncios = this.anunciosOriginal.slice();
      }
      this.buscar = "";
      this.precioMenor = "";
      this.precioMayor = "";
    },
    seleccionar: function () {
      
      this.perPage = this.selected;
     
    },
  },
  mounted(){
    
    eventBus.$on("filtrarAnuncio",(data)=>{
     this.buscar=data
     this.buscarAnuncio()
    });

    eventBus.$on("limpiarBuscar",()=>{
      this.limpiar();
    });

  },
  computed: {
    rows() {
      return this.anuncios.length;
    },
    shownCards () { 
      return this.anuncios.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
    }
  },
  
};
</script>

<style></style>
