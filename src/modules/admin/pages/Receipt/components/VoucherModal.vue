<template>
  <q-dialog v-model="modal" @show="onShow()" @hide="closeModal(), exitModal()">
    <div class="section row" style="min-width: 1220px">
      <div class="col-sm-12 col-md-12 flex-column full-center row">
        <q-card-section class="custom-bg-primary full-width text-center">
          <h4 class="text-white q-my-sm q-mb-none">Comprobante</h4>
        </q-card-section>
        <q-select
          outlined
          dense
          v-model="favorites"
          option-label="nameEnterprise"
          option-value="id"
          :options="optionFavorite"
          :readonly="registered"
          @update:model-value="changeFavorite(favorites)"
          label="Comprobantes Frecuentes"
          class="col-sm-3 col-md-3 q-pt-md"
        >
        </q-select>
        <q-checkbox
          class="col-sm-3 col-md-3 q-pb-lg q-pl-lg"
          v-model="registered"
          @update:model-value="changeRegistered()"
          label="Proveedor no registrado"
          style="font-weight: bold"
        />
      </div>
      <div
        class="col-md-12 flex-column row q-pl-lg"
        v-if="registered == true || favorites.nameEnterprise"
      >
        <div class="col-sm-12 col-md-12 q-col-gutter-md row">
          <q-input
            label="Nombre o empresa"
            class="col-sm-6 col-md-6"
            v-model="data.nameEnterprise"
            :readonly="!registered"
            outlined
            dense
          />
          <q-select
            outlined
            dense
            v-model="data.idAreaCode"
            :readonly="!registered"
            option-label="description"
            option-value="id"
            :options="optionAreaCodeLocal"
            label="Cód. Área"
            :rules="[(val) => !!val || 'Campo requerido']"
            class="col-sm-2 col-md-2"
          >
          </q-select>
          <q-input
            label="Teléfono Oficina *"
            :readonly="!registered"
            class="col-sm-2 col-md-2"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="data.phone"
            mask="### - ####"
            outlined
            dense
          />
        </div>
        <div class="col-sm-12 col-md-12 q-col-gutter-md row">
          <div class="col-md-6 row">
            <div class="col-sm-12 col-md-12 q-col-gutter-md row">
              <q-input
                label="Dirección emisor"
                class="col-sm-6 col-md-6"
                :readonly="!registered"
                v-model="data.address"
                outlined
                dense
              />
              <q-select
                outlined
                dense
                label="Tipo de documento *"
                v-model="data.idTypeRif"
                :readonly="!registered"
                :rules="[(val) => !!val || 'Campo requerido']"
                option-label="code"
                option-value="id"
                :options="typeRif"
                class="col-sm-2 col-md-2"
              ></q-select>
              <q-input
                label="Rif Emisor *"
                :readonly="!registered"
                :rules="[(val) => !!val || 'Campo requerido']"
                v-model="data.rif"
                maxlength="9"
                @keydown="filterKey('entero', $event)"
                class="col-sm-4 col-md-4"
                type="text"
                outlined
                dense
              />
            </div>

            <div class="col-sm-12 col-md-12 q-col-gutter-md row">
              <q-input
                label="Número de referencia"
                v-model="data.referenceNumber"
                class="col-sm-6 col-md-6"
                outlined
                dense
              />
              <q-input
                label="Fecha del Comprobante"
                v-model="data.dateVoucher"
                stack-label
                class="col-sm-6 col-md-6"
                :rules="[(val) => !!val || 'Campo requerido']"
                type="date"
                outlined
                dense
              />
            </div>
          </div>
          <div class="col-sm-5 col-md-5 q-pa-md row full-center">
            <q-file
              outlined
              v-if="!data.fileImage"
              v-model="data.fileImage"
              label="Foto"
              @update:model-value="onFileChange(data.fileImage)"
            />
            <!-- <q-file outlined dense stack-label @change="onFileChange($event)" /> -->
            <q-img
              v-else
              spinner-color="white"
              style="height: 140px; max-width: 150px"
              :src="data.image"
            />
          </div>
          <!-- <div class="col-sm-5 col-md-5 q-pa-md row full-center">
            <q-btn class="col-sm-6 col-md-6">
              <q-img src="">
                <div class="absolute-bottom text-subtitle1 text-center">Foto</div>
              </q-img>
            </q-btn>
          </div> -->
        </div>
        <div class="col-sm-12 col-md-12 q-col-gutter-md row">
          <q-input
            label="Descripcion (Opcional)"
            class="col-sm-5 col-md-5"
            v-model="data.description"
            outlined
            dense
          />
          <q-select
            outlined
            dense
            v-model="data.idChargesMethods"
            :options="optionChargesMethods"
            option-label="description"
            option-value="id"
            label="Métodos de cobro"
            :rules="[(val) => !!val || 'Campo requerido']"
            class="col-sm-5 col-md-5"
          ></q-select>
        </div>
        <div class="col-sm-12 col-md-12 q-col-gutter-md row">
          <q-input
            label="Item"
            class="col-sm-4 col-md-4"
            v-model="data.item"
            outlined
            readonly
            dense
          />
          <q-input
            label="Precio Neto Bs."
            v-model="data.price"
            class="col-sm-2 col-md-2"
            suffix="Bs"
            outlined
            readonly
            dense
          />
          <q-input
            label="Precio Neto USD"
            v-model="data.priceUsd"
            class="col-sm-2 col-md-2"
            suffix="$"
            outlined
            readonly
            dense
          />
          <q-checkbox
            class="col-sm-3 col-md-3 q-pb-lg q-pl-lg"
            v-if="registered"
            v-model="data.favorite"
            label="Agregar a favoritos"
            style="font-weight: bold"
          />
        </div>
        <div class="space-around col-sm-12 col-md-12 q-mt-md row">
          <q-btn class="col-sm-2" color="positive" label="Crear" @click="onSubmit" />

          <q-btn
            class="col-sm-2"
            color="negative"
            label="Cancelar"
            @click="closeModal()"
          />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { reactive, watchEffect, ref } from "vue";
