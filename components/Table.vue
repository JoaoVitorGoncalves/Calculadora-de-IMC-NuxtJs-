<template>
  <!-- Linha da tabela (desktop) -->
  <tr
    v-if="layout === 'row'"
    :class="{ 'record-row--highlight': highlighted }"
  >
    <td>{{ pessoa.nome }}</td>
    <td>{{ pessoa.peso }} kg</td>
    <td>{{ alturaFormatada }}</td>
    <td>{{ pessoa.imc }}</td>
    <td>
      <span :class="badge">{{ pessoa.classificacao || '—' }}</span>
    </td>
    <td>
      <div class="data-table__actions">
        <Buttons
          nome="edit"
          variant="warn"
          label="Editar"
          @clicado="irParaEdicao"
        />
        <Buttons
          nome="delete"
          variant="danger"
          label="Excluir"
          @clicado="irParaRemocao"
        />
      </div>
    </td>
  </tr>

  <!-- Card (mobile) -->
  <li
    v-else
    class="record-card"
    :class="{ 'record-card--highlight': highlighted }"
  >
    <div class="record-card__header">
      <p class="record-card__name">
        {{ pessoa.nome }}
      </p>
      <span :class="badge">{{ pessoa.classificacao || '—' }}</span>
    </div>
    <dl class="record-card__meta">
      <div>
        <dt>Peso</dt>
        <dd>{{ pessoa.peso }} kg</dd>
      </div>
      <div>
        <dt>Altura</dt>
        <dd>{{ alturaFormatada }}</dd>
      </div>
      <div>
        <dt>IMC</dt>
        <dd>{{ pessoa.imc }}</dd>
      </div>
    </dl>
    <div class="record-card__actions">
      <Buttons
        nome="edit"
        variant="warn"
        label="Editar"
        @clicado="irParaEdicao"
      />
      <Buttons
        nome="delete"
        variant="danger"
        label="Excluir"
        @clicado="irParaRemocao"
      />
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type IPessoa from '~/interface/IPessoa'
import { badgeClass } from '~/utils/imcBadge'

export default defineComponent({
  name: 'TableRow',
  props: {
    pessoa: {
      type: Object as PropType<IPessoa>,
      required: true
    },
    layout: {
      type: String as PropType<'row' | 'card'>,
      default: 'row'
    },
    highlighted: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    badge (): string {
      return badgeClass(this.pessoa.imc)
    },
    alturaFormatada (): string {
      const h = this.pessoa.altura
      return h > 3 ? `${h} cm` : `${h} m`
    }
  },
  methods: {
    irParaEdicao () {
      this.$router.push(`/edit/${this.pessoa.id}`)
    },
    irParaRemocao () {
      this.$router.push(`/remove/${this.pessoa.id}`)
    }
  }
})
</script>
