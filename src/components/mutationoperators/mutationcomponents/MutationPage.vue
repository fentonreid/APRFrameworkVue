<template>
  <div id="description_div">
    <h2 id="description_heading">Description</h2>
    <div
      v-if="
        mutationDetails[mutationId] != null &&
        mutationDetails[mutationId].mutationDescription != null
      "
    >
      <p>{{ mutationDetails[mutationId].mutationDescription }}</p>
    </div>
    <p v-else>Could not load description for this mutation.</p>
  </div>
  <br />
  <div id="example_div">
    <h2 id="example_heading">Examples</h2>
    <div
      v-if="
        mutationDetails[mutationId] != null &&
        mutationDetails[mutationId].examples != null
      "
    >
      <MutationCard :examples="getExamples()" />
    </div>
    <p v-else>Could not load examples for this mutation...</p>
  </div>
</template>

<script>
import json from "../../../../public/json/mutationoperators.json";
import MutationCard from "./../mutationcomponents/MutationCard.vue";

export default {
  data() {
    return {
      mutationDetails: json,
      newMutationId: String,
    };
  },
  props: {
    mutationId: String,
  },
  components: {
    MutationCard,
  },
  methods: {
    getExamples() {
      let examples = [];

      if (
        this.mutationDetails[this.mutationId] != null &&
        this.mutationDetails[this.mutationId].examples != null
      ) {
        for (let example of this.mutationDetails[this.mutationId].examples) {
          examples.push(example);
        }
      }

      if (this.mutationDetails[this.mutationId].inherits != null) {
        for (let child of this.mutationDetails[this.mutationId].inherits) {
          for (let example of this.mutationDetails[child].examples) {
            examples.push(example);
          }
        }
      }

      return examples;
    },
  },
};
</script>

<style scoped>
#description_heading,
#example_heading {
  font-family: Roboto;
}

#example_heading {
  margin-bottom: 0px;
}
</style>