import { useStore } from "vuex";
import useUI from "src/composables/useUI";
import { useQuasar } from "quasar";
import useAdmin from "src/modules/admin/composables/useAdmin";

export default {
  props: {
    modal: Boolean,
    currentItem: Object,
    closeModal: Function,
    openModal: Function,
  },
  setup(props) {
    const $q = useQuasar();
    const {
      filterKey,
      firstCero,
      getPhoneAreaCod,
      getRifType,
      getChargesMethods,
    } = useUI();
    const store = useStore();

    const { saveVoucher } = useAdmin();

    const data = reactive({
      nameEnterprise: "",
      idAreaCode: [],
      phone: "",
      address: "",
      idTypeRif: [],
      rif: "",
      itemsCurrent: [],
      referenceNumber: "",
      dateVoucher: "",
      idChargesMethods: [],
      item: "",
      price: "",
      priceUsd: "",
      description: "",
      image: "",
      fileImage: "",
      favorite: false,
    });
    const typeRif = reactive([]);
    const registered = ref(false);
    const optionAreaCodeLocal = reactive([]);
    const optionChargesMethods = ref([]);
    const optionFavorite = reactive([]);
    const favorites = ref([]);

    // Actualizar estado local con el current item
    watchEffect(() => {
      if (Object.values(props.currentItem).length) {
        Object.assign(data, props.currentItem);
      } else {
        Object.keys(data).forEach((key) => {
          data[key] = "";
        });
      }
    });

    return {
      data,
      favorites,
      typeRif,
      optionAreaCodeLocal,
      optionChargesMethods,
      optionFavorite,
      registered,
      filterKey,
      firstCero,
      onShow: async () => {
        registered.value = false;
        const dataAreaCode = await getPhoneAreaCod();
        dataAreaCode.message.data.forEach((element) => {
          optionAreaCodeLocal.push({
            id: element.id,
            description: element.description,
          });
        });

        const chargesMethods = await getChargesMethods();
        optionChargesMethods.value = chargesMethods.message.data;
        const dataTypeRif = await getRifType();
        dataTypeRif.message.data.forEach((element) => {
          typeRif.push({
            id: element.id,
            description: element.description,
            code: element.code,
          });
        });

        data.item = data[0]["item"];
        data.price = data[0]["bs"];
        data.priceUsd = data[0]["usd"];
        data.favorite = false;

        //Verificamos que haya favoritos y los agregamos al array
        const dataFavorite = store.state["admin"]["receipt"].favoriteProvider;
        if (dataFavorite) {
          data.nameEnterprise = dataFavorite.nameEnterprise;
          data.idAreaCode = dataFavorite.idAreaCode;
          data.phone = dataFavorite.phone;
          data.address = dataFavorite.address;
          data.idTypeRif = dataFavorite.idTypeRif;
          data.rif = dataFavorite.rif;
        }
      },
      exitModal: () => {
        favorites.value = [];
      },
      changeFavorite: (item) => {
        let arrFavorites = [...optionFavorite];
        console.log(item);
        arrFavorites.forEach((element) => {
          if (element.nameEnterprise == item.nameEnterprise) {
            data.nameEnterprise = element.nameEnterprise;
            data.idAreaCode = optionAreaCodeLocal.find(
              (element2) => element2.id == element.idAreaCode
            );
            data.phone = element.phone;
            data.address = element.address;
            data.idTypeRif = typeRif.find((element2) => element2.id == element.idTypeRif);
            data.rif = element.rif;
            console.log(data, "dataInterprise");
          }
        });
      },

      changeRegistered: () => {
        if (registered.value) {
          favorites.value = [];
          data.nameEnterprise = "";
          data.idAreaCode = "";
          data.phone = "";
          data.address = "";
          data.idTypeRif = "";
          data.rif = "";
        }
      },
      onSubmit: async () => {
        try {
          $q.loading.show();

          data.idTypeRif = data.idTypeRif.id;
          data.idAreaCode = data.idAreaCode.id;
          data.idChargesMethods = data.idChargesMethods.id;
          data.idResidence = store.state["auth"].idResidential;
          store.commit("admin/receipt/addVoucher", data);
          if (data.favorite == true) {
            const dataFavorite = store.state["admin"]["receipt"].favoriteProvider;

            const found = dataFavorite.find(
              (element) => element.nameEnterprise == data.nameEnterprise
            );
            if (!found) {
              store.commit("admin/receipt/addFavorite", data);
              dataFavorite.forEach((element) => {
                if (element.nameEnterprise == data.nameEnterprise) {
                  optionFavorite.push(element);
                }
              });
            }
          }
          $q.loading.hide();

          $q.notify({
            message: "Voucher guardado correctamente",
            color: "positive",
            icon: "check_circle",
          });

          props.closeModal(data.item);

          data.idTypeRif = [];
          data.idAreaCode = [];
          data.idChargesMethods = [];
          favorites.value = [];
        } catch (error) {
          if (error.message != "Network Error") {
            return { ok: false, message: error.message };
          } else {
            return { ok: false, message: "La API no esta activa" };
          }
        }
      },
      onFileChange: (file) => {
        // const file = e.target.files[0];
        console.log(file, "file");
        // data.fileImage = file;
        data.image = URL.createObjectURL(file);
      },
    };
  },
};
</script>

<style></style>
