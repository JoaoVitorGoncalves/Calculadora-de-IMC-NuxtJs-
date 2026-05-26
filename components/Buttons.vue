<template>
  <!-- Botão genérico: o ícone vem por prop; o clique sobe via emit para o pai decidir a ação -->
  <button type="button" @click="click">
    <span class="material-symbols-outlined">
      {{ nome }}
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonsVue',
  props: {
    nome: {
      type: String,
      required: true
    }
  },
  emits: ['clicado'],
  methods: {
    click (): void {
      this.$emit('clicado')
    }
  }
})
</script>
