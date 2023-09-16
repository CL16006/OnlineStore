<template>
  <b-container>
    <br /><br />
    <b-row>
      <b-col cols="3">
        <!-- Tarjetas de estadísticas -->
     
        <b-card
          title="Estadísticas"
          tag="article"
          style="max-width: 20rem; background-color: #f3f3f3"
          class="mb-2"
        >
          <b-card-text>
            <p>Anuncios Registrados</p>
            <h2>{{ anuncios.length }}</h2>

            <p>Anuncios Hechos Hoy</p>
            <h2>100</h2>

            <p>Visitas</p>
            <h2>+10K</h2>
          </b-card-text>
        </b-card>
   
      </b-col>
      <b-col cols="9">
        <b-card
          title="Anuncios por Marca"
          tag="article"
          style="max-width: 20rem; background-color: #f3f3f3"
          class="mb-2"
        >
          <b-card-text>
            <b-row>
              <b-col cols="6">
                <!-- Tarjeta iPhone -->
                <b-card
                  title="iPhone"
                  tag="iPhone"
                  style="max-width: 20rem; background-color: #f3f3f3"
                  class="mb-2"
                >
                  <b-card-text>
                    <h2>{{ contadorMarcas["iphone"] }}</h2>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col cols="6">
                <!-- Tarjeta Xiaomi -->
                <b-card
                  title="Xiaomi"
                  tag="xiaomi"
                  style="max-width: 20rem; background-color: #f3f3f3"
                  class="mb-2"
                >
                  <b-card-text>
                    <h2>{{ contadorMarcas["xiaomi"] }}</h2>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col cols="6">
                <!-- Tarjeta Samsung -->
                <b-card
                  title="Samsung"
                  tag="samsung"
                  style="max-width: 20rem; background-color: #f3f3f3"
                  class="mb-2"
                >
                  <b-card-text>
                    <h2>{{ contadorMarcas["samsung"] }}</h2>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col cols="6">
                <!-- Tarjeta Samsung -->
                <b-card
                  title="Huawei"
                  tag="huawei"
                  style="max-width: 20rem; background-color: #f3f3f3"
                  class="mb-2"
                >
                  <b-card-text>
                    <h2>{{ contadorMarcas["huawei"] }}</h2>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col cols="6">
                <!-- Tarjeta Samsung -->
                <b-card
                  title="Nokia"
                  tag="nokia"
                  style="max-width: 20rem; background-color: #f3f3f3"
                  class="mb-2"
                >
                  <b-card-text>
                    <h2>{{ contadorMarcas["nokia"] }}</h2>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col cols="6">
                <!-- Tarjeta Samsung -->
                <b-card
                  title="Motorola"
                  tag="motorola"
                  style="max-width: 20rem; background-color: #f3f3f3"
                  class="mb-2"
                >
                  <b-card-text>
                    <h2>{{ contadorMarcas["motorola"] }}</h2>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { db } from "../db";

export default {
  data: function () {
    return {
      anuncios: [],
      contadorMarcas: {},
    };
  },
  created() {
    // Realiza una consulta a Firestore y asigna los resultados a "anuncios"
    db.collection("anuncios")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Agrega los datos del documento a "anuncios"
          this.anuncios.push(doc.data());
        });

        // Llama a anunciosPorMarca después de obtener los datos
        this.anunciosPorMarca();
      })
      .catch((error) => {
        console.error("Error al obtener los datos de Firestore:", error);
      });
  },
  mounted() {
    this.anunciosPorMarca();
  
  },
  methods: {
    anunciosPorMarca() {
      for (const anuncio of this.anuncios) {
        const marca = anuncio.celular.marca.toLowerCase(); // Convierte a minúsculas
        if (this.contadorMarcas[marca]) {
          this.contadorMarcas[marca]++;
        } else {
          this.contadorMarcas[marca] = 1;
        }
      }

      //console.log(this.contadorMarcas);
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 80%;
  margin: auto;
}
</style>
