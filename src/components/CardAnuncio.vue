<template>
  <b-container fluid>
    <b-row>
      <b-col class="col-lg-3 col-sm-0">
        <br />
        <div class="d-none d-lg-block d-xl-block d-sm-none d-md-none">
          <sidebar></sidebar>
        </div>
      </b-col>
      <b-col class="col-lg-9 col-sm-12">
        <b-container>
          <br />
          <b-row>
            <b-col
              class="
                bg-primary
                d-none d-lg-block d-xl-block d-sm-none d-md-none
              "
            >
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
                  ><b-icon icon="trash"></b-icon> Limpiar</b-button
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
                >
                  <b-icon icon="arrow-down-up"></b-icon>Precio
                </b-button>
                <b-button
                  variant="primary"
                  class="mx-1 d-none d-lg-block d-xl-block d-sm-none d-md-none"
                  @click="ordenarPorFecha()"
                >
                  <b-icon icon="arrow-down-up"></b-icon>Fecha
                </b-button>
              </b-button-toolbar>
              <sidebar
                class="d-lg-none d-xl-none d-sm-inline d-md-block"
              ></sidebar>
              <br />
            </b-col>
          </b-row>
          <b-row> </b-row>

          <b-row>
            <b-col
              v-for="(anuncio, key) in shownCards"
              :key="key"
              :per-page="perPage"
              :current-page="currentPage"
              :class="colSize"
            >
              <br />
              <b-card
                title=""
                :img-src="anuncio.urlImagen"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem"
                border-variant="primary"
              >
                <b-card-text>
                  <h2>${{ anuncio.precio }}</h2>
                  {{ anuncio.celular.marca }}, {{ anuncio.celular.modelo }},
                  pantalla de {{ anuncio.celular.pantalla }},
                  {{ anuncio.celular.rom }} ROM, {{ anuncio.celular.ram }} RAM
                </b-card-text>
                <router-link
                  :to="{ name: 'Detalles', params: { id: anuncio.id } }"
                >
                  <b-button variant="primary">Ver Más</b-button>
                </router-link>
              </b-card>
            </b-col>
            <br /><br />
            <div class="overflow-auto">
              <br />
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
import { db, storage } from "../db";
import { eventBus } from "../main";
import Sidebar from "./Sidebar.vue";

export default {
  name: "CardAnuncio",
  components: {
    Sidebar,
  },
  data: function () {
    return {
      idAnuncio: "",
      buscar: "",
      anuncios: [],
      imagenes: [],
      urlimagen: "",
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
        { value: 9, text: "9 articulos" },
        { value: 12, text: "12 articulos" },
      ],
      colSize: "col-lg-4 col-sm-12",
    };
  },
  firestore: {
    anuncios: db.collection("anuncios"),
  },
  methods: {
    actualizarColSize() {
      if (window.innerWidth >= 992) {
        // Pantallas grandes (lg)
        this.colSize = "col-lg-4";
      } else {
        // Pantallas pequeñas (sm)
        this.colSize = "col-sm-12";
      }
    },
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
    filtrarPorNuevo: function (data) {
      // console.log("filtrando por nuevo");
      if (this.anunciosOriginal.length == 0) {
        this.anunciosOriginal = this.anuncios.slice();
      } else {
        this.anuncios = this.anunciosOriginal.slice();
      }
      this.anuncios = this.anuncios.filter(
        (anuncio) => anuncio.celular.nuevo >= data
      );
    },
    filtrarVarios: function (data) {
      // console.log("filtrando por nuevo");
      var pantallas = data.pantallas;
      var marcas = data.marcas;
      var sistemas = data.sistemas;
      //var filtrado=[]

      if (this.anunciosOriginal.length == 0) {
        this.anunciosOriginal = this.anuncios.slice();
      } else {
        this.anuncios = this.anunciosOriginal.slice();
      }

      if (pantallas.length > 0) {
        //console.log("filtrando pantallas")
        //recorriendo el array pantallas
        pantallas.forEach((element) => {
          //console.log(element)
          this.anuncios = this.anuncios.filter((anuncio) => {
            return anuncio.celular.pantalla.toLowerCase() == element;
          });
        });
      }

      if (marcas.length > 0) {
        // console.log("filtrando marcas")
        //recorriendo el array marcas
        marcas.forEach((element) => {
          console.log(element);
          this.anuncios = this.anuncios.filter((anuncio) => {
            return anuncio.celular.marca.toLowerCase() == element;
          });
        });
      }
      if (sistemas.length > 0) {
        // console.log("filtrando sistemas")
        //recorriendo el array sistemas
        sistemas.forEach((element) => {
          console.log(element);
          this.anuncios = this.anuncios.filter((anuncio) => {
            return anuncio.celular.sistema.toLowerCase() == element;
          });
        });
      }
    },
    getUrlImagen(IDanuncio) {
      var listRef = storage.ref().child("" + IDanuncio + "/" + IDanuncio + "");
      //obteniendo la url
      listRef
        .getDownloadURL()
        .then((url) => {
          this.urlimagen = url;
        })
        .catch((error) => {
          switch (error.code) {
            case "storage/object-not-found":
              console.log("object not found");
              break;

            case "storage/unauthorized":
              console.log("unauthorized");
              break;

            case "storage/canceled":
              console.log("canceled");
              break;

            case "storage/unknown":
              console.log("unknown");
              break;
          }
        });
    },

    //fin de methods
  },
  beforeDestroy() {
    // Limpia el event listener cuando el componente se destruye
    window.removeEventListener("resize", this.actualizarColSize);
  },
  mounted() {
    // Detecta el cambio de tamaño de la ventana y actualiza colSize en consecuencia
    window.addEventListener("resize", this.actualizarColSize);
    this.actualizarColSize();
    eventBus.$on("filtrarAnuncio", (data) => {
      console.log("recibiedo datos");
      console.log(data);
      this.buscar = data;
      this.buscarAnuncio();
    });

    eventBus.$on("limpiarBuscar", () => {
      this.limpiar();
    });

    eventBus.$on("filtrar", (data) => {
      //filtrando los anuncios
      //console.log(data)
      this.filtrarVarios(data);
    });

    eventBus.$on("filtrarNuevo", (data) => {
      //filtrando por nuevos
      console.log(data);
      this.filtrarPorNuevo(data);
    });
  },
  computed: {
    rows() {
      return this.anuncios.length;
    },
    shownCards() {
      return this.anuncios.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
  },
  created() {},
};
</script>

<style></style>
