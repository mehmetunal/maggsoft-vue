<template>
  <div>
    <label class="form-label" v-bind:for="id">{{ label }}</label>
    <textarea
      v-bind="$attrs"
      class="form-control"
      v-bind:id="id"
      v-bind:value="value"
      v-bind:rows="rows"
      v-bind:cols="cols"
      v-on:input="$emit('input', $event.target.value)"
      v-bind:placeholder="placeholder"
    />
  </div>
</template>
<script>
export default {
  name: "dev-textarea",
  inheritAttrs: false,
  props: ["id", "label", "value","rows","cols", "placeholder"],
  data() {
    return {};
  },
  methods: {},
  created() {},
  watch: {},
};
</script>
