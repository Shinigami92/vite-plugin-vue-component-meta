<script lang="ts">
export interface AppProps {
  /**
   * The message to display
   *
   * @default "Hello World"
   */
  msg?: string;
}

export type AppEmits = {
  /**
   * Emitted when the component is clicked
   */
  click: [value: MouseEvent];
};

export interface AppSlots {
  /**
   * The default slot
   */
  default: {};
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<AppProps>(), {
  msg: "Hello World",
});

const emit = defineEmits<AppEmits>();

defineSlots<AppSlots>();

function open(): void {
  console.log("open");
}

defineExpose({
  /**
   * Open the component
   */
  open,
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>
