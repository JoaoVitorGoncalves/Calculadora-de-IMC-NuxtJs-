<template>
  <div class="field lista">
    <p class="mb-4">
      Confirme a exclusão do registro abaixo. Os dados vêm do localStorage.
    </p>

    <label class="label">Nome</label>
    <input v-model="name" class="input" type="text" disabled>

    <label class="label">Peso (kg)</label>
    <input v-model="peso" class="input" type="number" disabled>

    <label class="label">Altura</label>
    <input v-model="altura" class="input" type="number" disabled>

    <label class="label">IMC</label>
    <input v-model="imc" class="input" type="text" disabled>

    <p v-if="erro" class="error">
      {{ erro }}
    </p>

    <div class="buttons">
      <nuxt-link to="/create" class="button is-light">
        <span class="material-symbols-outlined">arrow_back</span>
      </nuxt-link>
      <Buttons nome="delete" class="button is-danger" @clicado="confirmarRemocao" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { buscarPessoa, removerPessoa } from '~/utils/pessoasStorage'

export default defineComponent({
  name: 'RemovePage',
  data () {
    return {
      name: '',
      altura: 0,
      peso: 0,
      imc: 0,
      erro: ''
    }
  },
  computed: {
    pessoaId (): string {
      return String(this.$route.params.id)
    }
  },
  created () {
    this.carregarRegistro()
  },
  methods: {
    carregarRegistro () {
      const pessoa = buscarPessoa(this.pessoaId)
      if (!pessoa) {
        this.erro = 'Registro não encontrado.'
        return
      }
      this.name = pessoa.nome
      this.altura = pessoa.altura
      this.peso = pessoa.peso
      this.imc = pessoa.imc
    },
    confirmarRemocao () {
      removerPessoa(this.pessoaId)
      this.$router.push('/create')
    }
  }
})
</script>

<style scoped>
.error {
  color: #f14668;
}

.mb-4 {
  margin-bottom: 1rem;
}
</style>
