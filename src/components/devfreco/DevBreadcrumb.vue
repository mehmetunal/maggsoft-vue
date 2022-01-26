<template>
  <ol class="breadcrumb p-0 m-0">
    <li class="breadcrumb-item" v-bind:class="{active : item.active }" v-for="(item,index) in dataSource" :key="index">
      <a :href="item.url" v-if="!item.active">{{ item.title }}</a>
      <span v-if="item.active">{{ item.title }}</span>
    </li>
  </ol>
</template>

<script>
export default {
  name: "DevBreadcrumb",
  props: {
    dataSource: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>