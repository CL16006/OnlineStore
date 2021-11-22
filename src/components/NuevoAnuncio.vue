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
          >
        </div>

        <br /><br />
      </b-col>
      <b-col cols="6" class="bg-dark text-light">
        <br /><br /><br /><br /><br/><br/>
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
        <label for="telefono">Telefono </label>
        <b-form-input
          id="telefono"
          v-model="dtelefono"
          :state="telState"
          placeholder="9999-9999"
        ></b-form-input><br />
        <label for="textarea">Descripción: </label>
        <b-form-textarea
          id="textarea"
          v-model="ddescripcion"
          placeholder="Ingrese una breve descripcion..."
          rows="3"
          max-rows="6"
        ></b-form-textarea
        ><br />
        <label for="precio">Precio: </label>
        <b-form-input
          id="precio"
          v-model="dprecio"
          placeholder="$"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="5" class="bg-dark text-light">
        <!--Manejo de las imagenes-->
        <div>
          <h5>Imagen</h5>
          <b-form-file
            id="file"
            @change="previzualizar()"
            v-model="file"
            :state="Boolean(file)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
          <p>**Si no carga la previzualizacion de la imagen intenta eligiendo la imagen nuevamente.**</p>
        </div>
        <br /><br />
      </b-col>
      <b-col cols="6" class="bg-dark text-light">
        <p v-show="file==null">Aun no ha cargado una imagen</p><br/>
         <div id="preview"></div>
        <div class="bg-success">
          <b-progress
            v-show="uploading"
            :value="value"
            :max="max"
            show-progress
            animated
          ></b-progress>
        </div>
        <br />
        <b-button variant="danger" href="/"><b-icon icon="file-excel-fill"></b-icon>Cancelar</b-button>
        <b-button
          @click="
            guardarAnuncio();
            toast('b-toaster-bottom-center', true);
          "
          variant="primary"
          ><b-icon icon="file-plus-fill"></b-icon>Agregar</b-button
        ><br /><br />
      </b-col>
      
    </b-row>
    <br /><br />
  </b-container>
</template>

<script>
import { db, storage } from "../db";

export default {
  name: "NuevoAnuncio",
  components: {},
  data: function () {
    return {
      max: 100,
      value: 45,
      idRef: null,
      progressUpload: 0,
      file: null,
      fileName: "",
      uploadTask: "",
      uploading: false,
      downloadURL: "",
      archivos: [],
      uploadEnd: false,
      ddescripcion: "",
      dfecha: null,
      dtelefono: "",
      dtitulo: "",
      dvendedor: "",
      dprecio: "",
      dnuevo: false,
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
        {
          value: "EMUI 8.2 (Basado en Android O)",
          text: "EMUI 8.2 (Basado en Android O)",
        },
      ],
    };
  },
  methods: {
    previzualizar() {
      document.getElementById("file").onchange = function (e) {
        // Creamos el objeto de la clase FileReader
        let reader = new FileReader();

        // Leemos el archivo subido y se lo pasamos a nuestro fileReader
        reader.readAsDataURL(e.target.files[0]);

        // Le decimos que cuando este listo ejecute el código interno
        reader.onload = function () {
          let preview = document.getElementById("preview"),
            image = document.createElement("img");

          image.src = reader.result;
          image.style = "width:100%";

          preview.innerHTML = "";
          preview.append(image);
        };
      };
    },
    upload(IDanuncio) {
      this.fileName = this.file.name;
      this.uploading = true;
      var archivo = storage.ref("" + IDanuncio + "/" + this.file.name);
      archivo
        .put(this.file)
        .then(() => {
          this.uploadEnd = true;
          archivo.getDownloadURL().then((url) => {
            this.downloadURL = url;
            this.uploading = false;
            this.listarArchivos();
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listarArchivos() {
      var this2 = this;
      var listRef = storage
        .ref()
        .child("IDanuncio")
        .listAll()
        .then((res) => {
          res.items.forEach(function (itemsRef) {
            this2.archivos.push(itemsRef.fullPath);
          });
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(listRef);
    },
    deleteImage() {
      storage
        .ref("IDanuncio/" + this.file.name)
        .delete()
        .then(() => {
          this.uploading = false;
          this.uploadEnd = false;
          this.downloadURL = "";
          console.log("la imagen se elimino");
        })
        .catch((error) => {
          console.log(error);
        });
      this.file = null;
      this.fileName = "";
    },
    guardarAnuncio: function () {
      var prc = parseInt(this.dprecio);
      var hoy = new Date();
      if (
        (this.dmarca != "") &
        (this.dmodelo != "") &
        (this.dnuevo != "") &
        (this.dpantalla != "") &
        (this.dram != "") &
        (this.dsistema != "") &
        (this.dtelefono != "") &
        (this.dtitulo != "") &
        (this.dvendedor != "")&
        (this.file!=null)
      ) {
        db.collection("anuncios")
          .add({
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
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            this.upload(docRef.id);
          })
          .catch((error) => {
            console.log("Error agregando el documento" + error);
          });

        this.limpiar();
      } else {
        //console.log('no se pudo realizar la operacion porque alguno de los campos esta vacio');
        window.alert(
          "no se pudo realizar la operacion porque alguno de los campos esta vacio"
        );
      }
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
    limpiar: function () {
      this.ddescripcion = "";
      this.dfecha = "";
      this.dtelefono = "";
      this.dtitulo = "";
      this.dvendedor = "";
      this.dprecio = "";
      this.dnuevo = null;
      this.dmarca = "";
      this.dmodelo = "";
      this.dpantalla = "";
      this.dram = "";
      this.drom = "";
      this.dsistema = null;
      this.file=null;
    },
    toast(toaster, append = false) {
      this.counter++;
      this.$bvToast.toast(`Toast ${this.counter} body content`, {
        title: `Toaster ${toaster}`,
        toaster: toaster,
        solid: true,
        appendToast: append,
      });
    },
  },
  created() {
    this.listarArchivos();
  },
  computed:{
    telState() {
        return /^[0-9]{4}-[0-9]{4}/.test(this.dtelefono) ? true : false
      }
  }
};
</script>

<style></style>
