<template>
  <div class="content-body">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="row">
            <router-view :key="key" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Content",
  computed: {
    key() {
      return this.$route.path;
    },
  },
mounted(){
  window.Fillow.init();
}
};
</script>
