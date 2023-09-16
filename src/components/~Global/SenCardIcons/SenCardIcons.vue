<template>
  <section :class="containerClass">
    <article
      v-for="(item, index) in iconCards"
      :key="index"
      :class="
        item.cardClass ||
        'card card-icon row items-center justify-between q-gutter-x-sm'
      "
    >
      <img
        v-if="item.imgPath"
        style="width: 50px"
        class="rounded-borders"
        :src="item.imgPath"
        :alt="item.title"
      />
      <q-icon
        :class="item.iconClass"
        :name="item.iconName"
        :size="item.iconSize || 'md'"
        :color="item.iconColor"
        v-else
      />
      <header>
        <h3 class="text-h6 q-ma-none">
          {{ item.title }}
        </h3>
        <p class="text-caption text-grey q-ma-none">
          {{ item.summary }}
        </p>
      </header>
    </article>
  </section>
</template>
<script>
export default {
  props: {
    containerClass: String,
    iconCards: Array,
  },
};
</script>

<style lang="scss">
.card {
    &.card-icon {
        padding: 20px;
        background-color: #fff;
        border: 1px solid #EBE9F1;
        border-radius: 0.428rem;
        box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
        flex-grow: 1;

        .custom-icon {
            padding: 15px;
            border-radius: 50%;
        }
    }
}
</style>