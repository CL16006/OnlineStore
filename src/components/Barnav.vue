<template>
  <b-navbar toggleable="sm" type="dark" variant="dark">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-navbar-brand href="/">
      <b-icon icon="phone-fill" aria-hidden="true" font-scale="2"></b-icon>
      Tienda Cellphone
    </b-navbar-brand>

    <b-navbar-nav>
      <b-row class="align-items-center ">
        <b-col>
      <b-form-input
        @keyup="filtrar()"
        size="sm"
        v-model="buscar"
        class="d-none d-lg-block d-xl-block d-sm-none d-md-none bg-light"
        placeholder="Buscar"
      >
      </b-form-input></b-col>
      <b-col>
      <b-button
        size="sm"
        @click="limpiar()"
        class="d-none d-lg-block d-xl-block d-sm-none d-md-none"
        type="submit"
        variant="primary"
        >Limpiar</b-button>
      </b-col>
      <b-col>
      <b-button
        variant="primary"
        href="/"
        class="d-none d-lg-block d-xl-block d-sm-none d-md-none"
      >
        <b-icon icon="house-fill" aria-hidden="true" font-scale="2"></b-icon
        >Inicio
      </b-button></b-col>
      <b-col cols="3">
      <b-button
        variant="primary"
        href="/estadisticas"
        class="d-none d-lg-block d-xl-block d-sm-none d-md-none"
      >
        <b-icon icon="graph-up" aria-hidden="true" font-scale="2"></b-icon
        >Estadisticas
      </b-button></b-col>
      <b-col cols="3">
      <b-button
        variant="primary"
        href="/anuncio"
        class="d-none d-lg-block d-xl-block d-sm-none d-md-none"
      >
        <b-icon
          icon="plus-square-fill"
          aria-hidden="true"
          font-scale="2"
        ></b-icon
        >Nuevo Anuncio
      </b-button></b-col>
      <b-col cols="3">
      <b-button
        variant="primary"
        href="/carrito"
        class="d-none d-lg-block d-xl-block d-sm-none d-md-none"
      >
        <b-icon icon="cart-plus-fill" aria-hidden="true" font-scale="2"></b-icon
        >Carrito <b-badge variant="light">+4</b-badge></b-button
      >
      </b-col>
      </b-row>
    </b-navbar-nav>

    <!--Se muestra unicamente en movil-->
    <b-collapse
      id="nav-collapse"
      class="d-lg-none d-xl-none d-sm-inline d-md-block"
    >
      <b-navbar-nav class="d-sm-block">
        <b-nav-item href="/">Inicio</b-nav-item>
        <b-nav-item href="/anuncio">Nuevo anuncio</b-nav-item>
        <b-nav-item href="/carrito">Carrito</b-nav-item>
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
  },
};
</script>

<style></style>
