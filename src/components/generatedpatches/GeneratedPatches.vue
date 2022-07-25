<template>
  <h1>Generated Patches</h1>
  <p v-if="!patches || patches.length === 0">Error fetching patches</p>
  <div v-else id="layouts">
    <div id="patch_layout">
      <div id="bug_title">
        <h2>
          {{ patches[currentIndex].identifier }}
          {{ patches[currentIndex].bid }}
          -- {{ patches[currentIndex].mutationOperator }} ({{
            patches[currentIndex].patchId
          }})
        </h2>
        <h3 id="bug_count">{{ currentIndex + 1 }}/{{ patches.length }}</h3>
      </div>
      <div id="comparison_window">
        <div id="gppatch_container">
          <h3 id="gppatch_heading">Fixed Patch</h3>
          <div id="gppatch" class="scrollbox" v-html="colourPatchFile()" />
        </div>
        <div id="actualpatch_container">
          <h3 id="actualpatch_heading">Post-mutation</h3>
          <div
            id="actualpatch"
            class="scrollbox"
            v-html="this.patches[currentIndex].actualPatch"
          />
        </div>
      </div>
      <div id="bug_controls">
        <button id="previous" @click="currentIndex--">Previous</button>
        <button id="next" @click="currentIndex++">Next</button>
      </div>
    </div>
  </div>
  <div id="classification_layout">
    <h3>Overfit patch?</h3>
    <span>Unassigned</span>
    <input
      type="radio"
      value="Unassigned"
      v-model="radioOverfitness"
      @change="updateClassification"
    />

    <span>Yes</span>
    <input
      type="radio"
      value="Yes"
      v-model="radioOverfitness"
      @change="updateClassification"
    />

    <span>No</span>
    <input
      type="radio"
      value="No"
      v-model="radioOverfitness"
      @change="updateClassification"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  watch: {
    currentIndex(value) {
      if (value >= this.patches.length) {
        this.currentIndex = 0;
      } else if (value < 0) {
        this.currentIndex = this.patches.length - 1;
      }

      this.radioOverfitness = this.patches[this.currentIndex].overfitness;
    },
  },
  data() {
    return {
      patches: [],
      currentIndex: 0,
      radioOverfitness: "Unassigned",
      overfitness: "",
    };
  },
  methods: {
    getAllGeneratedPatches() {
      axios
        .get(
          "https://aprframeworkvue-default-rtdb.europe-west1.firebasedatabase.app/generatedpatches.json"
        )
        .then((response) => {
          const patches = [];
          for (const firebaseId in response.data) {
            patches.push({
              firebaseId: firebaseId,
              identifier: response.data[firebaseId].identifier,
              bid: response.data[firebaseId].bid,
              gpPatch: response.data[firebaseId].gpPatch
                .replaceAll("\\n", "\n")
                .replaceAll("\\r", "\r"),
              actualPatch: response.data[firebaseId].actualPatch
                .replaceAll("\\n", "\n")
                .replaceAll("\\r", "\r"),
              overfitness: response.data[firebaseId].overfitness,
              mutationOperator: response.data[firebaseId].mutationOperator,
              patchId: response.data[firebaseId].patchId,
            });
          }

          this.patches = patches;
          this.radioOverfitness = patches[this.currentIndex].overfitness;
        })
        .catch((err) => {
          console.log("Error trying to get all patches: " + err);
        });
    },
    colourPatchFile() {
      let result = this.patches[this.currentIndex].gpPatch.split(/\r?\n/);
      let currentPatch = "";
      for (let line of result) {
        if (line.startsWith("+ ")) {
          line =
            "<mark style='background-color: lightgreen'>" + line + "</mark>";
        } else if (line.startsWith("- ")) {
          line = "<mark style='background-color: coral'>" + line + "</mark>";
        } else if (line.startsWith("---") || line.startsWith("+++")) {
          line =
            "<mark style='background-color: lightblue'>" + line + "</mark>";
        }
        currentPatch += line + "\n";
      }
      return currentPatch;
    },
  },
  mounted() {
    this.getAllGeneratedPatches();
  },
};
</script>

<style scoped>
#layouts {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

#classification_layout {
  margin-top: 3rem;
}

h1 {
  padding-bottom: 4rem;
}

#bug_title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: Roboto;
}

#bug_title h2,
h3 {
  margin: 0;
}

.scrollbox {
  width: 50em;
  height: 22rem;
  overflow: scroll;
  border-style: dotted;
  padding: 15px;
  font-size: 0.6em;
  white-space: pre-wrap;
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

#checkboxes {
  display: flex;
  justify-content: center;
  gap: 60px;
  padding-top: 200px;
  padding-bottom: 40px;
}

#classification_checkbox {
  text-align: left;
}

#comparison_window {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}

#gpPatch,
#actualPatch {
  width: 38rem;
  height: 22rem;
  overflow: scroll;
  border-style: dotted;
  padding: 15px;
  font-size: 0.8em;
  white-space: pre;
  font-family: Roboto;
}

#gppatch_heading,
#actualpatch_heading {
  margin: 0.2rem;
  font-family: Roboto;
}
</style>
