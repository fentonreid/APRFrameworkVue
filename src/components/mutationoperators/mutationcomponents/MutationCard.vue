<template>
  <h3 id="bug_count">{{ currentIndex + 1 }}/{{ examples.length }}</h3>
  <div id="card">
    <div id="comparison_window">
      <div id="premutation_container">
        <h3 id="pre_mutation_heading">Pre-mutation</h3>
        <div
          id="pre_mutation"
          class="scrollbox"
          v-html="colourPatchFile(this.examples[currentIndex].preMutation)"
        />
      </div>
      <div id="post_mutation_container">
        <h3 id="post_mutation_heading">Post-mutation</h3>
        <div
          id="post_mutation"
          class="scrollbox"
          v-html="colourPatchFile(this.examples[currentIndex].postMutation)"
        />
      </div>
    </div>
    <div id="bug_controls">
      <button id="previous" @click="currentIndex--">Previous</button>
      <button id="next" @click="currentIndex++">Next</button>
    </div>
    <div id="bug_metadata">
      <div>
        <h4>Description:</h4>
        {{ examples[currentIndex].description }}
      </div>
      <div>
        <h4>Test id:</h4>
        {{ examples[currentIndex].isolation }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    examples: Object,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  watch: {
    currentIndex(value) {
      if (value >= this.examples.length) {
        this.currentIndex = 0;
      } else if (value < 0) {
        this.currentIndex = this.examples.length - 1;
      }
    },
  },
  methods: {
    colourPatchFile(codeToHighlight) {
      let result = codeToHighlight.split(/\r?\n/);
      let parsedText = "";

      for (let line of result) {
        if (line.startsWith("+")) {
          line =
            "<mark style='background-color: lightgreen'>" + line + "</mark>";
        } else if (line.startsWith("-")) {
          line = "<mark style='background-color: coral'>" + line + "</mark>";
        } else if (line.includes("~+")) {
          let tildaIndex = line.indexOf("~+");
          let afterTildaText = line.substring(tildaIndex + 2, line.length);

          line =
            line.substring(0, tildaIndex) +
            "<mark style='background-color: lightgreen'>" +
            afterTildaText +
            "</mark>";
        } else if (line.includes("~-")) {
          let tildaIndex = line.indexOf("~-");
          let afterTildaText = line.substring(tildaIndex + 2, line.length);

          line =
            line.substring(0, tildaIndex) +
            "<mark style='background-color: coral'>" +
            afterTildaText +
            "</mark>";
        } else if (line.includes("~")) {
          // Highlight text after tilda
          let tildaIndex = line.indexOf("~");
          let afterTildaText = line.substring(tildaIndex + 1, line.length);

          line =
            line.substring(0, tildaIndex) +
            "<mark style='background-color: lightblue'>" +
            afterTildaText +
            "</mark>";
        }

        parsedText += line + "\n";
      }

      return parsedText;
    },
  },
};
</script>

<style scoped>
#card {
  display: flex;
  flex-direction: column;
}

#pre_mutation_heading,
#post_mutation_heading {
  margin: 0.2rem;
  font-family: Roboto;
}

#bug_count {
  display: flex;
  flex-direction: row-reverse;
  font-family: Roboto;
  margin: 0.2rem;
  margin-right: 4.8rem;
}

#comparison_window {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}

#pre_mutation,
#post_mutation {
  width: 38rem;
  height: 22rem;
  overflow: scroll;
  border-style: dotted;
  padding: 15px;
  font-size: 0.8em;
  white-space: pre;
  font-family: Roboto;
}

#bug_controls {
  display: flex;
  justify-content: center;
  font-family: Roboto;
  padding: 10px;
  gap: 20px;
}

#previous,
#next {
  font-family: Roboto;
  background-color: white;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid black;
  width: 10rem;
  height: 2rem;
}

#bug_metadata {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-left: 8.4rem;
}

#bug_metadata h4 {
  display: inline;
}
</style>
