<template>
  <tr>
    <th class="primaryHeader" colspan="2">
      {{ entry.id }}
    </th>
  </tr>
  <tr class="secondaryHeader">
    <th>Time Spent</th>
    <th>What was achieved?</th>
  </tr>
  <tr class="dataRows" v-for="value in entry.entries" :key="value.description">
    <td>{{ value.hour }} hours</td>
    <td v-html="value.description" class="dataDescriptionRow" />
  </tr>
  <tr class="totalHours">
    <td colspan="2">
      <em>Total: {{ entry.totalHours }} hours</em>
    </td>
  </tr>
  <br />
  <br />
</template>

<script>
export default {
  props: {
    entry: Object,
  },
};
</script>

<style>
.primaryHeader {
  text-align: left;
  color: blue;
  border: none;
}

.secondaryHeader {
  font-size: 0.95rem;
}

.dataRows,
.dataDescriptionRow {
  font-size: 0.8rem;
}

.dataDescriptionRow {
  text-align: left;
  padding-left: 0.4rem;
}

.totalHours {
  font-size: 0.9rem;
  text-align: left;
}
</style>
