<template>
  <div class="page page--create">
    <header class="page-header anim-page-in">
      <h1 class="page-header__title">
        Novo cálculo
      </h1>
      <p class="page-header__lead">
        Preencha os dados abaixo. Os registros ficam salvos no navegador (localStorage).
      </p>
    </header>

    <div class="page-grid">
      <section
        class="panel anim-page-in anim-page-in--delay"
        aria-labelledby="form-imc-title"
      >
        <h2 id="form-imc-title" class="page-header__title" style="font-size: 1.1rem;">
          Dados
        </h2>
        <Form @formData="salvarPessoa" />
      </section>

      <section class="panel anim-page-in anim-page-in--delay" aria-labelledby="lista-imc-title">
        <h2 id="lista-imc-title" class="page-header__title" style="font-size: 1.1rem;">
          Histórico
        </h2>

        <transition name="fade-slide" mode="out-in">
          <div v-if="pessoas.length === 0" key="empty" class="empty-state">
            Nenhum cálculo salvo ainda. Preencha o formulário para começar.
          </div>

          <div v-else key="list">
            <div class="table-wrap table-desktop">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Peso</th>
                    <th>Altura</th>
                    <th>IMC</th>
                    <th>Classificação</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <transition-group name="list" tag="tbody" appear>
                  <Table
                    v-for="pessoa in pessoas"
                    :key="pessoa.id"
                    :pessoa="pessoa"
                    :highlighted="pessoa.id === lastAddedId"
                    layout="row"
                  />
                </transition-group>
              </table>
            </div>

            <transition-group
              name="list"
              tag="ul"
              class="record-list"
              appear
              aria-label="Lista de cálculos"
            >
              <Table
                v-for="pessoa in pessoas"
                :key="'card-' + pessoa.id"
                :pessoa="pessoa"
                :highlighted="pessoa.id === lastAddedId"
                layout="card"
              />
            </transition-group>
          </div>
        </transition>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type IPessoa from '~/interface/IPessoa'
import { adicionarPessoa, lerPessoas } from '~/utils/pessoasStorage'

export default defineComponent({
  name: 'CreatePage',
  data () {
    return {
      pessoas: [] as IPessoa[],
      lastAddedId: null as string | null
    }
  },
  created () {
    this.carregarLista()
  },
  methods: {
    carregarLista () {
      this.pessoas = lerPessoas()
    },
    salvarPessoa (pessoa: IPessoa) {
      this.pessoas = adicionarPessoa(pessoa)
      this.lastAddedId = pessoa.id
      window.setTimeout(() => {
        if (this.lastAddedId === pessoa.id) {
          this.lastAddedId = null
        }
      }, 650)
    }
  }
})
</script>
