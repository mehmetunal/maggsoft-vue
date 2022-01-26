<template>

  <div id="preloader">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
  <div id="main-wrapper">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <div class="content-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12">
            <div class="row">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "@/components/Header.vue"
import AppFooter from "@/components/Footer.vue";
import AppSidebar from "@/components/Sidebar.vue";
export default {
  name: "App",
  components: {AppHeader ,AppFooter, AppSidebar },
};
</script>

<style></style>
