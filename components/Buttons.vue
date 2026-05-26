<template>
  <button
    type="button"
    class="btn-icon"
    :class="variantClass"
    :aria-label="label"
    :title="label"
    @click="click"
  >
    <span class="material-symbols-outlined" aria-hidden="true">
      {{ nome }}
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ButtonsVue',
  props: {
    nome: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Ação'
    },
    variant: {
      type: String as PropType<'default' | 'warn' | 'danger'>,
      default: 'default'
    }
  },
  emits: ['clicado'],
  computed: {
    variantClass (): string {
      if (this.variant === 'warn') { return 'btn-icon--warn' }
      if (this.variant === 'danger') { return 'btn-icon--danger' }
      return ''
    }
  },
  methods: {
    click (): void {
      this.$emit('clicado')
    }
  }
})
</script>
