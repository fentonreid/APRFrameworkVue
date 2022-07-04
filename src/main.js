import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";

import PatchViewer from "./components/patchviewer/PatchViewer.vue";
import MutationOperators from "./components/mutationoperators/MutationOperators.vue";
import GeneratedPatches from "./components/generatedpatches/GeneratedPatches.vue";
import ProgressLog from "./components/progresslog/ProgressLog.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: App },
    { path: "/patchviewer", component: PatchViewer },
    { path: "/mutationoperators", component: MutationOperators },
    { path: "/generatedpatches", component: GeneratedPatches },
    { path: "/progresslog", component: ProgressLog },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
