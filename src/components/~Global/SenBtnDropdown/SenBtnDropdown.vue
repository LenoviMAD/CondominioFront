<template>
  <q-btn-dropdown
    flat
    dense
    round
    :text-color="btnDropdown.color || 'grey-8'"
    :icon="btnDropdown.icon"
    :label="btnDropdown.label"
    :class="btnDropdown.customClass || ''"
  >
    <q-list>
      <q-item
        clickable
        v-close-popup
        class="row items-center"
        v-for="item in btnDropdown.list"
        :key="item.title"
        :to="item.to"
        @click="!item.to ? item.fn(actionId) : null"
      >
        <q-icon
          v-if="item.icon"
          :name="item.icon"
          :color="item.iconColor || 'grey-8'"
          class="q-pr-sm"
          size="sm"
        />
        <q-item-label v-if="item.title">{{ item.title }}</q-item-label>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    btnDropdown: Object,
    actionId: Number,
  },
});
</script>
<style lang="scss">
.no-decoration {
  .q-btn-dropdown__arrow {
    display: none;
  }
}
</style>