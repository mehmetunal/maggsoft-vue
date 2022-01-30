const app = Vue.createApp({});

import DevText from "./DevText.vue";

app.component("v-dev-text", DevText);

import DevNumber from "./DevNumber.vue";

app.component("v-dev-number", DevNumber);

import DevTextarea from "./DevTextarea.vue";

app.component("v-dev-textarea", DevTextarea);

import DevImageUpload from "./DevImageUpload.vue";

app.component("v-dev-image-upload", DevImageUpload);

import DevVideoUpload from "./DevVideoUpload.vue";

app.component("v-dev-video-upload", DevVideoUpload);

import DevFileUpload from "./DevFileUpload.vue";

app.component("v-dev-file-upload", DevFileUpload);

import DevTable from "./tables/DevTable.vue";

app.component("v-dev-table", DevTable);