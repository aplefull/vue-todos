<template>
  <component :is="icon" :class="['icon', type]" v-bind="$attrs" />
</template>

<script setup lang="ts">
import BinIcon from './icons/bin.vue';
import PencilIcon from './icons/pencil.vue';
import DotsIcon from './icons/dots.vue';
import CheckmarkIcon from './icons/checkmark.vue';

const icons = {
  bin: BinIcon,
  pencil: PencilIcon,
  dots: DotsIcon,
  checkmark: CheckmarkIcon,
};

const props = withDefaults(
  defineProps<{
    name: keyof typeof icons;
    type?: 'primary' | 'secondary' | 'danger';
  }>(),
  {
    type: 'secondary',
  },
);

const icon = icons[props.name];
</script>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
}

.icon :deep(path),
.icon :deep(g > *) {
  fill: var(--icon-secondary);
  transition: fill 0.2s ease;
}

.icon.primary :deep(path) {
  fill: var(--icon-primary);
}

.icon.danger :deep(path) {
  fill: var(--icon-danger);
}
</style>
