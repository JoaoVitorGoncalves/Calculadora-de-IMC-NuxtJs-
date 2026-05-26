<template>
  <div class="page form-page">
    <header class="page-header anim-page-in">
      <h1 class="page-header__title">
        Excluir registro
      </h1>
      <p class="page-header__lead">
        Confirme se deseja remover este cálculo do histórico local.
      </p>
    </header>

    <section class="panel anim-page-in anim-page-in--delay">
      <p class="form-page__notice">
        Esta ação não pode ser desfeita. Os dados serão removidos do localStorage.
      </p>

      <div class="field">
        <label class="label">Nome</label>
        <input v-model="name" class="input" type="text" disabled>
      </div>

      <div class="form-imc__row">
        <div class="field">
          <label class="label">Peso (kg)</label>
          <input v-model="peso" class="input" type="number" disabled>
        </div>
        <div class="field">
          <label class="label">Altura</label>
          <input v-model="altura" class="input" type="number" disabled>
        </div>
      </div>

      <div class="field">
        <label class="label">IMC</label>
        <input v-model="imc" class="input" type="text" disabled>
      </div>

      <p v-if="erro" class="form-page__error" role="alert">
        {{ erro }}
      </p>

      <div class="actions-row">
        <nuxt-link to="/create" class="button btn-icon" aria-label="Voltar">
          <span class="material-symbols-outlined">arrow_back</span>
        </nuxt-link>
        <button
          type="button"
          class="button is-danger"
          style="border-radius: 10px; font-weight: 500;"
          @click="confirmarRemocao"
        >
          Confirmar exclusão
        </button>
      </div>
    </section>
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
