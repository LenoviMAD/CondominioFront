<template>
  <section class="section row flex-column full-width">
    <header class="text-center col-md-12 mb-20">
      <h3 class="q-my-sm text-weight-light">Recibo</h3>
    </header>
    <div class="justify-end">
      {{ `Tasa BCV ` + dateUSD + ` Bs. ` + priceUSD }}
    </div>
    <section class="section row full-width">
      <div class="col-md-12 row full-width q-col-gutter-md">
        <div class="col-md-8 row q-pt-lg">
          <div class="col-md-6 row full-width q-col-gutter-md">
            <q-input
              label="Nro de Recibo"
              class="col-sm-6 col-md-6"
              v-model="data.nroReceipt"
              outlined
              disable
              readonly
              dense
            />
            <q-input
              label="Fecha del Recibo"
              stack-label
              v-model="data.date"
              class="col-sm-6 col-md-6"
              :rules="[(val) => !!val || 'Campo requerido']"
              type="date"
              outlined
              dense
            >
            </q-input>
          </div>

          <div class="col-md-6 row full-width q-col-gutter-md">
            <q-input
              label="Dirección"
              readonly
              v-model="data.address"
              class="col-sm-6 col-md-6"
              outlined
              dense
            />
            <q-select
              outlined
              dense
              readonly
              label="Tipo de documento *"
              v-model="data.typeRif"
              :rules="[(val) => !!val || 'Campo requerido']"
              option-label="description"
              option-value="id"
              :options="typeDocument"
              class="col-sm-2 col-md-2"
            ></q-select>
            <q-input
              label="Rif *"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.rif"
              readonly
              maxlength="9"
              @keydown="filterKey('entero', $event)"
              class="col-sm-4 col-md-4"
              type="text"
              outlined
              dense
            />
          </div>
        </div>

        <div class="col-md-4 q-pa-md row full-center">
          <q-btn class="col-md-12">
            <q-img :src="data.logo">
              <div v-if="!data.logo" class="absolute-bottom text-subtitle1 text-center">
                Logo
              </div>
            </q-img>
          </q-btn>
        </div>
      </div>
      <q-separator class="full-width" />
      <div class="col-md-6 q-pa-md row full-width space-around">
        <q-checkbox
          v-model="chkDisable"
          class="col-sm-1 q-pb-lg col-md-1"
          @click="eventClick()"
        />
        <q-select
          outlined
          dense
          v-model="propertyApartment"
          @update:model-value="onChangePropertyApartment(propertyApartment)"
          :disable="disableInputs"
          :options="optionApartmentAliquot"
          option-label="name"
          option-value="id"
          label="Inmueble"
          :rules="[(val) => !!val || 'Campo requerido']"
          class="col-sm-3 col-md-3"
        >
        </q-select>
        <q-input
          label="Alícuota"
          v-model="propertyAliquot"
          disable
          class="col-sm-3 col-md-3"
          outlined
          dense
          :disable="disableInputs"
        />

        <q-input
          readonly
          disable
          label="Neto a Pagar"
          v-model="propertyTotal"
          suffix="Bs."
          class="col-sm-3 col-md-3"
          outlined
          dense
        />
      </div>
    </section>
    <section class="mb-20">
      <div class="row full-width q-col-gutter-md q-pb-lg">
        <div class="col-sm-4 col-md-4 title-div full-center">Item</div>
        <div class="col-sm-2 col-md-2 title-div">Valor total Gastos Bs</div>
        <div class="col-sm-2 col-md-2 title-div">Valor total Gastos $</div>
        <div class="col-sm-4 col-md-4 title-div">
          <q-select
            outlined
            v-model="data.aliquot"
            dense
            @update:model-value="onChangeAliquot(data.aliquot)"
            :options="optionAliquot"
            option-label="aliquot"
            option-value="id"
            dark
            label="Valor total Gastos Según alicuota $"
            class="col-sm-3 col-md-3"
          />
        </div>
      </div>
      <div
        class="row full-width q-col-gutter-md q-pb-lg"
        v-for="(item, index) in dataItem.filter((element) => element.typeItem == 1)"
        :key="index"
      >
        <!-- MODALES E ITEM -->
        <div class="col-sm-5 col-md-5 row">
          <div
            v-if="index + 1 < dataItem.filter((element) => element.typeItem == 1).length"
            class="col-sm-1 col-md-1 q-mr-sm"
          >
            <q-btn
              :disable="item.voucherSave"
              @click="openModal(item.item, index)"
              push
              :color="item.voucherColor"
              size="sm"
              round
              icon="cloud_upload"
            >
              <q-tooltip> Crear comprobante </q-tooltip>
            </q-btn>
          </div>
          <div class="col-sm-1 col-md-1 q-mr-sm" v-else>
            <q-btn
              push
              color="light-blue-10"
              :disable="item.item && item.bs ? false : true"
              size="sm"
              round
              icon="add"
              @click="eventClickAddItem(item, 1)"
            >
              <q-tooltip> Agregar </q-tooltip>
            </q-btn>
          </div>
          <div
            class="col-sm-6 col-md-6 q-gutter-sm"
            v-if="index + 1 < dataItem.filter((element) => element.typeItem == 1).length"
          >
            <q-input
              :readonly="item.voucherSave"
              v-model="item.item"
              label="Item"
              outlined
              dense
            />
          </div>
          <div class="col-sm-11 col-md-11 q-gutter-sm" v-else>
            <q-input
              :readonly="item.voucherSave"
              v-model="item.item"
              label="Item"
              outlined
              dense
            />
          </div>
          <div
            class="col-sm-4 col-md-4 q-gutter-sm q-pa-sm"
            v-if="index + 1 < dataItem.filter((element) => element.typeItem == 1).length"
          >
            <q-btn
              :disable="item.voucherSave"
              push
              color="light-green-4"
              @click="saveItem(index, item.item)"
              size="xs"
              round
              icon="save"
            >
              <q-tooltip> Guardar </q-tooltip>
            </q-btn>
            <q-btn
              push
              :disable="!item.voucherSave"
              color="orange-4"
              size="xs"
              @click="editItem(index)"
              round
              icon="edit"
              ><q-tooltip> Editar </q-tooltip>
            </q-btn>
            <q-btn
              push
              :disable="!item.voucherSave"
              color="red-4"
              size="xs"
              @click="deleteItem(item.item, index)"
              round
              icon="close"
              ><q-tooltip> Cancelar </q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-input
          label="Gastos Bs"
          v-model="item.bs"
          :readonly="item.voucherSave || (item.item ? false : true)"
          class="col-sm-2 col-md-2"
          @keydown="filterKey('decimal', $event)"
          @update:model-value="onChangePriceItemCommon(item.item, item.bs)"
          outlined
          dense
        />
        <q-input
          label="Gastos $"
          v-model="item.usd"
          class="col-sm-2 col-md-2"
          readonly
          outlined
          dense
        />
        <q-input
          label="Alicuota Bs"
          v-model="item.aliquotBs"
          class="col-sm-1 col-md-1"
          suffix="Bs"
          readonly
          outlined
          dense
        />
        <q-input
          label="Alicuota USD"
          v-model="item.aliquotUSD"
          :readonly="item.voucherSave"
          class="col-sm-1 col-md-1"
          suffix="$"
          outlined
          dense
        />
        <div
          v-if="index + 1 < dataItem.filter((element) => element.typeItem == 1).length"
          class="col-sm-1 col-md-1 q-pa-lg"
        >
          <q-btn
            push
            :disable="item.divisionSave"
            :color="item.divisionColor"
            @click="openModalDivision(item.item)"
            size="12px"
            round
            icon="donut_small"
          >
            <q-tooltip> Division </q-tooltip>
          </q-btn>
        </div>
      </div>
      <div class="row full-width q-pr-md justify-end">
        <q-input
          label="Sub Total a Pagar Bs"
          class="col-sm-2 col-md-2 q-mr-md"
          v-model="subTotalCommonBs"
          readonly
          outlined
          dense
        />
        <q-input
          label="Sub Total a Pagar USD"
          class="col-sm-2 col-md-2"
          v-model="subTotalCommonUsd"
          readonly
          outlined
          dense
        />
      </div>
    </section>
    <section class="section row full-width">
      <div class="col-md-6 q-pa-md row full-width">
        <q-checkbox
          v-model="chkDisableNoCommon"
          class="q-pb-lg q-pl-lg"
          label="Gastos no comunes generales"
          style="font-weight: bold"
          @click="eventClick()"
        />
      </div>

      <!-- SECCION GASTO NO COMUNES  -->

      <div class="q-pa-md row full-width" v-if="chkDisableNoCommon">
        <div class="q-pa-md row q-col-gutter-md full-width">
          <div class="col-sm-6 col-md-6 title-div full-center">Item</div>
          <div class="col-sm-3 col-md-3 title-div">Valor total Gastos Bs</div>
          <div class="col-sm-3 col-md-3 title-div">Valor total Gastos $</div>

          <div
            class="row full-width q-col-gutter-md q-pb-lg"
            v-for="(item, index) in dataItem.filter((element) => element.typeItem == 2)"
            :key="index"
          >
            <!-- MODALES E ITEM -->
            <div class="col-sm-5 col-md-5 row">
              <div
                v-if="
                  index + 1 < dataItem.filter((element) => element.typeItem == 2).length
                "
                class="col-sm-1 col-md-1 q-mr-sm"
              >
                <q-btn
                  :disable="item.voucherSave"
                  @click="openModal(item.item, index)"
                  push
                  :color="item.voucherColor"
                  size="sm"
                  round
                  icon="cloud_upload"
                >
                  <q-tooltip> Crear comprobante </q-tooltip>
                </q-btn>
              </div>
              <div class="col-sm-1 col-md-1 q-mr-sm" v-else>
                <q-btn
                  push
                  color="light-blue-10"
                  :disable="item.item && item.bs ? false : true"
                  size="sm"
                  round
                  icon="add"
                  @click="eventClickAddItem(item, 2)"
                >
                  <q-tooltip> Agregar </q-tooltip>
                </q-btn>
              </div>
              <div
                class="col-sm-6 col-md-6 q-gutter-sm"
                v-if="
                  index + 1 < dataItem.filter((element) => element.typeItem == 2).length
                "
              >
                <q-input
                  :readonly="item.voucherSave"
                  v-model="item.item"
                  label="Item"
                  outlined
                  dense
                />
              </div>
              <div class="col-sm-11 col-md-11 q-gutter-sm" v-else>
                <q-input
                  :readonly="item.voucherSave"
                  v-model="item.item"
                  label="Item"
                  outlined
                  dense
                />
              </div>
              <div
                class="col-sm-4 col-md-4 q-gutter-sm q-pa-sm"
                v-if="
                  index + 1 < dataItem.filter((element) => element.typeItem == 2).length
                "
              >
                <q-btn
                  :disable="item.voucherSave"
                  push
                  color="light-green-4"
                  @click="saveItem(index, item.item)"
                  size="xs"
                  round
                  icon="save"
                >
                  <q-tooltip> Guardar </q-tooltip>
                </q-btn>
                <q-btn
                  push
                  :disable="!item.voucherSave"
                  color="orange-4"
                  size="xs"
                  @click="editItem(index)"
                  round
                  icon="edit"
                  ><q-tooltip> Editar </q-tooltip>
                </q-btn>
                <q-btn
                  push
                  :disable="!item.voucherSave"
                  color="red-4"
                  size="xs"
                  @click="deleteItem(item.item, index)"
                  round
                  icon="close"
                  ><q-tooltip> Cancelar </q-tooltip>
                </q-btn>
              </div>
            </div>
            <q-input
              label="Gastos Bs"
              v-model="item.bs"
              :readonly="item.voucherSave || (item.item ? false : true)"
              class="col-sm-3 col-md-3"
              @keydown="filterKey('decimal', $event)"
              @update:model-value="onChangePriceItemNoCommon(item.item, item.bs)"
              outlined
              dense
            />
            <q-input
              label="Gastos $"
              v-model="item.usd"
              class="col-sm-3 col-md-3"
              readonly
              outlined
              dense
            />

            <div
              v-if="
                index + 1 < dataItem.filter((element) => element.typeItem == 2).length
              "
              class="col-sm-1 col-md-1 q-pa-lg"
            >
              <q-btn
                push
                :disable="item.divisionSave"
                :color="item.divisionColor"
                @click="openModalDivision(item.item)"
                size="12px"
                round
                icon="donut_small"
              >
                <q-tooltip> Division </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
        <div class="row full-width q-pr-xl justify-end">
          <q-input
            label="Sub Total a Pagar Bs"
            class="col-sm-2 col-md-2 q-mr-md"
            v-model="subTotalNoCommonBs"
            readonly
            outlined
            dense
          />
          <q-input
            label="Sub Total a Pagar USD"
            class="col-sm-2 col-md-2"
            v-model="subTotalNoCommonUsd"
            readonly
            outlined
            dense
          />
        </div>
      </div>

      <!-- <div class="q-pa-md row full-width" v-if="chkDisableNoCommon">
        <div class="row full-width q-col-gutter-md q-pb-lg">
          <div class="col-sm-4 col-md-4 title-div full-center">Item</div>
          <div class="col-sm-2 col-md-2 title-div">Valor Item Bs</div>
          <div class="col-sm-2 col-md-2 title-div">Valor Item $</div>
          <div class="col-sm-4 col-md-4 title-div">
            Valor total Gastos por Apartamento $
          </div>
        </div>
        <div
          class="row full-width q-col-gutter-md q-pb-lg"
          v-for="(item, index) in dataItem.filter((element) => element.typeItem == 2)"
          :key="index"
        >
          <div class="col-sm-4 col-md-4 row">
            <div
              v-if="
                index + 1 < dataItem.filter((element) => element.typeItem == 2).length
              "
              class="col-sm-2 col-md-2 q-pt-sm q-pl-lg"
            >
              <q-btn
                @click="openModal(item.item)"
                push
                color="grey"
                size="sm"
                round
                icon="cloud_upload"
              >
                <q-tooltip> Crear comprobante </q-tooltip>
              </q-btn>
            </div>
            <div v-else class="col-sm-2 col-md-2 q-pt-sm q-pl-lg"></div>
            <q-input
              v-model="item.item"
              label="Item"
              class="col-sm-6 col-md-6"
              outlined
              dense
            />
            <div
              class="col-sm-4 col-md-4 q-gutter-sm q-pa-sm"
              v-if="index + 1 < data.length"
            >
              <q-btn push color="light-green-4" size="sm" round icon="save">
                <q-tooltip> Guardar </q-tooltip>
              </q-btn>
              <q-btn push color="orange-4" size="sm" round icon="edit"
                ><q-tooltip> Editar </q-tooltip>
              </q-btn>
              <q-btn
                push
                color="red-4"
                size="sm"
                @click="deleteItem(item.item, index)"
                round
                icon="close"
                ><q-tooltip> Cancelar </q-tooltip>
              </q-btn>
            </div>
            <div class="col-sm-4 col-md-4 q-gutter-sm q-pa-sm" v-else>
              <q-btn
                push
                color="light-blue-10"
                size="sm"
                round
                icon="add"
                @click="eventClickAddItem(item, 2)"
              >
                <q-tooltip> Agregar </q-tooltip>
              </q-btn>
            </div>
          </div>
          <q-input
            label="Gastos Bs"
            class="col-sm-2 col-md-2"
            v-model="item.bs"
            :rules="[(val) => !!val || 'Campo requerido']"
            outlined
            dense
          />
          <q-input
            label="Gastos $"
            v-model="item.usd"
            class="col-sm-2 col-md-2"
            readonly
            outlined
            dense
          />
          <q-select
            outlined
            v-model="item.aliquot"
            dense
            label="Gastos Según alicuota"
            class="col-sm-3 col-md-3"
          />
          <div v-if="index + 1 < data.length" class="col-sm-1 col-md-1 q-pa-lg">
            <q-btn
              @click="openModalDivision(item.item)"
              push
              :color="colorDivisionModal"
              size="12px"
              round
              icon="donut_small"
            >
              <q-tooltip> Division </q-tooltip>
            </q-btn>
          </div>
        </div>
        <div class="col-md-6 row q-gutter-sm full-width">
          <q-checkbox
            v-model="chkDisableApartment"
            class="col-sm-2 col-md-2 q-pb-lg q-pl-lg"
            label="Gastos no comunes por apartamento"
            style="font-weight: bold"
            @click="eventClickApartment()"
          />
          <q-select
            outlined
            dense
            :disable="disableInputsApartments"
            option-label="description"
            option-value="id"
            label="Torre"
            :rules="[(val) => !!val || 'Campo requerido']"
            class="col-sm-2 col-md-2"
          >
          </q-select>
          <q-select
            outlined
            dense
            :disable="disableInputsApartments"
            option-label="description"
            option-value="id"
            label="Apartamento"
            :rules="[(val) => !!val || 'Campo requerido']"
            class="col-sm-2 col-md-2"
          >
          </q-select>

          <div class="col-sm-3 q-pt-xs q-pl-md">
            <q-btn
              @click="openModalExpense(item.item)"
              push
              color="grey-6"
              size="md"
              round
              icon="meeting_room"
            >
              <q-tooltip> Gastos por Apartamentos </q-tooltip>
            </q-btn>
          </div>
        </div>
        <div class="row full-width q-pr-md justify-end">
          <q-input
            label="Sub Total a Pagar asdasd a"
            class="col-sm-2 col-md-2"
            v-model="subTotalCommonBs"
            readonly
            outlined
            dense
          />
        </div>
      </div> -->
    </section>
    <section class="section q-mt-md row full-width">
      <div class="col-md-6 q-pa-md row full-width">
        <q-checkbox
          v-model="chkDisableApartment"
          class="col-sm-2 col-md-2 q-pb-lg q-pl-lg"
          label="Gastos no comunes por apartamento"
          style="font-weight: bold"
          @click="eventClickApartment()"
        />
      </div>
      <div v-if="chkDisableApartment" class="col-md-12 row q-ml-xl q-gutter-sm">
        <q-select
          outlined
          dense
          v-model="dataNoCommonByApartment.tower"
          :options="optionTowerApartment"
          :disable="disableInputsApartments"
          @update:model-value="updateOptionTowerApartment(dataNoCommonByApartment.tower)"
          option-label="name"
          option-value="id"
          label="Torre"
          :rules="[(val) => !!val || 'Campo requerido']"
          class="col-sm-2 col-md-2"
        >
        </q-select>
        <q-select
          outlined
          dense
          v-model="dataNoCommonByApartment.apartment"
          :options="optionApartment"
          :disable="disableInputsApartments"
          option-label="name"
          option-value="id"
          label="Apartamento"
          :rules="[(val) => !!val || 'Campo requerido']"
          class="col-sm-2 col-md-2"
        >
        </q-select>

        <div class="col-sm-3 q-pt-xs q-pl-md">
          <q-btn
            @click="
              addApartmentBills(
                dataNoCommonByApartment.tower,
                dataNoCommonByApartment.apartment
              )
            "
            push
            color="light-blue-10"
            size="md"
            round
            icon="meeting_room"
          >
            <q-tooltip> Gastos por Apartamentos </q-tooltip>
          </q-btn>
        </div>
        <!-- Viene seccion de gastos no comunes por apartamento -->
        <div
          v-if="dataItem.filter((element) => element.typeItem == 3).length"
          class="q-pa-md row full-width"
        >
          <div class="q-pa-md row q-col-gutter-md">
            <div class="col-sm-6 col-md-6 title-div full-center">Item</div>
            <div class="col-sm-3 col-md-3 title-div">Valor total Gastos Bs</div>
            <div class="col-sm-3 col-md-3 title-div">Valor total Gastos $</div>

            <div
              class="row full-width q-col-gutter-md q-pb-lg"
              v-for="(item, index) in dataItem.filter((element) => element.typeItem == 3)"
              :key="index"
            >
              <!-- MODALES E ITEM -->
              <div class="col-sm-2 col-md-2 row">
                Torre: {{ item.nameTower }} <br />
                Apartamento: {{ item.nameApartment }}
              </div>
              <div class="col-sm-4 col-md-4 row">
                <div class="col-sm-1 col-md-1 q-mr-sm">
                  <q-btn
                    :disable="item.voucherSave"
                    @click="openModal(item.item, index)"
                    push
                    :color="item.voucherColor"
                    size="sm"
                    round
                    icon="cloud_upload"
                  >
                    <q-tooltip> Crear comprobante </q-tooltip>
                  </q-btn>
                </div>

                <div class="col-md-6 q-gutter-sm">
                  <q-input
                    :readonly="!item.voucherSave"
                    v-model="item.item"
                    label="Item"
                    outlined
                    dense
                  />
                </div>
                <div class="col-sm-4 col-md-4 q-gutter-sm q-pa-sm">
                  <q-btn
                    push
                    color="light-green-4"
                    :disable="!item.voucherSave"
                    @click="saveItemByApartment(item)"
                    size="xs"
                    round
                    icon="save"
                  >
                    <q-tooltip> Guardar </q-tooltip>
                  </q-btn>
                  <q-btn
                    push
                    :disable="item.voucherSave"
                    color="orange-4"
                    size="xs"
                    @click="editItem(index)"
                    round
                    icon="edit"
                    ><q-tooltip> Editar </q-tooltip>
                  </q-btn>
                  <q-btn
                    push
                    :disable="item.voucherSave"
                    color="red-4"
                    size="xs"
                    @click="deleteItem(item.item, index)"
                    round
                    icon="close"
                    ><q-tooltip> Cancelar </q-tooltip>
                  </q-btn>
                </div>
              </div>
              <q-input
                label="Gastos Bs"
                v-model="item.bs"
                :readonly="!item.voucherSave || (item.item ? false : true)"
                class="col-sm-2 col-md-2"
                @keydown="filterKey('decimal', $event)"
                @update:model-value="
                  onChangePriceItemNoCommonByApartment(item.item, item.bs)
                "
                outlined
                dense
              />
              <q-input
                label="Gastos $"
                v-model="item.usd"
                class="col-sm-2 col-md-2"
                readonly
                outlined
                dense
              />

              <div class="col-sm-1 col-md-1 q-pa-lg">
                <q-btn
                  push
                  :disable="item.divisionSave"
                  :color="item.divisionColor"
                  @click="openModalDivision(item.item)"
                  size="12px"
                  round
                  icon="donut_small"
                >
                  <q-tooltip> Division </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
          <div class="row full-width q-pr-xl justify-end">
            <q-input
              label="Sub Total a Pagar Bs"
              class="col-sm-2 col-md-2 q-mr-md"
              v-model="subTotalNoCommonByApartmentBs"
              readonly
              outlined
              dense
            />
            <q-input
              label="Sub Total a Pagar USD"
              class="col-sm-2 col-md-2"
              v-model="subTotalNoCommonByApartmentUsd"
              readonly
              outlined
              dense
            />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="q-pa-md row full-width">
        <div class="row full-width q-pr-md justify-end">
          <q-input
            label="Neto a Pagar Bs"
            class="col-sm-2 col-md-2 q-mr-md"
            v-model="data.total"
            readonly
            outlined
            dense
          />
          <q-input
            label="Neto a Pagar USD"
            class="col-sm-2 col-md-2"
            v-model="data.totalUSD"
            readonly
            outlined
            dense
          />
        </div>
        <div class="space-around col-sm-12 col-md-12 q-mt-md row">
          <q-btn
            class="col-sm-2"
            color="positive"
            label="Guardar"
            @click="onSubmit('Guardar')"
          />

          <q-btn
            class="col-sm-2"
            color="negative"
            label="Cancelar"
            @click="closeModal()"
          />
          <q-btn color="light-blue-10" label="Publicar" @click="onSubmit('Publicar')" />
        </div>
      </div>
    </section>
  </section>
  <voucher-modal
    :modal="modal"
    :openModal="openModal"
    :currentItem="currentItem"
    :closeModal="closeVoucher"
  />
  <division-item-modal
    :modal="modalDivision"
    :openModal="openModalDivision"
    :closeModal="closeDivision"
    :currentItem="currentItem"
  />
  <expense-apartment-modal
    :modal="modalExpense"
    :closeModal="openModalExpense"
    :currentItem="currentItem"
  />
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

