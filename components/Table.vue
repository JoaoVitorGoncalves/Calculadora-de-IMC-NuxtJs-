<template>
  <!-- Componente de linha: o pai (create.vue) monta <tbody> e faz v-for aqui -->
  <tr>
    <td>{{ pessoa.nome }}</td>
    <td>{{ pessoa.peso }}</td>
    <td>{{ pessoa.altura }}</td>
    <td>{{ pessoa.imc }}</td>
    <td>{{ pessoa.classificacao || '—' }}</td>
    <td>
      <Buttons nome="edit" class="button is-warning is-small" @clicado="irParaEdicao" />
      <Buttons nome="delete" class="button is-danger is-small" @clicado="irParaRemocao" />
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type IPessoa from '~/interface/IPessoa'

export default defineComponent({
  name: 'TableRow',
  props: {
    // props: dados que descem do pai; required + tipo garantem contrato na tabela
    pessoa: {
      type: Object as PropType<IPessoa>,
      required: true
    }
  },
  methods: {
    /**
     * Nuxt: rotas dinâmicas vêm de arquivos pages/edit/_id.vue → /edit/:id
     * $router.push navega sem recarregar a página inteira (SPA).
     */
    irParaEdicao () {
      this.$router.push(`/edit/${this.pessoa.id}`)
    },
    irParaRemocao () {
      this.$router.push(`/remove/${this.pessoa.id}`)
    }
  }
})
</script>
