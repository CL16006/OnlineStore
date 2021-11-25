<template>
  <b-container class="bg-light">
    <br /><br />
    <b-row>
      <b-col>
        <div>
          <b-img
            v-bind="mainProps"
            rounded
            :src="anuncio.urlImagen"
            fluid
            alt="Responsive image"
          ></b-img>
        </div>
      </b-col>
      <b-col>
        <b-list-group>
          <b-list-group-item
            ><h2>{{ anuncio.titulo }}</h2></b-list-group-item
          >
          <b-list-group-item
            ><p>Marca:{{ anuncio.celular.marca }}</p>
            <h3>${{ anuncio.precio }}.00</h3></b-list-group-item
          >
          <b-list-group-item
            ><b-button pill variant="outline-success">
              <b-icon icon="cart4"></b-icon>Agregar a tu carrito</b-button
            >
            <b-button pill variant="success" v-b-modal.comprado>Comprar</b-button>
             <b-modal id="comprado" title="Compra Realizada">
          <p class="my-4">Gracias por su compra!</p>
        </b-modal>
          </b-list-group-item>
          <b-list-group-item
            ><b-icon icon="calendar-check"></b-icon>Ver
            disponibilidad</b-list-group-item
          >
          <b-list-group-item
            ><b-icon icon="shield-lock-fill"></b-icon> Tu compra 100%
            segura</b-list-group-item
          >
          <b-list-group-item
            ><b-icon icon="credit-card2-back"></b-icon> Paga con tarjeta de
            credito o debito</b-list-group-item
          >
          <b-list-group-item>
            <b-icon icon="person-square"></b-icon>Vendedor:
            {{ anuncio.vendedor }}
            <b-icon icon="telephone-fill"></b-icon>Telefono:
            {{ anuncio.telefono }}
          </b-list-group-item>
          <b-list-group-item
            ><h3>Especificaciones Tecnicas</h3>
            <b-list-group>
              <b-list-group-item
                >Memoria de Almacenamiento:
                {{ anuncio.celular.rom }}</b-list-group-item
              >
              <b-list-group-item
                >Memoria RAM: {{ anuncio.celular.ram }}</b-list-group-item
              >
              <b-list-group-item
                >Sistema Operativo:
                {{ anuncio.celular.sistema }}</b-list-group-item
              >
              <b-list-group-item
                >Tamaño de pantalla:
                {{ anuncio.celular.pantalla }}</b-list-group-item
              >
              <b-list-group-item
                >Modelo: {{ anuncio.celular.modelo }}</b-list-group-item
              >
            </b-list-group>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <b-row>
      <br />
      <b-col cols="1"></b-col>
      <b-col cols="8">
        <h2>Descripcion del producto</h2>
        <p>{{ anuncio.descripcion }}</p>
      </b-col>
    </b-row>
    <br />
  </b-container>
</template>
<script>
import { db } from "../db";

export default {
  data() {
    return {
      id: this.$route.params.id,
      anuncio: {},
      mainProps: {
        center: true,
        blank: false,
        blankColor: "#bbb",
        width: 400,
        height: 400,
        class: "",
      },
    };
  },
  methods: {},
  mounted() {
    db.collection("anuncios")
      .doc(this.id)
      .get()
      .then((snapshot) => {
        const document = snapshot.data();
        // console.log(document)
        // do something with document
        this.anuncio = document;
      });
  },
};
</script>
