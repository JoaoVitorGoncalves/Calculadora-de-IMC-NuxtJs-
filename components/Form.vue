<template>
  <form
    class="form-imc"
    :class="{ 'form-imc--shake': shake }"
    @submit.prevent="enviar"
    @animationend="onShakeEnd"
  >
    <div class="field">
      <label class="label" for="imc-nome">Nome</label>
      <input
        id="imc-nome"
        v-model="name"
        class="input"
        type="text"
        placeholder="Seu nome"
        autocomplete="name"
      >
    </div>

    <div class="form-imc__row">
      <div class="field">
        <label class="label" for="imc-peso">Peso (kg)</label>
        <input
          id="imc-peso"
          v-model.number="peso"
          class="input"
          type="number"
          min="1"
          step="0.1"
          placeholder="70"
        >
      </div>
      <div class="field">
        <label class="label" for="imc-altura">Altura (m ou cm)</label>
        <input
          id="imc-altura"
          v-model.number="altura"
          class="input"
          type="number"
          min="0.5"
          step="0.01"
          placeholder="1,75 ou 175"
        >
      </div>
    </div>

    <p class="form-imc__help">
      Metros (1,75) ou centímetros (175) — a conversão é automática.
    </p>

    <transition name="fade-slide">
      <p v-if="imcPreview > 0" key="preview" class="form-imc__preview">
        IMC estimado: <strong>{{ imcPreview }}</strong>
        <span :class="badgePreview"> {{ classificacaoPreview }}</span>
      </p>
    </transition>

    <transition name="fade-slide">
      <p v-if="empty" key="error" class="form-imc__error" role="alert">
        Preencha nome, peso e altura com valores válidos.
      </p>
    </transition>

    <button
      type="submit"
      class="button btn-primary is-fullwidth"
      :class="{ 'btn-primary--saved': savedFlash, 'is-loading': submitting }"
      :disabled="submitting"
    >
      {{ submitLabel }}
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { calcularImc, classificarImc } from '~/utils/imc'
import { badgeClass } from '~/utils/imcBadge'
import { gerarId } from '~/utils/pessoasStorage'
import type IPessoa from '~/interface/IPessoa'

export default defineComponent({
  name: 'FormImc',
  emits: ['formData'],
  data () {
    return {
      name: '',
      altura: 0,
      peso: 0,
      empty: false,
      shake: false,
      submitting: false,
      savedFlash: false
    }
  },
  computed: {
    imcPreview (): number {
      return calcularImc(Number(this.peso), Number(this.altura))
    },
    classificacaoPreview (): string {
      return classificarImc(this.imcPreview)
    },
    badgePreview (): string {
      return badgeClass(this.imcPreview)
    },
    submitLabel (): string {
      if (this.savedFlash) { return 'Salvo!' }
      if (this.submitting) { return 'Salvando…' }
      return 'Salvar cálculo'
    }
  },
  methods: {
    onShakeEnd (event: Event) {
      const animEvent = event as AnimationEvent
      if (animEvent.animationName === 'shake') {
        this.shake = false
      }
    },
    enviar () {
      const peso = Number(this.peso)
      const altura = Number(this.altura)

      if (!this.name.trim() || peso <= 0 || altura <= 0) {
        this.empty = true
        this.shake = true
        return
      }

      this.submitting = true
      this.empty = false

      const imc = calcularImc(peso, altura)
      const pessoa: IPessoa = {
        id: gerarId(),
        nome: this.name.trim(),
        altura,
        peso,
        imc,
        classificacao: classificarImc(imc)
      }

      this.$emit('formData', pessoa)

      this.name = ''
      this.altura = 0
      this.peso = 0
      this.submitting = false
      this.savedFlash = true

      window.setTimeout(() => {
        this.savedFlash = false
      }, 700)
    }
  }
})
</script>
