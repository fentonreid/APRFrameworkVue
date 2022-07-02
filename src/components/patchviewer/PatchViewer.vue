<template>
  <h1>Patch Viewer</h1>
  <p v-if="!patches || !filterPatches">Error fetching patches</p>
  <p v-else-if="patches.length === 0">No patches loaded</p>
  <p v-else-if="filterPatches.length === 0">
    The filter applied found no patches, please try again!
  </p>
  <div id="layouts" v-else>
    <div id="filtering_layout">
      <h3>Filter patches</h3>
      <p v-if="selectedIdentifiers.length === 0">
        <strong>Identifiers:</strong> None
      </p>
      <p v-else>
        <strong>Identifiers:</strong>
        {{
          selectedIdentifiers.length === identifiers.length
            ? "All"
            : selectedIdentifiers.join(", ")
        }}
      </p>
      <p v-if="selectedClassifications.length === 0">
        <strong>Classifiers:</strong> None
      </p>
      <p v-else>
        <strong>Classifiers:</strong>
        {{
          selectedClassifications.length === classifications.length
            ? "All"
            : selectedClassifications.join(", ")
        }}
      </p>
      <button id="filter_button" @click="openOverlay">Filter</button>
    </div>
    <div id="patch_layout">
      <div id="bug_title">
        <h2>
          {{ filterPatches[currentIndex].identifier }}
          {{ filterPatches[currentIndex].bid }}
        </h2>
        <h3 id="bug_count">
          {{ currentIndex + 1 }}/{{ filterPatches.length }}
        </h3>
      </div>
      <div id="scrollbox" v-html="colourPatchFile()" />
      <div id="bug_controls">
        <button id="previous" @click="currentIndex--">Previous</button>
        <button id="next" @click="currentIndex++">Next</button>
      </div>
    </div>
    <div id="classification_layout">
      <h3>Classify patch</h3>
      <span v-for="classification in classifications" :key="classification">
        <input
          type="radio"
          :value="classification"
          v-model="radioClassification"
          @change="updateClassification"
        />
        <span>{{ classification }}</span
        ><br />
      </span>
    </div>
    <div v-if="overlay" id="overlay">
      <div id="overlay_content">
        <div id="checkboxes">
          <div id="identifiers">
            <h3>Identifiers</h3>
            <form id="identifier_checkbox" @submit.prevent="">
              <span v-for="identifier in identifiers" :key="identifier">
                <input
                  type="checkbox"
                  :value="identifier"
                  v-model="selectedIdentifiers"
                />
                <span>{{ identifier }}</span
                ><br />
              </span>
              <span>
                <input
                  type="checkbox"
                  value="all_identifier"
                  v-model="selectedIdentifiers"
                  @click="selectAllIdentifiers"
                />
                <span>All</span><br />
              </span>
            </form>
          </div>
          <div id="classifications">
            <h3>Classification</h3>
            <form id="classification_checkbox" @submit.prevent="">
              <span
                v-for="classification in classifications"
                :key="classification"
              >
                <input
                  type="checkbox"
                  :value="classification"
                  v-model="selectedClassifications"
                />
                <span>{{ classification }}</span
                ><br />
              </span>
              <span>
                <input
                  type="checkbox"
                  value="all_classification"
                  v-model="selectedIdentifiers"
                  @click="selectAllClassifications"
                />
                <span>All</span><br />
              </span>
            </form>
          </div>
        </div>
        <div id="overlay_buttons">
          <button id="reset_filter" @click="resetFilters">Reset</button>
          <button id="submit_filter" @click="submitFilters">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  watch: {
    currentIndex(value) {
      if (value >= this.filterPatches.length) {
        this.currentIndex = 0;
      } else if (value < 0) {
        this.currentIndex = this.filterPatches.length - 1;
      }

      this.radioClassification =
        this.filterPatches[this.currentIndex].classification;
    },
  },
  data() {
    return {
      patches: [],
      filterPatches: [],
      currentIndex: 0,
      overlay: false,
      identifiers: [],
      classifications: [],
      selectedIdentifiers: [],
      selectedClassifications: [],
      radioClassification: "",
    };
  },
  methods: {
    getAllPatches() {
      axios
        .get(
          "https://aprframeworkvue-default-rtdb.europe-west1.firebasedatabase.app/allpatches.json"
        )
        .then((response) => {
          const patches = [];
          for (const firebaseId in response.data) {
            patches.push({
              id: response.data[firebaseId].id,
              firebaseId: firebaseId,
              identifier: response.data[firebaseId].identifier,
              bid: response.data[firebaseId].bid,
              patch: response.data[firebaseId].patch
                .replaceAll("\\n", "\n")
                .replaceAll("\\r", "\r"),
              classification: response.data[firebaseId].classification,
            });
          }

          this.patches = patches;
          this.filterPatches = patches;

          this.getIdentifiers();
          this.getClassifications();

          this.radioClassification =
            this.filterPatches[this.currentIndex].classification;
        })
        .catch((err) => {
          console.log("Error trying to get all patches: " + err);
        });
    },
    colourPatchFile() {
      let result = this.filterPatches[this.currentIndex].patch.split(/\r?\n/);
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
    getIdentifiers() {
      // Filter by unique identifiers
      this.identifiers = [
        ...new Set(this.patches.map((patch) => patch.identifier)),
      ];
    },
    getClassifications() {
      // Get the classifications defined in the firebase classifications object
      console.log("TRYING TO GET!!!");
      axios
        .get(
          "https://aprframeworkvue-default-rtdb.europe-west1.firebasedatabase.app/classifications.json"
        )
        .then((response) => {
          const classification = [];
          for (const firebaseId in response.data) {
            console.log(
              "getting classifications: " + response.data[firebaseId]
            );
            classification.push(response.data[firebaseId].classification);
          }

          this.classifications = classification;
          this.radioClassification =
            this.filterPatches[this.currentIndex].classification;
        })
        .catch((err) => {
          console.log("Error trying to get all classifications: " + err);
        });
    },
    openOverlay() {
      this.overlay = true;
      this.resetFilters();
    },
    resetFilters() {
      this.selectedIdentifiers = [];
      this.selectedClassifications = [];
    },
    submitFilters() {
      this.overlay = false;
      this.selectedIdentifiers =
        this.selectedIdentifiers.length === 0
          ? this.identifiers
          : this.selectedIdentifiers;
      this.selectedClassifications =
        this.selectedClassifications.length === 0
          ? this.classifications
          : this.selectedClassifications;
      this.performFilter();
    },
    performFilter() {
      this.filterPatches = this.patches.filter((patch) => {
        return (
          this.selectedIdentifiers.includes(patch.identifier) &&
          this.selectedClassifications.includes(patch.classification)
        );
      });
    },
    selectAllIdentifiers() {
      // If the select all button has already been pressed then reset
      if (this.identifiers.length == this.selectedIdentifiers.length) {
        this.selectedIdentifiers = [];
      } else {
        // For each identifier add if not already in selected identifiers
        for (const identifier of this.identifiers) {
          if (!this.selectedIdentifiers.includes(identifier)) {
            this.selectedIdentifiers.push(identifier);
          }
        }
      }
      console.log(this.selectedIdentifiers);
    },
    selectAllClassifications() {
      if (this.classifications.length == this.selectedClassifications.length) {
        this.selectedClassifications = [];
      } else {
        for (const classification of this.classifications) {
          if (!this.selectedClassifications.includes(classification)) {
            this.selectedClassifications.push(classification);
          }
        }
      }
    },
    updateClassification() {
      // When this is changed,
      ////                    Will need to patch the firebase patch
      console.log(this.radioClassification);

      // Update the changes in the patches object locally, instead of re-requesting firebase patches
      const foundIndex = this.patches.findIndex(
        (patch) => patch.id === this.filterPatches[this.currentIndex].id
      );

      this.patches[foundIndex].classification = this.radioClassification;

      // Update the classifier on firebase
      axios
        .patch(
          "https://aprframeworkvue-default-rtdb.europe-west1.firebasedatabase.app/allpatches/" +
            this.patches[foundIndex].firebaseId +
            ".json",
          { classification: this.patches[foundIndex].classification }
        )
        .catch((err) => {
          console.log(
            "Error trying to patch: " +
              err +
              JSON.stringify(this.patches[foundIndex])
          );
        });
    },
  },
  mounted() {
    this.getAllPatches();
  },
};
</script>

