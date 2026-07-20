<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page introuvable</h2>
    <p>La page que vous recherchez n'existe pas.</p>

    <router-link to="/">
      Retour à l'accueil
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 80px;
}

h1 {
  font-size: 80px;
  color: #d32f2f;
}
</style>