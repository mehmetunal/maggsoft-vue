<template>
  <app-preloader></app-preloader>

  <div id="main-wrapper">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
    <app-footer></app-footer>
  </div>
</template>
<script>

import AppHeader from "@/components/Header.vue";
import AppFooter from "@/components/Footer.vue";
import AppSidebar from "@/components/Sidebar.vue";
import AppPreloader from "@/components/Preloader.vue";
import AppContent from "@/components/Content.vue";
export default {
  name: "Layout",
  components: {
    AppHeader,
    AppFooter,
    AppSidebar,
    AppPreloader,
    AppContent,
  },
};
</script>
