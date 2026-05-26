<template>
  <section>
    <!-- Layout padrão: envolve todas as pages; <Nuxt /> é onde a rota atual é renderizada -->
    <nav class="navbar is-dark" role="navigation">
      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <nuxt-link to="/" class="navbar-item">
            Início
          </nuxt-link>
          <nuxt-link to="/create" class="navbar-item">
            IMC
          </nuxt-link>
          <nuxt-link to="/about" class="navbar-item">
            Sobre
          </nuxt-link>
        </div>
      </div>
    </nav>
    <Nuxt />
  </section>
</template>

<style>
.lista {
  padding: 1.25rem;
}
</style>
