<template>
  <b-navbar toggleable="sm" type="dark" variant="dark">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-navbar-brand
      class="d-none d-lg-block d-xl-block d-sm-none d-md-none"
      href="/"
    >
      <b-icon icon="phone-fill" aria-hidden="true" font-scale="2"></b-icon>
      Tienda Cellphone
    </b-navbar-brand>

    <b-navbar-nav class="ml-auto position-relative">
      <b-nav-form>
        <div class="d-lg-inline-block p2">
        <b-form-input
          @keyup="filtrar()"
          size="sm"
          v-model="buscar"
          class="mr-sm-2 bg-light"
          placeholder="Buscar"
        >
        </b-form-input>
        </div>
        <div class="d-lg-inline-block p-2">
        <b-button
          size="sm"
          @click="limpiar()"
          class="my-2 my-sm-0 d-none d-lg-block d-xl-block d-sm-none d-md-none"
          type="submit"
          variant="primary"
          ><b-icon icon="trash"></b-icon>
          Limpiar</b-button
        >
        </div>
      </b-nav-form>
      <b-button-group class="">
        <b-button
          variant="primary"
          href="/"
          class="d-none d-lg-block d-xl-block d-sm-none d-md-none"
        >
          <b-icon icon="house-fill" font-scale="2"></b-icon>Inicio
        </b-button>

        <b-button
          variant="primary"
          href="/estadisticas"
          class="d-none d-lg-block d-xl-block d-sm-none d-md-none"
        >
          <b-icon icon="graph-up" font-scale="2"></b-icon>Estadisticas
        </b-button>

        <b-button
          variant="primary"
          href="/anuncio"
          class="d-none d-lg-block d-xl-block d-sm-none d-md-none"
        >
          <b-icon icon="plus-square-fill" font-scale="2"></b-icon>
        </b-button>

        <b-button
          variant="primary"
          class="d-none d-lg-block d-xl-block d-sm-none d-md-none"
          v-b-modal.modal-1
        >
          <b-icon icon="cart-plus-fill" font-scale="2"></b-icon>
          <b-badge variant="light">{{ producto }}</b-badge></b-button
        >
      </b-button-group>
    </b-navbar-nav>
    <b-modal id="modal-1" title="Carrito">
      <b-list-group>
        <b-list-group-item v-for="(item, key) in carretilla" :key="key">
          {{item.titulo}}<b-button variant="outline-primary" @click="quitarCarrito()">
            <b-icon icon="trash"></b-icon>
          </b-button>
        </b-list-group-item>
        <h3 v-if="carretilla.length <= 0">Tu carrito esta vacio!!</h3>
      </b-list-group>
    </b-modal>

    <!--Se muestra unicamente en movil-->
    <b-collapse
      id="nav-collapse"
      class="d-lg-none d-xl-none d-sm-inline d-md-block"
    >
      <b-navbar-nav class="d-sm-block">
        <b-nav-item href="/">Inicio</b-nav-item>
        <b-nav-item href="/anuncio">Nuevo anuncio</b-nav-item>
        <b-nav-item href="#">Carrito</b-nav-item>
        <b-nav-item href="/estadisticas">Estadisticas</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { eventBus } from "../main";

export default {
  data: function () {
    return {
      buscar: "",
      producto: 0,
      item: {},
      carretilla: [],
    };
  },
  methods: {
    filtrar() {
      if (this.buscar) {
        eventBus.$emit("filtrarAnuncio", this.buscar);
      }
    },
    limpiar() {
      this.buscar = "";
      eventBus.$emit("limpiarBuscar");
    },
    quitarCarrito() {
      this.producto--;
      this.carretilla.pop();
    },
  },
  mounted() {
    eventBus.$on("carrito", (data) => {
      this.item = data;
      this.producto++;
      this.carretilla.push(this.item);
    });
  },
};
</script>

<style></style>
