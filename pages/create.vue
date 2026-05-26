<template>
  <section class="lista">
    <!-- Form emite @formData; a page escuta e persiste (separação UI / dados) -->
    <Form @formData="salvarPessoa" />

    <table class="table is-fullwidth is-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Peso (kg)</th>
          <th>Altura</th>
          <th>IMC</th>
          <th>Classificação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <!-- v-for no filho Table: cada item vira uma <tr> (HTML válido) -->
      <tbody>
        <Table
          v-for="pessoa in pessoas"
          :key="pessoa.id"
          :pessoa="pessoa"
        />
      </tbody>
    </table>

    <p v-if="pessoas.length === 0" class="has-text-grey">
      Nenhum cálculo salvo ainda. Preencha o formulário acima.
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type IPessoa from '~/interface/IPessoa'
import { adicionarPessoa, lerPessoas } from '~/utils/pessoasStorage'

export default defineComponent({
  name: 'CreatePage',
  data () {
    return {
      pessoas: [] as IPessoa[]
    }
  },
  // created: hook do ciclo de vida — roda após instanciar o componente (bom para carregar localStorage)
  created () {
    this.carregarLista()
  },
  methods: {
    carregarLista () {
      this.pessoas = lerPessoas()
    },
    salvarPessoa (pessoa: IPessoa) {
      this.pessoas = adicionarPessoa(pessoa)
    }
  }
})
</script>
