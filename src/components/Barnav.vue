<template>
    <b-navbar toggleable="sm" type="dark" variant="dark">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-navbar-brand href="/">
      <b-icon icon="phone-fill" aria-hidden="true" font-scale="2"></b-icon>
      Tienda Cellphone
    </b-navbar-brand>
    
    <b-navbar-nav class="ml-auto">
       <b-button variant="primary" href="/" class="d-none d-lg-block d-xl-block d-sm-none d-md-none">
        <b-icon icon="house-fill" aria-hidden="true" font-scale="2"></b-icon>Inicio
        </b-button>
        <b-button variant="primary" href="/estadisticas" class="d-none d-lg-block d-xl-block d-sm-none d-md-none">
        <b-icon icon="graph-up" aria-hidden="true" font-scale="2"></b-icon>Estadisticas
        </b-button>
        <b-button variant="primary" href="/anuncio" class="d-none d-lg-block d-xl-block d-sm-none d-md-none">
        <b-icon icon="plus-square-fill" aria-hidden="true" font-scale="2"></b-icon>Nuevo Anuncio
        </b-button>       
        <b-button variant="primary" href="/carrito" class="d-none d-lg-block d-xl-block d-sm-none d-md-none">
        <b-icon icon="cart-plus-fill" aria-hidden="true" font-scale="2"></b-icon>Carrito
        <b-badge variant="danger">+4</b-badge></b-button>      
    </b-navbar-nav>
    
    <!--Se muestra unicamente en movil-->
    <b-collapse id="nav-collapse" class=" d-lg-none d-xl-none d-sm-inline d-md-block">
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
import {eventBus} from '../main'

export default {
  data:function(){
    return{
      buscar:'',
      anunciosOriginal:[],
      anuncios:[],
    }
  },
  methods:{
      emitMethod () {
       eventBus.$emit('buscarEvent', this.anuncios);
      }
       
    },
   

}
</script>

<style>

</style>