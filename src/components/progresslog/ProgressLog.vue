<template>
  <h1>Progress Log</h1>

  <div id="progressLogContainer">
    <table v-for="entry in progressLog.weekContent" :key="entry">
      <ProgressLogEntry :entry="entry" />
    </table>
  </div>
</template>

<script>
import json from "../../../public/json/progresslog.json";
import ProgressLogEntry from "./ProgressLogEntry.vue";

export default {
  data() {
    return {
      progressLog: json,
      test: process.env.BASEURL,
    };
  },
  components: {
    ProgressLogEntry,
  },
  methods: {},
  mounted() {},
};
</script>

<style>
#progressLogContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

table {
  font-family: Roboto;
  text-align: center;
  border-collapse: collapse;
}

td,
th {
  border: thin solid gray;
  padding: 0.2rem 1rem 0 1rem;
}
</style>
