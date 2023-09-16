<template>
  <div v-for="(link, index) in linksList" :key="index">
    <q-expansion-item
      v-if="link.deepLinks"
      :content-inset-level="0.5"
      :icon="link.icon"
      :label="link.title"
      class="q-px-none text-grey"
    >
      <q-card class="bg-deep-links">
        <q-item
          :content-inset-level="0.5"
          clickable
          class="row items-center"
          active-class="active-clas"
          :to="deepLink.to"
          exact
          v-for="(deepLink, index) in link.deepLinks"
          :key="index"
        >
          <q-item-label class="text-grey">{{ deepLink.title }}</q-item-label>
        </q-item>
      </q-card>
    </q-expansion-item>
    <q-item v-else clickable exact :to="link.to">
      <q-item-section v-if="link.icon" avatar>
        <q-icon color="grey" :name="link.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-grey">{{ link.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    linksList: Array,
  },
});
</script>
<style lang="scss">
.bg-deep-links {
  background: #333d50 !important;
}
.q-expansion-item__content {
  padding: 0 !important;
}
.active-clas {
  background-color: #565252;
}
</style>