<template>
  <div class="page">
    <header class="page-header anim-page-in">
      <h1 class="page-header__title">
        Sobre o projeto
      </h1>
    </header>

    <section class="panel prose anim-page-in anim-page-in--delay">
      <p>
        Calculadora de IMC feita com <strong>Nuxt 2</strong> para praticar fundamentos:
        rotas em <code>pages/</code>, componentes com props e emits,
        ciclo de vida (<code>created</code>), TypeScript e <code>localStorage</code>.
      </p>
      <p>
        <nuxt-link to="/create">
          Ir para calcular e ver o histórico
        </nuxt-link>
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutPage'
})
</script>
