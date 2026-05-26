<template>
  <section class="section-content">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h1 class="about">
            Calculadora de IMC
          </h1>
          <p>
            IMC é a sigla para Índice de Massa Corporal, parâmetro adotado pela Organização Mundial de Saúde para
            calcular o peso ideal de cada pessoa.
          </p>
          <p>
            O índice é calculado da seguinte maneira: divide-se o peso do paciente pela sua altura elevada ao quadrado.
          </p>
          <p>
            Diz-se que o indivíduo tem peso normal quando o resultado do IMC está entre 18,5 e 24,9.
          </p>
          <p>
            Quer descobrir seu IMC? Clique no botão abaixo e preencha os seus dados.
          </p>
          <!-- Nuxt: <nuxt-link> gera navegação client-side para pages/create.vue → rota /create -->
          <nuxt-link to="/create">
            <button class="button is-link" type="button">
              Calcular IMC
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>

<style scoped>
.section-content {
  min-height: 100vh;
  background-color: rgb(99, 99, 99);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about {
  text-align: center;
}
</style>
