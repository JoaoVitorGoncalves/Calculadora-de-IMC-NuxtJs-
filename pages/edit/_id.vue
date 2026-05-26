<template>
  <div class="page form-page">
    <header class="page-header anim-page-in">
      <h1 class="page-header__title">
        Editar registro
      </h1>
      <p class="page-header__lead">
        Altere os dados e salve. O IMC é recalculado automaticamente.
      </p>
    </header>

    <section class="panel anim-page-in anim-page-in--delay">
      <form @submit.prevent="salvar">
        <div class="field">
          <label class="label" for="edit-nome">Nome</label>
          <input id="edit-nome" v-model="name" class="input" type="text">
        </div>

        <div class="form-imc__row">
          <div class="field">
            <label class="label" for="edit-peso">Peso (kg)</label>
            <input
              id="edit-peso"
              v-model.number="peso"
              class="input"
              type="number"
              min="1"
              step="0.1"
            >
          </div>
          <div class="field">
            <label class="label" for="edit-altura">Altura (m ou cm)</label>
            <input
              id="edit-altura"
              v-model.number="altura"
              class="input"
              type="number"
              min="0.5"
              step="0.01"
            >
          </div>
        </div>

        <div class="field">
          <label class="label">IMC</label>
          <input class="input" type="text" :value="imcExibicao" disabled>
        </div>

        <transition name="fade-slide">
          <p v-if="erro" key="erro" class="form-page__error" role="alert">
            {{ erro }}
          </p>
        </transition>

        <div class="actions-row">
          <nuxt-link to="/create" class="button btn-icon" aria-label="Voltar">
            <span class="material-symbols-outlined">arrow_back</span>
          </nuxt-link>
          <button type="submit" class="button btn-primary">
            Salvar alterações
          </button>
        </div>
      </form>
    </section>
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
