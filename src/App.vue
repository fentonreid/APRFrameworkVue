<template>
  <NavBar />
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import NavBar from "./components/navigation/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {};
  },
};
</script>

<style>
body {
  margin: 0;
}

main {
  margin: 10px;
  padding: 10px;
}

h1 {
  text-align: center;
  margin: 0;
}
</style>
