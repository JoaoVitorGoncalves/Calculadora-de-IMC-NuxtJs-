<template>
  <div class="app-shell">
    <header class="app-nav" role="banner">
      <div class="app-nav__inner">
        <nuxt-link to="/" class="app-nav__brand">
          Calculadora IMC
        </nuxt-link>

        <button
          type="button"
          class="app-nav__toggle"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          aria-controls="app-nav-menu"
          aria-label="Abrir menu"
          @click="menuOpen = !menuOpen"
        >
          <span class="material-symbols-outlined">
            {{ menuOpen ? 'close' : 'menu' }}
          </span>
        </button>

        <nav
          id="app-nav-menu"
          class="app-nav__links"
          :class="{ 'is-open': menuOpen }"
          role="navigation"
          @click="fecharMenu"
        >
          <nuxt-link to="/" class="app-nav__link">
            Início
          </nuxt-link>
          <nuxt-link to="/create" class="app-nav__link">
            Calcular
          </nuxt-link>
          <nuxt-link to="/about" class="app-nav__link">
            Sobre
          </nuxt-link>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <transition name="page-fade" mode="out-in">
        <Nuxt :key="$route.path" />
      </transition>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DefaultLayout',
  data () {
    return {
      menuOpen: false
    }
  },
  watch: {
    $route () {
      this.menuOpen = false
    }
  },
  methods: {
    fecharMenu () {
      if (window.innerWidth < 768) {
        this.menuOpen = false
      }
    }
  }
})
</script>
