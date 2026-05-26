<template>
  <div class="field">
    <label class="label">Nome</label>
    <input
      v-model="name"
      class="input"
      type="text"
      placeholder="Seu nome"
    >

    <label class="label">Peso (kg)</label>
    <input
      v-model.number="peso"
      class="input"
      type="number"
      min="1"
      step="0.1"
      placeholder="Ex.: 70"
    >

    <label class="label">Altura (m ou cm)</label>
    <input
      v-model.number="altura"
      class="input"
      type="number"
      min="0.5"
      step="0.01"
      placeholder="Ex.: 1,75 ou 175"
    >
    <p class="help">
      Use metros (1,75) ou centímetros (175). O cálculo converte automaticamente.
    </p>

    <p v-if="imcPreview > 0" class="imc-preview">
      IMC estimado: <strong>{{ imcPreview }}</strong> — {{ classificacaoPreview }}
    </p>

    <p v-if="empty" class="error">
      Preencha nome, peso e altura com valores válidos.
    </p>

    <div>
      <!-- @clicado: evento customizado emitido pelo filho (Buttons) para o pai (Form) -->
      <Buttons nome="check" class="button is-success" @clicado="enviar" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { calcularImc, classificarImc } from '~/utils/imc'
import { gerarId } from '~/utils/pessoasStorage'
import type IPessoa from '~/interface/IPessoa'

export default defineComponent({
  name: 'FormImc',
  // Vue 3 / compat: declarar emits documenta o contrato do componente
  emits: ['formData'],
  data () {
    return {
      name: '',
      altura: 0,
      peso: 0,
      empty: false
    }
  },
  computed: {
    /** Estado derivado: recalcula quando peso/altura mudam (preferível a duplicar no método). */
    imcPreview (): number {
      return calcularImc(Number(this.peso), Number(this.altura))
    },
    classificacaoPreview (): string {
      return classificarImc(this.imcPreview)
    }
  },
  methods: {
    enviar () {
      const peso = Number(this.peso)
      const altura = Number(this.altura)

      if (!this.name.trim() || peso <= 0 || altura <= 0) {
        this.empty = true
        return
      }

      const imc = calcularImc(peso, altura)
      const pessoa: IPessoa = {
        id: gerarId(),
        nome: this.name.trim(),
        altura,
        peso,
        imc,
        classificacao: classificarImc(imc)
      }

      // $emit: comunicação filho → pai (padrão Vue; em Nuxt o pai costuma ser uma page)
      this.$emit('formData', pessoa)

      this.name = ''
      this.altura = 0
      this.peso = 0
      this.empty = false
    }
  }
})
</script>

<style scoped>
.error {
  color: #f14668;
  margin-top: 0.5rem;
}

.imc-preview {
  margin: 0.75rem 0;
  color: #363636;
}

.help {
  font-size: 0.85rem;
  color: #7a7a7a;
  margin-bottom: 0.75rem;
}
</style>
