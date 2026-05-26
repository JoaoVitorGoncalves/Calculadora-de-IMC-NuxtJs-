<template>
  <div class="field lista">
    <label class="label">Nome</label>
    <input v-model="name" class="input" type="text">

    <label class="label">Peso (kg)</label>
    <input v-model.number="peso" class="input" type="number" min="1" step="0.1">

    <label class="label">Altura (m ou cm)</label>
    <input v-model.number="altura" class="input" type="number" min="0.5" step="0.01">

    <label class="label">IMC</label>
    <input class="input" type="text" :value="imcExibicao" disabled>

    <p v-if="erro" class="error">
      {{ erro }}
    </p>

    <div class="buttons">
      <nuxt-link to="/create" class="button is-light">
        <span class="material-symbols-outlined">arrow_back</span>
      </nuxt-link>
      <Buttons nome="check" class="button is-success" @clicado="salvar" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { calcularImc, classificarImc } from '~/utils/imc'
import { atualizarPessoa, buscarPessoa } from '~/utils/pessoasStorage'

export default defineComponent({
  name: 'EditPage',
  data () {
    return {
      name: '',
      altura: 0,
      peso: 0,
      erro: ''
    }
  },
  computed: {
    /** $route.params.id vem de pages/edit/_id.vue (convenção Nuxt file-based routing) */
    pessoaId (): string {
      return String(this.$route.params.id)
    },
    imcExibicao (): string {
      const imc = calcularImc(Number(this.peso), Number(this.altura))
      if (!imc) {
        return '—'
      }
      return `${imc} (${classificarImc(imc)})`
    }
  },
  created () {
    this.preencherFormulario()
  },
  methods: {
    preencherFormulario () {
      const pessoa = buscarPessoa(this.pessoaId)
      if (!pessoa) {
        this.erro = 'Registro não encontrado.'
        return
      }
      this.name = pessoa.nome
      this.altura = pessoa.altura
      this.peso = pessoa.peso
    },
    salvar () {
      const peso = Number(this.peso)
      const altura = Number(this.altura)

      if (!this.name.trim() || peso <= 0 || altura <= 0) {
        this.erro = 'Preencha todos os campos com valores válidos.'
        return
      }

      const imc = calcularImc(peso, altura)
      atualizarPessoa(this.pessoaId, {
        nome: this.name.trim(),
        altura,
        peso,
        imc,
        classificacao: classificarImc(imc)
      })

      this.$router.push('/create')
    }
  }
})
</script>

<style scoped>
.error {
  color: #f14668;
}
</style>