//Componentes importados
import VoucherModal from "./VoucherModal.vue";
import DivisionItemModal from "./DivisionItemModal.vue";
import ExpenseApartmentModal from "./ExpenseApartmentModal.vue";
import useUI from "src/composables/useUI";
import useAdmin from "src/modules/admin/composables/useAdmin";
import useAuth from "src/modules/auth/composables/useAuth";
import { towerVisible } from "src/modules/admin/store/getters";

export default {
  components: { VoucherModal, DivisionItemModal, ExpenseApartmentModal },
  setup() {
    const { filterKey, getValueUSD, getValueUSDRepuesto, getPaymentMethods } = useUI();
    const {
      saveReceipt,
      saveImageVoucher,
      getResidentialById,
      getAliquotDifferent,
      getApartmentAliquot,
      getNumberReceipt,
      getTowerApartmentByIdResdential,
    } = useAdmin();
    const { getTypeDocument } = useAuth();
    const router = useRouter();

    const modal = ref(false);
    const openModal = (name) => {
      modal.value = true;
      dataItem.forEach((element) => {
        if (element.item == name) {
          currentItem.value.push(element);
          return;
        }
      });
    };
    const modalDivision = ref(false);
    const openModalDivision = (name) => {
      modalDivision.value = true;
      dataItem.forEach((element) => {
        if (element.item == name) {
          currentItem.value.push(element);
          return;
        }
      });
    };
    const modalExpense = ref(false);
    const openModalExpense = (name) => {
      modalExpense.value = !modalExpense.value;
    };
    const currentItem = ref([]);
    //     const handleSubmit = () => {
    //       console.log("handleSubmit");
    //     };

    const closeVoucher = (name) => {
      console.log(name, "name");
      dataItem.forEach((element) => {
        if (element.item == name) {
          element.voucherSave = true;
          element.voucherColor = "grey";
        }
      });
      currentItem.value.pop();
      modal.value = false;
    };

    const closeDivision = (name) => {
      console.log(store.state["admin"]["receipt"].division, "estado");
      if (name) {
        let updatePrice = [...store.state["admin"]["receipt"].division];
        subTotalCommonBs.value = 0;
        propertyTotal.value = 0;
        data.total = 0;
        data.totalUSD = 0;

        dataItem.forEach((element) => {
          updatePrice.forEach((element2) => {
            if (element.item === element2.item && element2.item === name) {
              element.bs = element2.amountInstallmentBs;
              element.usd = element2.amountInstallmentUsd;
              element.divisionSave = true;
              element.divisionColor = "grey";
            }
          });

          if (element.bs) {
            //Modificamos los totales
            subTotalCommonBs.value = (
              parseFloat(subTotalCommonBs.value) + parseFloat(element.bs)
            ).toFixed(4);
            data.total = (parseFloat(data.total) + parseFloat(element.bs)).toFixed(4);
            propertyTotal.value = (
              parseFloat(data.total) + parseFloat(element.bs)
            ).toFixed(4);
            data.totalUSD = (parseFloat(data.totalUSD) + parseFloat(element.usd)).toFixed(
              4
            );

            //Modificamos las aliquotas
            element.aliquotBs = ((data.aliquot.aliquot / 100) * element.bs).toFixed(4);
            element.aliquotUSD = (
              ((data.aliquot.aliquot / 100) * element.bs) /
              priceUSD.value
            ).toFixed(4);
          }
        });
      }
      console.log(name, "name");

      currentItem.value.pop();
      modalDivision.value = false;
    };
    const dateUSD = ref("");
    const priceUSD = ref("");
    const aliquotExpense = ref("");
    const typeDocument = ref([]);

    const $q = useQuasar();
    const store = useStore();
    const dataSelected = ref([]);
    const propertyApartment = ref([]);
    const propertyAliquot = ref("");
    const propertyTotal = ref(0);
    const optionAliquot = ref([]);
    const optionApartmentAliquot = ref([]);
    const optionApartment = ref([]);
    const optionTowerApartment = ref([]);
    const subTotalCommonBs = ref(0);
    const subTotalNoCommonBs = ref(0);
    const subTotalNoCommonByApartmentBs = ref(0);
    const subTotalCommonUsd = ref(0);
    const subTotalNoCommonUsd = ref(0);
    const subTotalNoCommonByApartmentUsd = ref(0);
    const disableInputs = ref(true);
    const disableInputsApartments = ref(true);
    const chkDisable = ref(false);
    const colorDivisionModal = ref("light-blue-10");
    const colorVoucherModal = ref("light-blue-10");
    const chkDisableNoCommon = ref(false);
    const chkDisableApartment = ref(false);
    const data = reactive({
      nroReceipt: "",
      voucherSave: false,
      date: "",
      address: "",
      logo: "",
      typeRif: [],
      idTypeRif: [],
      receiptDetail: [],
      rif: "",
      total: 0,
      totalUSD: 0,
      aliquot: "",
      aliquotBs: "",
      aliquotUSD: "",
    });
    const dataItem = reactive([
      {
        nroReceipt: "",
        item: "",
        bs: "",
        usd: "",
        typeItem: 1,
        voucherSave: false,
        divisionSave: false,
        voucherColor: "light-blue-10",
        divisionColor: "light-blue-10",
        aliquotBs: "",
        aliquotUSD: "",
      },
      {
        nroReceipt: "",
        item: "",
        bs: "",
        usd: "",
        typeItem: 2,
        voucherSave: false,
        divisionSave: false,
        voucherColor: "light-blue-10",
        divisionColor: "light-blue-10",
        aliquotBs: "",
        aliquotUSD: "",
      },
    ]);

    const itemApartmentNoCommon = reactive([
      // {
      //   idTower: "",
      //   nameTower: "",
      //   idApartment: "",
      //   nameApartment: "",
      //   item: "",
      //   bs: "",
      //   typeItem: 3,
      //   voucherSave: false,
      //   divisionSave: false,
      //   voucherColor: "light-blue-10",
      //   divisionColor: "light-blue-10",
      //   usd: "",
      // },
    ]);

    const dataNoCommonByApartment = reactive([
      {
        tower: [],
        apartment: [],
      },
    ]);

    const updateTotales = () => {
      if (dataItem.length) {
        data.total = dataItem
          .filter(
            (element) =>
              element.typeItem != "3" && element.bs && element.voucherSave != true
          )
          .reduce(
            (accumulator, curValue) =>
              Number(Number(accumulator) + Number(curValue.bs)).toFixed(4),
            0
          );

        data.totalUSD = dataItem
          .filter((element) => element.typeItem != "3" && element.usd)
          .reduce(
            (accumulator, curValue) =>
              Number(Number(accumulator) + Number(curValue.usd)).toFixed(4),
            0
          );

        subTotalCommonBs.value = dataItem
          .filter((element) => element.typeItem == "1" && element.bs)
          .reduce(function (accumulator, curValue) {
            return Number(Number(accumulator) + Number(curValue.bs)).toFixed(4);
          }, 0);
        subTotalCommonUsd.value = dataItem
          .filter((element) => element.typeItem == "1" && element.usd)
          .reduce(function (accumulator, curValue) {
            return Number(Number(accumulator) + Number(curValue.usd)).toFixed(4);
          }, 0);

        if (dataItem.filter((element) => element.typeItem == "2")) {
          subTotalNoCommonBs.value = dataItem
            .filter((element) => element.typeItem == "2" && element.bs)
            .reduce(function (accumulator, curValue) {
              return Number(Number(accumulator) + Number(curValue.bs)).toFixed(4);
            }, 0);
          subTotalNoCommonUsd.value = dataItem
            .filter((element) => element.typeItem == "2" && element.usd)
            .reduce(function (accumulator, curValue) {
              return Number(Number(accumulator) + Number(curValue.usd)).toFixed(4);
            }, 0);
        }

        if (dataItem.filter((element) => element.typeItem == "3")) {
          subTotalNoCommonByApartmentBs.value = dataItem
            .filter((element) => element.typeItem == "3" && element.bs)
            .reduce(function (accumulator, curValue) {
              return Number(Number(accumulator) + Number(curValue.bs)).toFixed(4);
            }, 0);

          subTotalNoCommonByApartmentUsd.value = dataItem
            .filter((element) => element.typeItem == "3" && element.usd)
            .reduce(function (accumulator, curValue) {
              return Number(Number(accumulator) + Number(curValue.usd)).toFixed(4);
            }, 0);
        }
      }
    };
    onMounted(async () => {
      $q.loading.show();
      const typeDocumentResp = await getTypeDocument();
      typeDocument.value = typeDocumentResp.message.data;

      const idResidentialCurrent = store.state["auth"].idResidential;

      const aliquotDifferent = await getAliquotDifferent(idResidentialCurrent);
      optionAliquot.value = aliquotDifferent.message.data;
      const apartmentAliquot = await getApartmentAliquot(idResidentialCurrent);
      optionApartmentAliquot.value = apartmentAliquot.message.data;

      const apartment = await getTowerApartmentByIdResdential(idResidentialCurrent);
      console.log(apartment.message.data);
      optionTowerApartment.value = Array(apartment.message.data);
      optionApartment.value = apartment.message.data.apartment;

      const residentialById = await getResidentialById(idResidentialCurrent);
      data.address = residentialById.message.data.address;

      typeDocument.value.forEach((element) => {
        if (element.description == residentialById.message.data.code) {
          data.typeRif = element;
        }
      });

      data.rif = residentialById.message.data.number;
      if (residentialById.message.data.logoURL) {
        data.logo = residentialById.message.data.logoURL;
      }
      const nroReceipt = await getNumberReceipt();
      if (nroReceipt.message.data)
        data.nroReceipt = parseInt(nroReceipt.message.data.number) + 1;
      else data.nroReceipt = "1";

      const resp = await getValueUSDRepuesto();
      console.log(resp.message.COL);
      dateUSD.value = resp.message._timestamp.fecha_corta;
      priceUSD.value = resp.message.USD.sicad2;
      $q.loading.hide();
    });

    return {
      onMounted,
      modal,
      openModal,
      modalDivision,
      openModalDivision,
      modalExpense,
      openModalExpense,
      colorDivisionModal,
      colorVoucherModal,
      currentItem,
      closeVoucher,
      closeDivision,
      dataSelected,
      dateUSD,
      priceUSD,
      typeDocument,
      aliquotExpense,
      disableInputs,
      disableInputsApartments,
      chkDisable,
      chkDisableNoCommon,
      chkDisableApartment,
      subTotalCommonBs,
      subTotalNoCommonBs,
      subTotalNoCommonByApartmentBs,
      subTotalCommonUsd,
      subTotalNoCommonUsd,
      subTotalNoCommonByApartmentUsd,
      filterKey,
      data,
      dataNoCommonByApartment,
      propertyApartment,
      propertyAliquot,
      propertyTotal,
      dataItem,
      itemApartmentNoCommon,
      optionAliquot,
      optionApartmentAliquot,
      optionApartment,
      optionTowerApartment,
      onChangePriceItemCommon: (name, price) => {
        if (name) {
          var itemArr = dataItem.find(
            (itemEl) => itemEl.item === name && itemEl.typeItem == 1
          );
          itemArr.usd = (price / parseFloat(priceUSD.value)).toFixed(4);
          if (data.aliquot) {
            //El calculo se esta haciendo de la siguiente manera, se divide la alicuota entre 100 para sacar el % y luego se multiplica por el precio
            itemArr.aliquotBs = ((data.aliquot.aliquot / 100) * price).toFixed(4);
            itemArr.aliquotUSD = (
              ((data.aliquot.aliquot / 100) * price) /
              priceUSD.value
            ).toFixed(4);
          } else {
            $q.notify({
              message: "Debe ingresar una aliquota",
              color: "negative",
              icon: "error",
            });
          }
          dataItem.map((item) => (item.item === name ? itemArr : item));
        } else {
          $q.notify({
            message: "Debe ingresar un nombre al item",
            color: "negative",
            icon: "error",
          });
        }
      },
      onChangePriceItemNoCommon: (name, price) => {
        console.log("ocurre");
        if (name) {
          var itemArr = dataItem.find(
            (itemEl) => itemEl.item === name && itemEl.typeItem == 2
          );
          itemArr.usd = (price / parseFloat(priceUSD.value)).toFixed(4);
          dataItem.map((item) => (item.item === name ? itemArr : item));
        } else {
          $q.notify({
            message: "Debe ingresar un nombre al item",
            color: "negative",
            icon: "error",
          });
        }
      },
      onChangePriceItemNoCommonByApartment: (name, price) => {
        if (name) {
          var itemArr = dataItem.find(
            (itemEl) => itemEl.item === name && itemEl.typeItem == 3
          );
          itemArr.usd = (price / parseFloat(priceUSD.value)).toFixed(4);
          itemApartmentNoCommon.map((item) => (item.item === name ? itemArr : item));
        } else {
          $q.notify({
            message: "Debe ingresar un nombre al item",
            color: "negative",
            icon: "error",
          });
        }
      },
      onChangeAliquot: (aliquot) => {
        dataItem.forEach((element) => {
          if (element.bs) {
            element.usd = (element.bs / parseFloat(priceUSD.value)).toFixed(4);
            element.aliquotBs = (
              element.bs *
              (parseFloat(aliquot.aliquot) / 100)
            ).toFixed(4);
            element.aliquotUSD = (
              (element.bs * (parseFloat(aliquot.aliquot) / 100)) /
              priceUSD.value
            ).toFixed(4);
          }
        });
      },

      updateOptionTowerApartment: (tower) => {
        optionApartment.value.filter((element) => element.idTower == tower.id);
      },

      addApartmentBills: (tower, apartment) => {
        console.log("push");
        dataItem.push({
          idTower: tower.id,
          nameTower: tower.name,
          idApartment: apartment.id,
          nameApartment: apartment.name,
          item: "",
          bs: "",
          usd: "",
          typeItem: 3,
          voucherSave: true,
          divisionSave: true,
          voucherColor: "grey",
          divisionColor: "grey",
        });
      },

      updateTotales,

      onChangePropertyApartment: (proApartment) => {
        optionApartmentAliquot.value.forEach((element) => {
          if (element.apartment == proApartment.apartment) {
            propertyAliquot.value = element.aliquot;
            if (chkDisable.value) {
              propertyTotal.value = Number(
                Number(
                  dataItem
                    .filter((element) => element.typeItem != "3" && element.bs)
                    .reduce(
                      (accumulator, curValue) =>
                        Number(Number(accumulator) + Number(curValue.bs)).toFixed(4),
                      0
                    )
                ).toFixed(4) * Number(Number(propertyAliquot.value) / 100).toFixed(4)
              ).toFixed(4);

              if (
                dataItem.find((element) => element.nameApartment == proApartment.name)
              ) {
                let valueItem = dataItem.find(
                  (element) => element.nameApartment == proApartment.name
                );
                propertyTotal.value = Number(
                  Number(propertyTotal.value) + Number(valueItem.bs)
                ).toFixed(4);
              }
              //       propertyTotal.value = parseFloat(
              //         subTotalCommonBs.value * (parseFloat(propertyAliquot.value) / 100)
              //       ).toFixed(4);
            }
            return;
          }
        });
      },
      changed: () => {
        console.log(dataSelected);
      },
      eventClick: () => {
        disableInputs.value = chkDisable.value == true ? false : true;

        if (!chkDisable.value) {
          propertyAliquot.value = "";
          propertyApartment.value = [];
          propertyTotal.value = 0;
        }
      },
      eventClickNoCommon: () => {
        console.log(chkDisableNoCommon.value);
        disableInputs.value = chkDisableNoCommon.value == true ? false : true;
      },
      eventClickApartment: () => {
        console.log(chkDisableApartment.value);
        disableInputsApartments.value = !disableInputsApartments.value;
        console.log(disableInputsApartments.value);
      },
      deleteItem: (itemResp, index) => {
        store.commit("admin/receipt/destroyVoucher", itemResp);
        store.commit("admin/receipt/destroyDivision", itemResp);
        dataItem.splice(index, 1);

        //Hacemos el procedimiento de cambiar el valor a los totales del recibo

        // subTotalCommonBs.value = 0;
        // propertyTotal.value = 0;
        // data.total = 0;
        // data.totalUSD = 0;

        // dataItem.forEach((element) => {
        //   if (element.bs && element.typeItem == 1) {
        //     //Modificamos los totales
        //     subTotalCommonBs.value = (
        //       parseFloat(subTotalCommonBs.value) + parseFloat(element.bs)
        //     ).toFixed(4);
        //     data.total = (parseFloat(data.total) + parseFloat(element.bs)).toFixed(4);
        //     propertyTotal.value = (
        //       parseFloat(data.total) + parseFloat(element.bs)
        //     ).toFixed(4);
        //     data.totalUSD = (parseFloat(data.totalUSD) + parseFloat(element.usd)).toFixed(
        //       4
        //     );

        //     //Modificamos las aliquotas
        //     element.aliquotBs = ((data.aliquot.aliquot / 100) * element.bs).toFixed(4);
        //     element.aliquotUSD = (
        //       ((data.aliquot.aliquot / 100) * element.bs) /
        //       priceUSD.value
        //     ).toFixed(4);
        //   }
        // });
        updateTotales();
      },

      saveItem: (index, itemResp) => {
        let flag = 0;
        dataItem.forEach((element) => {
          if (flag == index) {
            console.log("entre");
            if (
              store.state["admin"]["receipt"].vouchers.find(
                (element) => element.item == itemResp
              )
            ) {
              element.voucherSave = true;
              element.voucherColor = "grey";
            }
            if (
              store.state["admin"]["receipt"].division.find(
                (element) => element.item == itemResp
              )
            ) {
              element.divisionSave = true;
              element.divisionColor = "grey";
            }
          }
        });
        flag++;
      },
      editItem: (index) => {
        flag == 0;
        dataItem.forEach((element) => {
          if (flag == index) {
            element.voucherSave = false;
            element.voucherColor = "light-blue-10";
            element.divisionSave = false;
            element.divisionColor = "light-blue-10";
          }
        });
      },
      eventClickAddItem: (element, typeItem) => {
        if (element.item && element.bs) {
          element.nroReceipt = data.nroReceipt;
          updateTotales();

          if (chkDisable.value) {
            propertyTotal.value = parseFloat(
              subTotalCommonBs.value * (parseFloat(propertyAliquot.value) / 100)
            ).toFixed(4);
          } else {
            propertyAliquot.value = "";
            propertyApartment.value = [];
            propertyTotal.value = 0;
          }
          dataItem.push({
            nroReceipt: data.nroReceipt,
            item: "",
            bs: "",
            usd: "",
            aliquotBs: "",
            aliquotUSD: "",
            typeItem: typeItem,
            voucherColor: "light-blue-10",
            divisionColor: "light-blue-10",
            voucherSave: false,
          });
        } else {
          $q.notify({
            message: "Debe agregar los datos del item",
            color: "negative",
            icon: "error",
          });
        }
      },

      saveItemByApartment: (item) => {
        console.log(item, "iteeee,");
        if (item.voucherSave) {
          if (item.item && item.bs) {
            console.log("entre");
            item.nroReceipt = data.nroReceipt;

            updateTotales();
            item.voucherSave = false;
            item.divisionSave = false;
            item.voucherColor = "light-blue-10";
            item.divisionColor = "light-blue-10";
          } else {
            $q.notify({
              message: "Debe agregar los datos del item",
              color: "negative",
              icon: "error",
            });
          }
        }
      },
      onSubmit: async (event) => {
        try {
          let arrSend = data;
          $q.loading.show();
          dataItem.forEach((element) => {
            if (element.voucherSave == true) arrSend.receiptDetail.push(element);
            else if (element.voucherSave != true && element.item != "") {
              $q.notify({
                message: "Debe agregar el/los Voucher(s) correspientiente(s)",
                color: "warning",
                icon: "error",
              });
              return;
            }
          });
          //Los dos eventos para status son Publicar y guardar (El guardar indica estatus borrador y borrador pendiente por cobrar)
          arrSend.status = event;
          arrSend.idResidential = store.state["auth"].idResidential;
          arrSend.idTypeRif = arrSend.typeRif.id;
          arrSend.vouchers = store.state["admin"]["receipt"].vouchers;
          arrSend.division = store.state["admin"]["receipt"].division;
          console.log(arrSend, "ENVIO");
          const { ok, message } = await saveReceipt(arrSend);
          console.log(message.data, "dataaaaaa");
          if (ok) {
            let arrVoucher = [...message.data.voucher];
            let respVoucher = [...arrSend.vouchers];
            respVoucher.forEach(async (element) => {
              let sendVoucher = arrVoucher.find(
                (element2) =>
                  element.item == element2.item &&
                  element.nameEnterprise == element2.nameEnterprise &&
                  element.rif == element2.rif
              );
              let sendObject = { ...sendVoucher, ...element };

              console.log(sendObject, "objeto que se envia");
              const respImage = await saveImageVoucher(sendObject);
              console.log(respImage);
              if (respImage.ok) {
                $q.notify({
                  message: message.message != null ? message.message : message,
                  color: "positive",
                  icon: "success",
                });
                arrSend.receiptDetail = [];
              }
            });
            $q.loading.hide();
            router.push({ name: "receipt" });
          } else {
            $q.loading.hide();
            $q.notify({
              message: message.message != null ? message.message : message,
              color: "negative",
              icon: "error",
            });
          }
        } catch (error) {
          $q.loading.hide();
          if (error.message != "Network Error") {
            return { ok: false, message: error.message };
          } else {
            return { ok: false, message: "La API no esta activa" };
          }
        }
      },
    };
  },
};
</script>

<style lang="scss">
.title-div {
  background: $primary2;
  padding: 10px;
  font-size: 1.4em;
  font-weight: normal;
  text-align: center;
  color: #fff;
}
</style>
