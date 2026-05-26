<template>
  <section class="lista">
    <h1 class="title is-4">
      Sobre o projeto
    </h1>
    <p>
      Calculadora de IMC feita com <strong>Nuxt 2</strong> para praticar fundamentos:
      file-based routing (<code>pages/</code>), componentes reutilizáveis, props/emits,
      ciclo de vida (<code>created</code>), TypeScript e persistência em <code>localStorage</code>.
    </p>
    <p>
      <nuxt-link to="/create">
        Ir para a lista e novo cálculo
      </nuxt-link>
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutPage'
})
</script>
