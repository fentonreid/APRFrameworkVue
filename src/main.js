import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import PatchViewer from "./components/patchviewer/PatchViewer.vue";
import GeneratedPatches from "./components/generatedpatches/GeneratedPatches.vue";
import ProgressLog from "./components/progresslog/ProgressLog.vue";
import MutationOperators from "./components/mutationoperators/MutationOperators.vue";
import SVM from "./components/mutationoperators/implementations/SVM.vue";
import LRR from "./components/mutationoperators/implementations/LRR.vue";
import BAR from "./components/mutationoperators/implementations/BAR.vue";
import WRM from "./components/mutationoperators/implementations/WRM.vue";
import LRRelocation from "./components/mutationoperators/implementations/LRRelocation.vue";
import LRRemoval from "./components/mutationoperators/implementations/LRRemoval.vue";
import BER from "./components/mutationoperators/implementations/BER.vue";
import BEM from "./components/mutationoperators/implementations/BEM.vue";
import BERExpansion from "./components/mutationoperators/implementations/BERExpansion.vue";
import BERRemoval from "./components/mutationoperators/implementations/BERRemoval.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/patchviewer", component: PatchViewer },
    { path: "/generatedpatches", component: GeneratedPatches },
    { path: "/progresslog", component: ProgressLog },
    { path: "/mutationoperators", component: MutationOperators },
    { path: "/mutationoperators/svm", component: SVM },
    { path: "/mutationoperators/lrr", component: LRR },
    { path: "/mutationoperators/bar", component: BAR },
    { path: "/mutationoperators/wrm", component: WRM },
    { path: "/mutationoperators/lrrelocation", component: LRRelocation },
    { path: "/mutationoperators/lrremoval", component: LRRemoval },
    { path: "/mutationoperators/ber", component: BER },
    { path: "/mutationoperators/bem", component: BEM },
    { path: "/mutationoperators/berexpansion", component: BERExpansion },
    { path: "/mutationoperators/berremoval", component: BERRemoval },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