<style scoped>
#layouts {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

#filtering_layout {
  overflow: scroll;
  text-overflow: clip;
  white-space: nowrap;
}

#filtering_layout,
#classification_layout {
  margin-top: 3rem;
}

#classification_layout h3,
#filtering_layout h3 {
  margin-bottom: 1.5rem;
  font-family: Roboto;
  font-size: 1.5rem;
  font-style: italic;
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

#scrollbox {
  width: 50rem;
  height: 20rem;
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
#next,
#filter,
#reset_filter,
#submit_filter {
  font-family: Roboto;
  background-color: white;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid black;
  width: 10rem;
  height: 2rem;
}

#overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  position: 0;
  inset: 0;
  background-color: rgba(96, 96, 96, 0.99);
  z-index: 2;
}

#overlay_content {
  display: grid;
  font-size: 1rem;
  font-family: Roboto;
  color: white;
  text-align: center;
}

#overlay_content h3 {
  font-size: 1.5rem;
}

#checkboxes {
  display: flex;
  justify-content: center;
  gap: 60px;
  padding-top: 200px;
  padding-bottom: 40px;
}

#identifier_checkbox,
#classification_checkbox {
  text-align: left;
}

#overlay_buttons {
  display: flex;
  gap: 30px;
  justify-content: center;
}
</style>
