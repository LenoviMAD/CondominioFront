<template>
  <div class="q-pa-md">
    <q-table
      :title="titleTable"
      :rows="rows"
      :columns="columns"
      row-key="name"
      ref="tableRef"
      virtual-scroll
      :pagination="pagination"
      :rows-per-page-options="[0]"
      :filter="filter"
      no-data-label="No hay datos para mostrar"
      rows-per-page-label="Registros por pagina"
      grid
      hide-header
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:top-left>
        <q-btn
          size="md"
          class="q-mr-sm"
          color="primary"
          icon-right="add"
          :label="labelAdd || ''"
          :to="{ name: routeBtn }"
        />
      </template>
      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.row.colorStatus">
            <q-list dense>
              <q-item
                v-for="col in props.cols.filter((col) => col.name !== 'desc')"
                :key="col.name"
              >
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-separator />
            <q-card-section>
              <div class="full-center">
                <q-btn
                  size="md"
                  class="q-mr-sm"
                  color="primary"
                  icon-right="visibility"
                  @click="clickFunction(props.row)"
                  :label="props.row.date"
                />

                <div v-if="props.row.actions">
                  <q-btn
                    v-for="item in props.row.actions"
                    :key="item.name"
                    push
                    :color="item.color"
                    size="sm"
                    round
                    @click="item.click(props.row)"
                    :icon="item.icon"
                  >
                    <q-tooltip> {{ item.name }} </q-tooltip>
                  </q-btn>
                </div>
                <!--
                <q-btn push color="orange-4" size="sm" round icon="edit"
                  ><q-tooltip> Editar </q-tooltip>
                </q-btn>
                <q-btn push color="red-4" size="sm" round icon="delete"
                  ><q-tooltip> Borrar </q-tooltip>
                </q-btn> -->
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    labelAdd: String,
    titleTable: String,
    filter: String,
    rows: Array,
    columns: Array,
    routeBtn: String,
    clickFunction: Function,
  },
  setup(props) {
    // we generate lots of rows here
    //     let seed = [];
    //     for (let i = 0; i < 1000; i++) {
    //       seed = seed.concat(props.rows.slice(0).map((r) => ({ ...r })));
    //     }
    //     seed.forEach((row, index) => {
    //       row.index = index;
    //     });
    return {
      //       seed,
      pagination: ref({
        rowsPerPage: 12,
      }),
    };
  },
};
</script>

<style></style>
