<template>
  <div class="page--home">
    <section class="hero">
      <article class="hero__card">
        <h1 class="hero__title anim-reveal__item" style="--i: 0">
          Calculadora de IMC
        </h1>
        <p class="hero__text anim-reveal__item" style="--i: 1">
          O Índice de Massa Corporal é um parâmetro da Organização Mundial da Saúde
          para avaliar a relação entre peso e altura.
        </p>
        <p class="hero__text anim-reveal__item" style="--i: 2">
          A fórmula é: peso (kg) dividido pela altura (m) ao quadrado.
          Valores entre 18,5 e 24,9 indicam peso normal.
        </p>
        <nuxt-link
          to="/create"
          class="button btn-primary anim-reveal__item"
          style="--i: 3"
        >
          Calcular meu IMC
        </nuxt-link>
      </article>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
